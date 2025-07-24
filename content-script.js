// Content script for DropCalendar
// Runs on Game8.co to extract talent book data

class Game8DataExtractor {
  constructor() {
    this.scheduleData = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }

    this.init()
  }

  init() {
    // Wait for page to fully load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.extractData())
    } else {
      this.extractData()
    }
  }

  extractData() {
    try {
      console.log('DropCalendar: Extracting talent book data from Game8...')

      // Look for the weekly domain rotation table
      const rotationData = this.extractWeeklyRotation()
      const characterData = this.extractCharacterData()

      if (rotationData && characterData) {
        this.buildSchedule(rotationData, characterData)
        this.sendDataToBackground()
      } else {
        console.log('DropCalendar: Could not find data tables, using fallback')
        this.sendFallbackData()
      }
    } catch (error) {
      console.error('DropCalendar: Error extracting data:', error)
      this.sendFallbackData()
    }
  }

  extractWeeklyRotation() {
    // Try to find the weekly rotation table
    const tables = document.querySelectorAll('table')

    for (const table of tables) {
      const headers = table.querySelectorAll('th')
      const hasWeeklyColumns = Array.from(headers).some(
        th =>
          th.textContent.includes('Monday') ||
          th.textContent.includes('Tuesday') ||
          th.textContent.includes('Wednesday')
      )

      if (hasWeeklyColumns) {
        return this.parseRotationTable(table)
      }
    }

    // If no table found, try to extract from text content
    return this.extractRotationFromText()
  }

  parseRotationTable(table) {
    const rotation = {}
    const rows = table.querySelectorAll('tr')

    for (const row of rows) {
      const cells = row.querySelectorAll('td, th')
      if (cells.length >= 4) {
        const monday = this.extractBookName(cells[0].textContent)
        const tuesday = this.extractBookName(cells[1].textContent)
        const wednesday = this.extractBookName(cells[2].textContent)

        if (monday && tuesday && wednesday) {
          const region = this.getRegionFromRow(row)
          if (!rotation[region]) rotation[region] = {}

          rotation[region].monday = monday
          rotation[region].tuesday = tuesday
          rotation[region].wednesday = wednesday
          rotation[region].thursday = monday // Same as Monday
          rotation[region].friday = tuesday // Same as Tuesday
          rotation[region].saturday = wednesday // Same as Wednesday
        }
      }
    }

    return rotation
  }

  extractRotationFromText() {
    // Fallback: extract from page text content
    const pageText = document.body.textContent
    const rotation = {}

    // Look for patterns in the text that match our known schedule
    const regions = ['Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan']
    const books = {
      Mondstadt: ['Freedom', 'Resistance', 'Ballad'],
      Liyue: ['Prosperity', 'Diligence', 'Gold'],
      Inazuma: ['Transience', 'Elegance', 'Light'],
      Sumeru: ['Admonition', 'Ingenuity', 'Praxis'],
      Fontaine: ['Equity', 'Justice', 'Order'],
      Natlan: ['Contention', 'Kindling', 'Conflict'],
    }

    regions.forEach(region => {
      const regionBooks = books[region]
      if (regionBooks && regionBooks.every(book => pageText.includes(book))) {
        rotation[region] = {
          monday: regionBooks[0],
          tuesday: regionBooks[1],
          wednesday: regionBooks[2],
          thursday: regionBooks[0],
          friday: regionBooks[1],
          saturday: regionBooks[2],
        }
      }
    })

    return rotation
  }

  extractCharacterData() {
    const characterData = {}

    // Look for character lists in tables
    const tables = document.querySelectorAll('table')

    for (const table of tables) {
      const rows = table.querySelectorAll('tr')

      for (const row of rows) {
        const cells = row.querySelectorAll('td')
        if (cells.length >= 2) {
          const bookCell = cells[0]
          const characterCell = cells[1]

          const bookResult = this.extractBookNameFromCell(bookCell)
          const characters = this.extractCharactersFromCell(characterCell)

          if (bookResult.name && characters.length > 0) {
            characterData[bookResult.name] = {
              characters: characters,
              image: bookResult.image,
            }
          }
        }
      }
    }

    return characterData
  }

  extractBookName(text) {
    const bookNames = [
      'Freedom',
      'Resistance',
      'Ballad',
      'Prosperity',
      'Diligence',
      'Gold',
      'Transience',
      'Elegance',
      'Light',
      'Admonition',
      'Ingenuity',
      'Praxis',
      'Equity',
      'Justice',
      'Order',
      'Contention',
      'Kindling',
      'Conflict',
    ]

    for (const book of bookNames) {
      if (text.includes(book)) {
        return book
      }
    }

    return null
  }

  extractBookNameFromCell(cell) {
    // Look for book name in text or image alt text
    const text = cell.textContent
    const images = cell.querySelectorAll('img')

    let bookName = this.extractBookName(text)
    let bookImage = null

    if (!bookName && images.length > 0) {
      for (const img of images) {
        const alt = img.alt || img.src || ''
        bookName = this.extractBookName(alt)
        if (bookName) {
          bookImage = img.src
          break
        }
      }
    } else if (images.length > 0) {
      // If we found book name in text, try to find corresponding image
      for (const img of images) {
        const alt = img.alt || img.src || ''
        if (alt.includes(bookName)) {
          bookImage = img.src
          break
        }
      }
    }

    return { name: bookName, image: bookImage }
  }

  extractCharactersFromCell(cell) {
    const characters = []
    const text = cell.textContent

    // Look for character images and extract both name and avatar
    const characterImages = cell.querySelectorAll('img')

    if (characterImages.length > 0) {
      characterImages.forEach(img => {
        const altText = img.alt || ''
        const srcUrl = img.src || ''

        // Extract character name from alt text or src
        let charName = ''
        if (altText.includes('Genshin - ')) {
          charName = altText.replace('Genshin - ', '').trim()
        } else if (altText) {
          charName = altText.trim()
        }

        if (charName && charName.length > 0) {
          characters.push({
            name: charName,
            avatar: srcUrl || null,
          })
        }
      })
    }

    // Fallback: extract names from text if no images found
    if (characters.length === 0) {
      const characterPattern = /Genshin\s*-\s*([^G]+?)(?=Genshin|$)/g
      let match

      while ((match = characterPattern.exec(text)) !== null) {
        const charName = match[1].trim()
        if (charName && charName.length > 0) {
          characters.push({
            name: charName,
            avatar: null,
          })
        }
      }

      // If still no matches, try splitting by common delimiters
      if (characters.length === 0) {
        const parts = text
          .split(/[,\n]/)
          .map(part => part.trim())
          .filter(part => part.length > 0)
        characters.push(...parts.map(name => ({ name, avatar: null })))
      }
    }

    return characters
  }

  getRegionFromRow(row) {
    const text = row.textContent.toLowerCase()

    if (text.includes('mondstadt')) return 'Mondstadt'
    if (text.includes('liyue')) return 'Liyue'
    if (text.includes('inazuma')) return 'Inazuma'
    if (text.includes('sumeru')) return 'Sumeru'
    if (text.includes('fontaine')) return 'Fontaine'
    if (text.includes('natlan')) return 'Natlan'

    return 'Unknown'
  }

  buildSchedule(rotationData, characterData) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    days.forEach(day => {
      this.scheduleData[day] = []

      Object.keys(rotationData).forEach(region => {
        const bookName = rotationData[region][day]
        if (bookName && characterData[bookName]) {
          const bookData = characterData[bookName]
          this.scheduleData[day].push({
            name: bookName,
            region: region,
            characters: bookData.characters || [],
            image: bookData.image || null,
          })
        }
      })
    })

    this.scheduleData.sunday = [] // All books available on Sunday
  }

  sendDataToBackground() {
    chrome.runtime
      .sendMessage({
        action: 'updateData',
        data: this.scheduleData,
      })
      .then(response => {
        if (response.success) {
          console.log('DropCalendar: Data sent to background script successfully')
        } else {
          console.error('DropCalendar: Failed to send data to background script')
        }
      })
      .catch(error => {
        console.error('DropCalendar: Error sending data to background:', error)
      })
  }

  sendFallbackData() {
    // Send a message to use fallback data
    chrome.runtime
      .sendMessage({
        action: 'useFallback',
      })
      .catch(error => {
        console.error('DropCalendar: Error sending fallback message:', error)
      })
  }
}

// Only run if we're on the correct page
if (window.location.href.includes('game8.co/games/Genshin-Impact/archives/311474')) {
  new Game8DataExtractor()
}
