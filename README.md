# 📅 DropCalendar

**A beautiful dark-mode Chrome extension for Genshin Impact players to track daily talent book farming schedules**

![Chrome Extension](https://img.shields.io/badge/Extension-Chrome%20Manifest%20V3-4285F4?style=for-the-badge&logo=googlechrome)
![Version](https://img.shields.io/badge/Version-1.0.0-00C7B7?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-FFD700?style=for-the-badge)
![Game](https://img.shields.io/badge/Game-Genshin%20Impact-5865F2?style=for-the-badge)

> 🌙 **Dark Mode Design** • 🎮 **125+ Character Avatars** • 📚 **Real Book Images** • 🔍 **Smart Search**

---

## ✨ Features

### 🎯 Core Functionality

- **📅 Daily Schedule** - Automatically shows farmable talent books for today
- **🎨 Real Game Assets** - 125+ character avatars and 18 talent book images from Game8.co
- **🔍 Intelligent Search** - Fuzzy matching with farming availability status
- **🌍 All Regions** - Complete coverage: Mondstadt → Natlan (6 regions)

### 🚀 Smart Features

- **📊 Farming Intelligence** - Shows if characters can be farmed today or which days
- **🔄 Auto-Updates** - Fresh data every 24 hours with offline fallback
- **💾 Smart Caching** - Works offline with cached talent book data
- **🌙 Modern UI** - Beautiful dark mode with glassmorphism effects

### 🎮 User Experience

- **⚡ Lightning Fast** - Optimized popup loads instantly
- **🎯 Visual Indicators** - Color-coded farming status (green/yellow borders)
- **📱 Responsive** - Perfect 400×600px popup size
- **🔧 Zero Setup** - Works out of the box

---

### Option 2: Clone Repository

```bash
git clone https://github.com/yourusername/DropCalendar.git
cd DropCalendar
```

### Installation Steps

1. **Open Chrome Extensions** → `chrome://extensions/`
2. **Enable Developer Mode** → Toggle in top-right
3. **Load Unpacked** → Select the `DropCalendar` folder
4. **Pin Extension** → Click puzzle icon and pin DropCalendar

**🎉 That's it! Click the DropCalendar icon to start farming efficiently!**

---

## 📖 How to Use

### Daily Farming

1. **Click Extension Icon** → View today's farmable books
2. **Check Character Lists** → See who needs which books
3. **Plan Your Routes** → Optimize domain runs

### Smart Search

1. **Type Character Name** → Fuzzy search finds matches
2. **Check Farming Status** → Green = farmable today, Yellow = other days
3. **View Alternative Days** → See when unavailable characters can be farmed

### Sunday Farming

- **All Books Available** → Perfect for catching up
- **Special Notice** → Automatic Sunday detection

---

## 📊 Weekly Schedule

|      Day      | Monday/Thursday | Tuesday/Friday | Wednesday/Saturday |
| :-----------: | :-------------: | :------------: | :----------------: |
| **Mondstadt** |     Freedom     |   Resistance   |       Ballad       |
|   **Liyue**   |   Prosperity    |   Diligence    |        Gold        |
|  **Inazuma**  |   Transience    |    Elegance    |       Light        |
|  **Sumeru**   |   Admonition    |   Ingenuity    |       Praxis       |
| **Fontaine**  |     Equity      |    Justice     |       Order        |
|  **Natlan**   |   Contention    |    Kindling    |      Conflict      |

**Sunday**: All books available! 🎉

---

## 🛠️ Technical Overview

### Architecture

```
DropCalendar/
├── 📄 manifest.json      # Extension configuration (Manifest V3)
├── 🎨 popup.html         # Main UI structure
├── ⚙️ popup.js           # Core logic + Game8.co integration
├── 🎨 styles.css         # Dark mode styles + glassmorphism
├── 🔧 background.js      # Service worker (optimized)
├── 📡 content-script.js  # Game8.co data extraction
├── 🖼️ icon*.png          # Extension icons
└── 📖 README.md          # This file
```

### Key Technologies

- **Manifest V3** - Modern Chrome extension standard
- **Service Worker** - Background data management
- **Local Storage** - Offline caching
- **Content Security Policy** - Secure event handling
- **Game8.co CDN** - Real image integration

### Performance

- **Optimized Code** - 98 lines background script (was 477)
- **No Duplications** - Clean, DRY codebase
- **Fast Loading** - Instant popup rendering
- **Memory Efficient** - Minimal resource usage

---

## 🔧 Developer Guide

### Adding New Characters

When new Genshin characters are released:

1. **Find Image URL** on Game8.co
2. **Add to Schedule** in `getDefaultSchedule()`
3. **Add Image URL** in `addSampleImages()`

```javascript
// Example: Adding new character "Xianyun"
// 1. In getDefaultSchedule()
characters: ['Existing Character', 'Xianyun']

// 2. In addSampleImages()
Xianyun: 'https://img.game8.co/[ID]/[HASH].png/show'
```

### Development Setup

```bash
git clone https://github.com/Neremyx/DropCalendar.git
cd DropCalendar

# Load in Chrome Developer Mode
# chrome://extensions/ → Developer Mode → Load Unpacked
```

### Contributing

- 🐛 **Bug Reports** - Open issues with details
- 🚀 **Feature Requests** - Suggest improvements
- 💻 **Code Contributions** - Submit pull requests
- 📚 **Documentation** - Help improve guides

---

## 📊 Stats & Credits

### Database

- **✅ 125+ Characters** - All regions (Mondstadt → Natlan)
- **✅ 18 Talent Books** - Complete farming schedule
- **✅ Real Images** - Direct from Game8.co CDN
- **✅ Manual Updates** - Reliable data accuracy

### Credits

- **Game8.co** - Image sources and schedule data
- **miHoYo/HoYoverse** - Genshin Impact creators
- **Community** - Feedback and contributions

### Legal

_This extension is not affiliated with miHoYo/HoYoverse or Game8.co. Genshin Impact is a trademark of miHoYo/HoYoverse._

---

## 🐛 Troubleshooting

<details>
<summary><strong>🖼️ Images not loading?</strong></summary>

- Check internet connection
- Game8.co CDN might be temporarily down
- Extension works without images (shows names only)
</details>

<details>
<summary><strong>🔍 Search not working?</strong></summary>

- Type at least 2 characters
- Use partial names (e.g., "Albe" for "Albedo")
- Check spelling or try alternative names
</details>

<details>
<summary><strong>📊 Data seems outdated?</strong></summary>

- Click refresh button in extension
- New characters require manual code updates
- Check for extension updates on GitHub
</details>

<details>
<summary><strong>⚙️ Extension not loading?</strong></summary>

- Ensure Developer Mode is enabled
- Try reloading the extension
- Check Chrome DevTools console for errors
</details>

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

**Made with ❤️ for the Genshin Impact farming community**

</div>
