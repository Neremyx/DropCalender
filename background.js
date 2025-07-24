// Background service worker for DropCalendar
// Handles periodic data updates and extension lifecycle

console.log('DropCalendar background script loaded')

const config = {
  dataUrl: 'https://game8.co/games/Genshin-Impact/archives/311474',
  cacheKey: 'dropCalendar_data',
  lastUpdateKey: 'dropCalendar_lastUpdate',
  cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours
}

async function checkForUpdates() {
  try {
    const result = await chrome.storage.local.get([config.lastUpdateKey])
    const lastUpdate = result[config.lastUpdateKey] || 0
    const now = Date.now()

    // Check if cache has expired
    if (now - lastUpdate >= config.cacheExpiry) {
      console.log('Cache expired, attempting to fetch fresh data')
      await saveDefaultData()
    }
  } catch (error) {
    console.error('Error checking for updates:', error)
  }
}

async function saveDefaultData() {
  // Save timestamp to indicate data was updated
  await chrome.storage.local.set({
    [config.lastUpdateKey]: Date.now(),
  })

  console.log('Saved default schedule timestamp')
}

async function handleMessage(request, sender, sendResponse) {
  try {
    switch (request.action) {
      case 'updateData':
        await saveData(request.data)
        sendResponse({ success: true })
        break

      case 'forceUpdate':
        await saveDefaultData()
        sendResponse({ success: true })
        break

      default:
        sendResponse({ error: 'Unknown action' })
    }
  } catch (error) {
    console.error('Error handling message:', error)
    sendResponse({ error: error.message })
  }
}

async function saveData(data) {
  await chrome.storage.local.set({
    [config.cacheKey]: data,
    [config.lastUpdateKey]: Date.now(),
  })
  console.log('Data updated from content script')
}

// Handle extension installation
chrome.runtime.onInstalled.addListener(async details => {
  console.log('DropCalendar installed/updated:', details.reason)

  try {
    // Set up periodic update alarm if alarms API is available
    if (chrome.alarms && chrome.alarms.create) {
      await chrome.alarms.create('dropCalendar_update', {
        delayInMinutes: 60, // First check after 1 hour
        periodInMinutes: 60 * 6, // Then every 6 hours
      })
    }

    // Initial data setup
    await checkForUpdates()
  } catch (error) {
    console.error('Error during installation:', error)
  }
})

// Handle startup
chrome.runtime.onStartup.addListener(async () => {
  try {
    await checkForUpdates()
  } catch (error) {
    console.error('Error during startup:', error)
  }
})

// Handle alarms for periodic updates
if (chrome.alarms && chrome.alarms.onAlarm) {
  chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name === 'dropCalendar_update') {
      try {
        await checkForUpdates()
      } catch (error) {
        console.error('Error during scheduled update:', error)
      }
    }
  })
}

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender, sendResponse)
  return true // Will respond asynchronously
})
