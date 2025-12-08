// Windows software data with complete details
const apps = [
    {
    id: 1,
    name: "GTA San Andreas",
    developer: "Rockstar Games",
    tagline: "Legendary Open-World Action Adventure",
    icon: "https://i.ibb.co/7dz0QkHf/bbcbd2a2bb65ddad76e831c91c17b421.jpg",
    rating: 4.8,
    category: "games",
    trending: true,
    new: false,
    version: "1.0",
    size: "3.9GB",
    windowsVersion: "Windows 7/8/10/11",
    lastUpdated: "Nov 12, 2024",
    description: `
        <h3>🔥 About the Game</h3>
        <p>GTA San Andreas is an iconic open-world action game set across the state of San Andreas. 
        Play as CJ and explore cities, complete missions, and build your criminal empire.</p>

        <h3>🎮 Features</h3>
        <ul>
            <li>Massive open world across 3 cities</li>
            <li>Engaging story-driven missions</li>
            <li>Vehicle customization & gang territories</li>
            <li>Keyboard + Gamepad support</li>
            <li>Low-end PC friendly</li>
        </ul>

        <h3>✨ What's New</h3>
        <ul>
            <li>Improved installer</li>
            <li>Bug fixes and stability improvements</li>
            <li>Better compatibility with Windows 10/11</li>
        </ul>
    `,
    downloads: [
        { 
            type: "Full Game (PC)", 
            size: "711GB", 
            url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/LQ.GTA.SA.ATOM.GUY.rar"
        }
    ],
    screenshots: ["https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/bb5e5e25e29046535aba405ad47bb826.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/9b8a9636519a343c04f860eb6f0c22d3.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/99efb826b071747efc32fa9a14117e99.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/a861733e3625e0d409df25aee50d5273.jpg"],
    oldVersions: []
    },

    {
        id: 2,
        name: "Discord",
        developer: "Discord Inc.",
        tagline: "Voice, Video & Text Chat",
        icon: "../img/discord.webp",
        rating: 4.5,
        category: "social",
        trending: true,
        new: false,
        version: "1.0.9015",
        size: "85MB",
        windowsVersion: "8.1+",
        lastUpdated: "Dec 15, 2024",
        description: `<h3>🚀 Features</h3><p>Discord is a free voice, video, and text chat app for gamers and communities. Connect with friends and communities worldwide.</p><h3>✨ What's New</h3><ul><li>Enhanced voice quality</li><li>Improved screen sharing</li><li>Better server management</li></ul>`,
        downloads: [
            { type: "64-bit", size: "85MB", url: "https://www.mediafire.com/file/dc123/discord-v1.0.9015-x64.exe/file" }
        ],
        screenshots: ["", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: [
            { version: "1.0.9014", downloads: [{ type: "64-bit", size: "83MB", url: "https://www.mediafire.com/file/dc456/discord-v1.0.9014-x64.exe/file" }] }
        ]
    },
    {
        id: 3,
        name: "Steam",
        developer: "Valve Corporation",
        tagline: "Ultimate Gaming Platform",
        icon: "../img/steam.webp",
        rating: 4.2,
        category: "games",
        trending: true,
        new: false,
        version: "1.0.0.91",
        size: "2.5MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 12, 2024",
        description: `<h3>🎮 Gaming Platform</h3><p>Steam is the ultimate destination for playing, discussing, and creating games. Access thousands of games and connect with millions of players.</p><h3>🆕 Latest Updates</h3><ul><li>New Steam Deck compatibility</li><li>Enhanced library interface</li><li>Improved download speeds</li></ul>`,
        downloads: [
            { type: "64-bit", size: "2.5MB", url: "https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe" },
            { type: "32-bit", size: "2.3MB", url: "https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe" }
        ],
        screenshots: ["", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: [
            { version: "3.5.16", downloads: [{ type: "64-bit", size: "2.4MB", url: "https://www.mediafire.com/file/stold123/steam-v3.5.16-x64.exe/file" }] }
        ]
    },
    {
        id: 4,
        name: "Google Chrome",
        developer: "Google LLC",
        tagline: "Fast & Secure Browser",
        icon: "../img/chrome.webp",
        rating: 4.3,
        category: "tools",
        trending: false,
        new: false,
        version: "129.0.6668.71",
        size: "95MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 14, 2024",
        description: `<h3>🌐 Web Browser</h3><p>Google Chrome is a fast, secure, and free web browser built for the modern web. Browse with confidence and speed.</p><h3>🌟 Key Features</h3><ul><li>Fast browsing and search</li><li>Built-in security features</li><li>Sync across all devices</li></ul>`,
        downloads: [
            { type: "64-bit", size: "95MB", url: "https://dl.google.com/chrome/install/ChromeStandaloneSetup64.exe" },
            { type: "32-bit", size: "90MB", url: "https://dl.google.com/chrome/install/ChromeStandaloneSetup.exe" }
        ],
        oldVersions: []
    },
    {
        id: 5,
        name: "VLC Media Player",
        developer: "VideoLAN",
        tagline: "Universal Media Player",
        icon: "../img/vlc.webp",
        rating: 4.1,
        category: "entertainment",
        trending: false,
        new: false,
        version: "3.0.21",
        size: "40MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 13, 2024",
        description: `<h3>🎬 Media Player</h3><p>VLC is a free and open source cross-platform multimedia player and framework that plays most multimedia files.</p><h3>🔒 Features</h3><ul><li>Plays all media formats</li><li>No codec packs needed</li><li>Completely free</li></ul>`,
        downloads: [
            { type: "64-bit", size: "40MB", url: "https://download.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe" },
            { type: "32-bit", size: "38MB", url: "https://download.videolan.org/vlc/3.0.21/win32/vlc-3.0.21-win32.exe" }
        ],
        oldVersions: []
    },
    {
        id: 6,
        name: "Spotify",
        developer: "Spotify AB",
        tagline: "Music & Podcasts",
        icon: "../img/spotify.webp",
        rating: 4.6,
        category: "entertainment",
        trending: false,
        new: false,
        version: "1.2.38.1447.g1a4c1e2c",
        size: "85MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 11, 2024",
        description: `<h3>🎵 Music Streaming</h3><p>Spotify gives you instant access to millions of songs and podcasts. Listen to your favorite music and discover new tracks.</p><h3>🎧 Premium Features</h3><ul><li>Ad-free music streaming</li><li>Offline downloads</li><li>High-quality audio</li></ul>`,
        downloads: [
            { type: "64-bit", size: "85MB", url: "https://download.scdn.co/SpotifySetup.exe" }
        ],
        screenshots: ["https://play-lh.googleusercontent.com/kDXJ6XA2Cm47lzDCvvu6HNCu0PWmTwZKiY0ldCWrCgXGT3Ms-lbP_WN1v5vknspnLT15=w2560-h1440-rw", "https://play-lh.googleusercontent.com/OLvMsmdQrXyWIatb9cvZGsJ-Y0jsQ-_yrFkpDjcQNoWILhvOVwlb0ZYVVxz8UtBHlA=w2560-h1440-rw", "https://play-lh.googleusercontent.com/-rk94lbaRK-0oILBI3FFyxSTATkI662F5aRTnvzajpqiiw9RlI-ngu0MyFV1PaBWUVlD=w2560-h1440-rw", "https://play-lh.googleusercontent.com/B8Xn-GTS2Z7hIffu-1fE6MzsNi7RQl5L_qhk-lLWfpoQx8M5HUoVEA7SdGSiTfDNBzg=w2560-h1440-rw", "https://play-lh.googleusercontent.com/futERZbazS7TjIdcQiKxT9w3Y0Ecff_FLMseyhIWoHTdDFzaTiP_04Gtrnpv0bnuGHoJnp8V4_6wy63J2d5I=w2560-h1440-rw", "https://play-lh.googleusercontent.com/nQ3OLtOBs0JH_j0e_hHMW7MD6wiqsHpUhBQYnA2Kbc1dC3g3QdMuGt7G3qpcnNEdHR5fJroTB5boZryhiFCCjzs=w2560-h1440-rw", "https://play-lh.googleusercontent.com/7FW89wNwVLFHwFlGY4yeyLq54kyDUMPbp7st5Mx6OB6dcmkiiBmvPKBiY-tdcorqkvxDACKjcdLMS04E5R3P-w=w2560-h1440-rw", "https://play-lh.googleusercontent.com/0YeQ13O1vMKWTRlaqljFVv_gqdq8dXteEMSdux9t-JRoZ2wiZ5A0tvX7r4yEKg1w8Y1eEbzxhlxpoXO6kCz3WQ=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 7,
        name: "Visual Studio Code",
        developer: "Microsoft Corporation",
        tagline: "Code Editor Redefined",
        icon: "../img/vs_code.webp",
        rating: 4.7,
        category: "tools",
        trending: false,
        new: true,
        version: "1.95.1",
        size: "95MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 17, 2024",
        description: `<h3>💻 Code Editor</h3><p>Visual Studio Code is a lightweight but powerful source code editor. It comes with built-in support for JavaScript, TypeScript and Node.js.</p><h3>🔧 Features</h3><ul><li>IntelliSense code completion</li><li>Built-in Git integration</li><li>Extensive extension marketplace</li></ul>`,
        downloads: [
            { type: "64-bit", size: "95MB", url: "https://update.code.visualstudio.com/latest/win32-x64-user/stable" }
        ],
        oldVersions: []
    },
    {
        id: 8,
        name: "OBS Studio",
        developer: "OBS Project",
        tagline: "Live Streaming & Recording",
        icon: "../img/obs_studio.webp",
        rating: 4.5,
        category: "entertainment",
        trending: false,
        new: false,
        version: "30.2.3",
        size: "120MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 10, 2024",
        description: `<h3>🎥 Streaming Software</h3><p>OBS Studio is free and open source software for video recording and live streaming. Create professional productions with powerful features.</p><h3>📱 Features</h3><ul><li>High performance real time capture</li><li>Unlimited scenes and sources</li><li>Intuitive audio mixer</li></ul>`,
        downloads: [
            { type: "64-bit", size: "120MB", url: "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-30.2.3-Windows.zip" },
            { type: "32-bit", size: "120MB", url: "https://github.com/obsproject/obs-studio/releases/download/27.2.4/OBS-Studio-27.2.4-Full-Installer-x86.exe" }
        ],
        oldVersions: []
    },
{
        id: 9,
        name: "Notepad++",
        developer: "Don Ho",
        tagline: "Advanced Text Editor",
        icon: "../img/notepad.webp",
        rating: 4.6,
        category: "tools",
        trending: false,
        new: false,
        version: "8.6.5",
        size: "12MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 09, 2024",
        description: `<h3>📝 Text Editor</h3><p>Notepad++ is a free source code editor and Notepad replacement that supports several languages.</p><h3>🔧 Features</h3><ul><li>Syntax highlighting</li><li>Tab-based editing</li><li>Plugin support</li></ul>`,
        downloads: [
            { type: "64-bit", size: "12MB", url: "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.5/npp.8.6.5.Installer.x64.exe" },
            { type: "32-bit", size: "9MB", url: "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.5/npp.8.6.5.Installer.exe" }
        ],
        oldVersions: []
    },
    {
        id: 10,
        name: "WinRAR",
        developer: "RARLAB",
        tagline: "File Compression Utility",
        icon: "../img/winrar.webp",
        rating: 4.4,
        category: "tools",
        trending: false,
        new: false,
        version: "6.24",
        size: "6MB",
        windowsVersion: "7+",
        lastUpdated: "Nov 30, 2024",
        description: `<h3>📦 File Archiver</h3><p>WinRAR is a powerful archive manager that can backup data and reduce file size.</p><h3>🔧 Features</h3><ul><li>Create and unpack RAR/ZIP files</li><li>Strong AES-256 encryption</li><li>Free trial available</li></ul>`,
        downloads: [
            { type: "64-bit", size: "6MB", url: "https://www.rarlab.com/rar/winrar-x64-624.exe" },
            { type: "32-bit", size: "5MB", url: "https://www.rarlab.com/rar/wrar624.exe" }
        ],
        oldVersions: []
    },
    {
        id: 11,
        name: "7-Zip",
        developer: "Igor Pavlov",
        tagline: "Open-Source Archiver",
        icon: "../img/7zip.webp",
        rating: 4.3,
        category: "tools",
        trending: false,
        new: false,
        version: "24.07",
        size: "2MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 08, 2024",
        description: `<h3>🗜 Archiver</h3><p>7-Zip is a free and open-source file archiver with a high compression ratio.</p><h3>🔧 Features</h3><ul><li>Supports 7z, ZIP, RAR, TAR, and more</li><li>Strong AES-256 encryption</li><li>Completely free</li></ul>`,
        downloads: [
            { type: "64-bit", size: "2MB", url: "https://www.7-zip.org/a/7z2407-x64.exe" },
            { type: "32-bit", size: "1.5MB", url: "https://www.7-zip.org/a/7z2407.exe" }
        ],
        oldVersions: []
    },
    {
        id: 12,
        name: "Blender",
        developer: "Blender Foundation",
        tagline: "3D Creation Suite",
        icon: "../img/blender.webp",
        rating: 4.7,
        category: "design",
        trending: false,
        new: false,
        version: "4.2.0",
        size: "250MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 05, 2024",
        description: `<h3>🎨 3D Creation</h3><p>Blender is the free and open-source 3D creation suite. It supports modeling, rigging, animation, simulation, rendering, and more.</p><h3>🔧 Features</h3><ul><li>Advanced 3D modeling</li><li>Cycles & Eevee render engines</li><li>Python scripting</li></ul>`,
        downloads: [
            { type: "64-bit", size: "250MB", url: "https://download.blender.org/release/Blender4.2/blender-4.2.0-windows-x64.msi" }
        ],
        oldVersions: []
    },
    {
        id: 13,
        name: "GIMP",
        developer: "GIMP Team",
        tagline: "Open-Source Image Editor",
        icon: "../img/gimp.webp",
        rating: 4.4,
        category: "design",
        trending: false,
        new: false,
        version: "2.10.38",
        size: "250MB",
        windowsVersion: "7+",
        lastUpdated: "Nov 25, 2024",
        description: `<h3>🖼 Image Editor</h3><p>GIMP is a free and open-source image editor for tasks such as photo retouching and image composition.</p><h3>🔧 Features</h3><ul><li>Customizable interface</li><li>Advanced image manipulation</li><li>Plugin support</li></ul>`,
        downloads: [
            { type: "64-bit", size: "250MB", url: "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe" }
        ],
        oldVersions: []
    },
    {
        id: 14,
        name: "Microsoft Teams",
        developer: "Microsoft Corporation",
        tagline: "Workplace Collaboration",
        icon: "../img/teams.webp",
        rating: 4.2,
        category: "communication",
        trending: true,
        new: false,
        version: "1.7.00.9764",
        size: "115MB",
        windowsVersion: "10+",
        lastUpdated: "Dec 18, 2024",
        description: `<h3>💼 Collaboration</h3><p>Teams brings together chat, video conferencing, file sharing, and collaboration into one platform for businesses and schools.</p><h3>✨ Key Features</h3><ul><li>Seamless video calls</li><li>Integration with Office 365</li><li>Team chat & file sharing</li></ul>`,
        downloads: [
            { type: "64-bit", size: "115MB", url: "https://go.microsoft.com/fwlink/p/?LinkID=869426&clcid=0x409&culture=en-us&country=US" }
        ],
        oldVersions: []
    },
    {
        id: 15,
        name: "Zoom",
        developer: "Zoom Video Communications",
        tagline: "Video Conferencing Made Easy",
        icon: "../img/zoom.webp",
        rating: 4.3,
        category: "communication",
        trending: false,
        new: false,
        version: "6.1.0",
        size: "92MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 07, 2024",
        description: `<h3>🎥 Video Meetings</h3><p>Zoom is a reliable video conferencing platform with screen sharing, chat, and webinar features.</p><h3>🔧 Features</h3><ul><li>HD video & audio</li><li>Breakout rooms</li><li>Meeting recordings</li></ul>`,
        downloads: [
            { type: "64-bit", size: "92MB", url: "https://zoom.us/client/latest/ZoomInstallerFull.exe" }
        ],
        oldVersions: []
    },
    {
        id: 16,
        name: "FileZilla",
        developer: "Tim Kosse",
        tagline: "Free FTP Client",
        icon: "../img/filezilla.webp",
        rating: 4.0,
        category: "tools",
        trending: false,
        new: false,
        version: "3.67.0",
        size: "12MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 01, 2024",
        description: `<h3>📂 FTP Client</h3><p>FileZilla is a free FTP solution for transferring files across the internet with support for FTP, SFTP, and FTPS.</p><h3>🔧 Features</h3><ul><li>Drag & drop transfers</li><li>Large file support</li><li>Site manager</li></ul>`,
        downloads: [
            { type: "64-bit", size: "12MB", url: "https://download.filezilla-project.org/client/FileZilla_3.67.0_win64-setup.exe" },
            { type: "32-bit", size: "11MB", url: "https://download.filezilla-project.org/client/FileZilla_3.67.0_win32-setup.exe" }
        ],
        oldVersions: []
    },
    {
        id: 17,
        name: "CCleaner",
        developer: "Piriform",
        tagline: "System Cleaning Tool",
        icon: "../img/ccleaner.webp",
        rating: 4.1,
        category: "utilities",
        trending: false,
        new: false,
        version: "6.22",
        size: "55MB",
        windowsVersion: "7+",
        lastUpdated: "Nov 20, 2024",
        description: `<h3>🧹 PC Cleaner</h3><p>CCleaner optimizes your PC by removing junk files, freeing up space, and improving performance.</p><h3>🔧 Features</h3><ul><li>Registry cleaner</li><li>Startup optimization</li><li>Privacy protection</li></ul>`,
        downloads: [
            { type: "64-bit", size: "55MB", url: "https://download.ccleaner.com/ccsetup622.exe" }
        ],
        oldVersions: []
    },
    {
        id: 18,
        name: "Malwarebytes",
        developer: "Malwarebytes Inc.",
        tagline: "Anti-Malware Protection",
        icon: "../img/malware_bytes.webp",
        rating: 4.5,
        category: "security",
        trending: true,
        new: false,
        version: "5.1.2",
        size: "95MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 02, 2024",
        description: `<h3>🛡 Security</h3><p>Malwarebytes protects your PC from malware, ransomware, and advanced online threats.</p><h3>🔧 Features</h3><ul><li>Real-time protection</li><li>Ransomware defense</li><li>Lightweight scanning</li></ul>`,
        downloads: [
            { type: "64-bit", size: "95MB", url: "https://data-cdn.mbamupdates.com/web/mb5-setup-consumer/MBSetup.exe" }
        ],
        oldVersions: []
    },
    {
        id: 19,
        name: "Avast Free Antivirus",
        developer: "Avast Software",
        tagline: "Free Antivirus & Security",
        icon: "../img/avast.webp",
        rating: 4.2,
        category: "security",
        trending: false,
        new: false,
        version: "24.2.6103",
        size: "70MB",
        windowsVersion: "7+",
        lastUpdated: "Nov 28, 2024",
        description: `<h3>🛡 Antivirus</h3><p>Avast offers essential free protection against viruses, malware, and other online threats.</p><h3>🔧 Features</h3><ul><li>Real-time threat detection</li><li>Wi-Fi network security</li><li>Password manager</li></ul>`,
        downloads: [
            { type: "64-bit", size: "70MB", url: "https://files.avast.com/iavs9x/avast_free_antivirus_setup_offline.exe" }
        ],
        oldVersions: []
    },
    {
        id: 20,
        name: "Adobe Acrobat Reader DC",
        developer: "Adobe Inc.",
        tagline: "PDF Reader",
        icon: "../img/adobe.webp",
        rating: 4.3,
        category: "productivity",
        trending: true,
        new: false,
        version: "2025.001.1000",
        size: "180MB",
        windowsVersion: "7+",
        lastUpdated: "Dec 16, 2024",
        description: `<h3>📑 PDF Reader</h3><p>Adobe Reader is the most popular software to view, print, and annotate PDF files.</p><h3>🔧 Features</h3><ul><li>Fill & sign forms</li><li>Sticky notes & comments</li><li>Cloud integration</li></ul>`,
        downloads: [
            { type: "64-bit", size: "180MB", url: "https://ardownload2.adobe.com/pub/adobe/reader/win/AcrobatDC/2400120598/AcroRdrDCx642500011000_MUI.exe" }
        ],
        oldVersions: []
    },
  {
    id: 25,
    name: "LibreOffice",
    developer: "The Document Foundation",
    tagline: "Free Office Suite",
    icon: "../img/libreoffice.webp",
    rating: 4.3,
    category: "productivity",
    trending: false,
    new: false,
    version: "24.2.3",
    size: "330MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>📑 LibreOffice</h3><p>LibreOffice is a powerful open source office suite, successor to OpenOffice, with clean interface and feature-rich tools.</p><h3>🔧 Features</h3><ul><li>Writer, Calc, Impress</li><li>MS Office file compatibility</li><li>Free and open-source</li></ul>`,
    downloads: [
      { type: "Installer (MSI)", size: "≈330MB", directLink: "https://download.documentfoundation.org/libreoffice/stable/24.2.3/win/x86_64/LibreOffice_24.2.3_Win_x86-64.msi" }
    ],
    oldVersions: []
  },
{
    id: 26,
    name: "Mozilla Firefox",
    developer: "Mozilla Foundation",
    tagline: "Fast, Private & Secure Browser",
    icon: "../img/firefox.webp",
    rating: 4.4,
    category: "tools",
    trending: true,
    new: false,
    version: "131.0",
    size: "90MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>🌐 Firefox</h3><p>Firefox is a fast, open-source web browser focused on privacy and customization.</p><h3>✨ Features</h3><ul><li>Enhanced Tracking Protection</li><li>Customizable extensions</li><li>Sync across devices</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈90MB", url: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US" },
      { type: "32-bit", size: "≈80MB", url: "https://download.mozilla.org/?product=firefox-latest&os=win&lang=en-US" }
    ],
    oldVersions: []
},
{
    id: 27,
    name: "Tor Browser",
    developer: "The Tor Project",
    tagline: "Browse Privately",
    icon: "../img/tor.webp",
    rating: 4.2,
    category: "privacy",
    trending: false,
    new: false,
    version: "13.0.15",
    size: "95MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>🕵️ Tor Browser</h3><p>Tor Browser lets you browse the internet anonymously and bypass censorship.</p><h3>✨ Features</h3><ul><li>Blocks trackers</li><li>Multi-layered encryption</li><li>Access .onion sites</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈95MB", url: "https://www.torproject.org/dist/torbrowser/13.0.15/tor-browser-windows-x86_64-portable-13.0.15.exe" }
    ],
    oldVersions: []
},
{
    id: 28,
    name: "Audacity",
    developer: "Audacity Team",
    tagline: "Free Audio Editor",
    icon: "../img/audacity.webp",
    rating: 4.5,
    category: "multimedia",
    trending: false,
    new: false,
    version: "3.6.4",
    size: "30MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>🎶 Audacity</h3><p>Audacity is a free, open-source, cross-platform audio software for multi-track recording and editing.</p><h3>✨ Features</h3><ul><li>Record live audio</li><li>Cut, copy, splice sounds</li><li>Supports plugins</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈30MB", url: "https://github.com/audacity/audacity/releases/download/Audacity-3.6.4/audacity-win-3.6.4-x64.exe" }
    ],
    oldVersions: []
},
{
    id: 29,
    name: "Krita",
    developer: "Krita Foundation",
    tagline: "Digital Painting Software",
    icon: "../img/krita.webp",
    rating: 4.6,
    category: "design",
    trending: false,
    new: false,
    version: "5.2.6",
    size: "150MB",
    windowsVersion: "8.1+",
    lastUpdated: "2025",
    description: `<h3>🎨 Krita</h3><p>Krita is a professional FREE and open-source painting program made by artists.</p><h3>✨ Features</h3><ul><li>Brush stabilizers</li><li>HDR painting</li><li>Animation support</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈150MB", url: "https://download.kde.org/stable/krita/5.2.6/krita-5.2.6-x64-setup.exe" }
    ],
    oldVersions: []
},
{
    id: 30,
    name: "HandBrake",
    developer: "HandBrake Team",
    tagline: "Open-Source Video Transcoder",
    icon: "../img/handbrake.webp",
    rating: 4.4,
    category: "multimedia",
    trending: false,
    new: false,
    version: "1.8.2",
    size: "20MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🎥 HandBrake</h3><p>HandBrake is a free and open-source tool for converting videos from nearly any format.</p><h3>✨ Features</h3><ul><li>Convert to MP4/MKV</li><li>Device presets</li><li>Batch encoding</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈20MB", url: "https://github.com/HandBrake/HandBrake/releases/download/1.8.2/HandBrake-1.8.2-x86_64-Win_GUI.exe" }
    ],
    oldVersions: []
},
{
    id: 31,
    name: "Telegram Desktop",
    developer: "Telegram FZ-LLC",
    tagline: "Fast & Secure Messaging",
    icon: "../img/telegram.webp",
    rating: 4.5,
    category: "social",
    trending: true,
    new: false,
    version: "5.2.3",
    size: "65MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>💬 Telegram</h3><p>Telegram Desktop is a fast, secure, and cloud-based messaging app with sync across devices.</p><h3>✨ Features</h3><ul><li>Cloud chat history</li><li>End-to-end encrypted secret chats</li><li>Large file sharing up to 2GB</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈65MB", url: "https://updates.tdesktop.com/tsetup-x64.exe" },
      { type: "32-bit", size: "≈60MB", url: "https://updates.tdesktop.com/tsetup-x86.exe" }
    ],
    oldVersions: []
},
{
    id: 32,
    name: "Python",
    developer: "Python Software Foundation",
    tagline: "Programming Language",
    icon: "../img/python.webp",
    rating: 4.7,
    category: "development",
    trending: false,
    new: false,
    version: "3.12.6",
    size: "28MB",
    windowsVersion: "8+",
    lastUpdated: "2025",
    description: `<h3>🐍 Python</h3><p>Python is a versatile programming language used in web, AI, data science, and more.</p><h3>✨ Features</h3><ul><li>Easy syntax</li><li>Extensive libraries</li><li>Cross-platform</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈28MB", url: "https://www.python.org/ftp/python/3.12.6/python-3.12.6-amd64.exe" },
      { type: "32-bit", size: "≈25MB", url: "https://www.python.org/ftp/python/3.12.6/python-3.12.6.exe" }
    ],
    oldVersions: []
},
{
    id: 33,
    name: "Git for Windows",
    developer: "Git SCM",
    tagline: "Version Control System",
    icon: "../img/git.webp",
    rating: 4.6,
    category: "development",
    trending: false,
    new: false,
    version: "2.47.0",
    size: "54MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>🔧 Git</h3><p>Git is a distributed version control system that helps track changes in code projects.</p><h3>✨ Features</h3><ul><li>Branching and merging</li><li>Distributed development</li><li>Git Bash included</li></ul>`,
    downloads: [
      { type: "64-bit", size: "≈54MB", url: "https://github.com/git-for-windows/git/releases/download/v2.47.0.windows.1/Git-2.47.0-64-bit.exe" },
      { type: "32-bit", size: "≈48MB", url: "https://github.com/git-for-windows/git/releases/download/v2.47.0.windows.1/Git-2.47.0-32-bit.exe" }
    ],
    oldVersions: []
},
{
    id: 34,
    name: "Node.js",
    developer: "OpenJS Foundation",
    tagline: "JavaScript Runtime",
    icon: "../img/nodejs.webp",
    rating: 4.5,
    category: "development",
    trending: false,
    new: false,
    version: "22.11.0",
    size: "35MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>⚡ Node.js</h3><p>Node.js is a JavaScript runtime built on Chrome's V8 engine, ideal for scalable apps.</p><h3>✨ Features</h3><ul><li>Asynchronous I/O</li><li>Cross-platform</li><li>NPM ecosystem</li></ul>`,
    downloads: [
      { type: "64-bit MSI", size: "≈35MB", url: "https://nodejs.org/dist/v22.11.0/node-v22.11.0-x64.msi" },
      { type: "32-bit MSI", size: "≈30MB", url: "https://nodejs.org/dist/v22.11.0/node-v22.11.0-x86.msi" }
    ],
    oldVersions: []
},
{
    id: 35,
    name: "Java JDK",
    developer: "Oracle Corporation",
    tagline: "Java Development Kit",
    icon: "../img/java.webp",
    rating: 4.4,
    category: "development",
    trending: false,
    new: false,
    version: "23.0.1",
    size: "160MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>☕ Java JDK</h3><p>The Java Development Kit provides tools to develop, compile, and run Java applications.</p><h3>✨ Features</h3><ul><li>javac compiler</li><li>Java Runtime Environment</li><li>Developer tools</li></ul>`,
    downloads: [
      { type: "64-bit MSI", size: "≈160MB", url: "https://download.oracle.com/java/23/latest/jdk-23_windows-x64_bin.msi" }
    ],
    oldVersions: []
},
{
    id: 36,
    name: "TeamViewer",
    developer: "TeamViewer GmbH",
    tagline: "Remote Access & Support",
    icon: "../img/teamviewer.webp",
    rating: 4.5,
    category: "utilities",
    trending: false,
    new: false,
    version: "16.1.6",
    size: "35MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>🔑 Remote Access</h3><p>TeamViewer allows remote control, desktop sharing, online meetings, and file transfer between computers.</p><h3>✨ Features</h3><ul><li>Remote desktop access</li><li>File transfer</li><li>Multi-platform support</li></ul>`,
    downloads: [
        { type: "64-bit EXE", size: "≈35MB", url: "https://download.teamviewer.com/download/TeamViewer_Setup_x64.exe" },
        { type: "32-bit EXE", size: "≈33MB", url: "https://download.teamviewer.com/download/TeamViewer_Setup.exe" }
    ],
    oldVersions: []
},
{
    id: 37,
    name: "Postman",
    developer: "Postman Inc.",
    tagline: "API Development & Testing",
    icon: "../img/postman.webp",
    rating: 4.6,
    category: "development",
    trending: true,
    new: false,
    version: "10.15.5",
    size: "160MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🛠 API Tool</h3><p>Postman simplifies API development by providing a powerful GUI for testing, debugging, and sharing APIs.</p><h3>✨ Features</h3><ul><li>API requests builder</li><li>Automated testing</li><li>Collaboration tools</li></ul>`,
    downloads: [
        { type: "64-bit EXE", size: "≈160MB", url: "https://dl.pstmn.io/download/latest/win64" }
    ],
    oldVersions: []
},
{
    id: 38,
    name: "Docker Desktop",
    developer: "Docker Inc.",
    tagline: "Containerization Platform",
    icon: "../img/docker.webp",
    rating: 4.7,
    category: "development",
    trending: true,
    new: false,
    version: "24.1.0",
    size: "500MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🐳 Docker</h3><p>Docker Desktop enables developers to build, share, and run containerized applications seamlessly on Windows.</p><h3>✨ Features</h3><ul><li>Container management</li><li>Kubernetes integration</li><li>Cross-platform images</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈500MB", url: "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" }
    ],
    oldVersions: []
},
{
    id: 39,
    name: "Android Studio",
    developer: "Google LLC",
    tagline: "Android App Development IDE",
    icon: "../img/android_studio.webp",
    rating: 4.5,
    category: "development",
    trending: false,
    new: false,
    version: "2025.1.1",
    size: "1.2GB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>📱 Android IDE</h3><p>Android Studio is the official IDE for Android app development, featuring code editing, debugging, and testing tools.</p><h3>✨ Features</h3><ul><li>Code editor & debugger</li><li>Emulator for testing</li><li>Integrated Gradle build system</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈1.2GB", url: "https://redirector.gvt1.com/edgedl/android/studio/install/2025.1.1.0/android-studio-2025.1.1.0-windows.exe" }
    ],
    oldVersions: []
},
{
    id: 40,
    name: "WinSCP",
    developer: "Martin Prikryl",
    tagline: "SFTP, FTP & SCP Client",
    icon: "../img/winscp.webp",
    rating: 4.6,
    category: "utilities",
    trending: false,
    new: false,
    version: "6.0.1",
    size: "10MB",
    windowsVersion: "7+",
    lastUpdated: "2025",
    description: `<h3>📂 File Transfer</h3><p>WinSCP is a free SFTP, SCP, and FTP client for secure file transfers between local and remote systems.</p><h3>✨ Features</h3><ul><li>Graphical file manager</li><li>Integrated text editor</li><li>Scriptable transfers</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈10MB", url: "https://winscp.net/download/WinSCP-6.0.1-Setup.exe" }
    ],
    oldVersions: []
},
    {
    id: 41,
    name: "GitHub Desktop",
    developer: "GitHub, Inc.",
    tagline: "Seamless Git Integration",
    icon: "../img/github.webp",
    rating: 4.7,
    category: "utilities",
    trending: true,
    new: false,
    version: "3.3.4",
    size: "173MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🔧 Git Made Easy</h3><p>GitHub Desktop simplifies version control for developers with a user-friendly interface and powerful Git features.</p><h3>🚀 Features</h3><ul><li>Clone repositories</li><li>Commit changes visually</li><li>Resolve merge conflicts</li><li>Integrates with GitHub</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈120MB", url: "https://central.github.com/deployments/desktop/desktop/latest/win32" },
        { type: "Installer (MSI)", size: "≈120MB", url: "https://central.github.com/deployments/desktop/desktop/latest/win32?format=msi" }
    ],
    oldVersions: []
},
    {
    id: 42,
    name: "Cursor",
    developer: "Cursor.sh",
    tagline: "AI-Powered Coding Assistant",
    icon: "../img/cursor.webp",
    rating: 4.8,
    category: "utilities",
    trending: true,
    new: true,
    version: "1.7.0",
    size: "≈115MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🤖 Code Smarter with AI</h3><p>Cursor brings AI directly into your coding workflow, offering intelligent suggestions, refactoring help, and seamless integration with your IDE.</p><h3>⚡ Features</h3><ul><li>AI-assisted coding</li><li>Context-aware suggestions</li><li>Built-in terminal and Git support</li><li>Supports multiple languages</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈115MB", url: "https://api2.cursor.sh/updates/download/golden/win32-x64/cursor/1.7" }
    ],
    oldVersions: []
},
    {
    id: 43,
    name: "Brave Browser",
    developer: "Brave Software, Inc.",
    tagline: "Privacy-Focused Web Browsing",
    icon: "https://img.icons8.com/color/512/brave-web-browser.png",
    rating: 4.6,
    category: "utilities",
    trending: true,
    new: false,
    version: "1.66.110",
    size: "≈95MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>🛡️ Browse Without Compromise</h3><p>Brave Browser blocks trackers and intrusive ads by default, offering a faster, safer, and more private browsing experience.</p><h3>🌐 Features</h3><ul><li>Built-in ad blocker</li><li>Privacy-first search engine</li><li>Earn BAT rewards</li><li>Integrated VPN and firewall</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈95MB", url: "https://laptop-updates.brave.com/download/BRV010" }
    ],
    oldVersions: []
    },
    {
    id: 44,
    name: "DroidCam Client",
    developer: "Dev47Apps",
    tagline: "Turn Your Phone into a Webcam",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fb/6b/09/fb6b0996-c94a-f18a-f83d-e8b722ea7325/AppIcon-0-0-1x_U007epad-0-1-0-0-85-220.png/1200x630wa.jpg",
    rating: 4.5,
    category: "utilities",
    trending: true,
    new: false,
    version: "6.5.2",
    size: "≈16MB",
    windowsVersion: "10+",
    lastUpdated: "2025",
    description: `<h3>📸 Webcam Reimagined</h3><p>DroidCam Client lets you use your Android or iOS device as a high-quality webcam for your PC via Wi-Fi or USB.</p><h3>🔌 Features</h3><ul><li>Supports HD video</li><li>Works with Zoom, Skype, OBS</li><li>USB and wireless modes</li><li>Audio support included</li></ul>`,
    downloads: [
        { type: "Installer (EXE)", size: "≈16MB", url: "https://droidcam.app/go/droidCam.client.setup.exe" }
    ],
    oldVersions: []
},
    {
    id: 45,
    name: "Grand Theft Auto III",
    developer: "Rockstar Games",
    tagline: "The classic open-world crime saga",
    icon: "../img/gta3.webp",
    rating: 4.7,
    category: "games",
    trending: true,
    new: false,
    version: "1.1",
    size: "1.2GB",
    windowsVersion: "7+",
    lastUpdated: "Oct 20, 2024",
    description: `<h3>🚗 Features</h3>
        <p>Grand Theft Auto III revolutionized open-world gaming with its immersive Liberty City, dynamic missions, and freedom of choice.</p>
        <h3>✨ What's New</h3>
        <ul>
            <li>Improved compatibility with modern Windows versions</li>
            <li>Enhanced graphics and widescreen support</li>
            <li>Bug fixes for stability</li>
        </ul>`,
    downloads: [
        { type: "game", size: "1.2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/LQ.GTA.3.ATOM.GUY.rar" }
    ],
    screenshots: ["https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/8fbaa33023630eedf32a7b8379fdd30d.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/a67cd294bd5b65208032d4979834f996.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/2268e1ec55a4ed7831571b318a68e8d7.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/9d84f5e9ba732bcacafabfe9717b3e70.jpg"],
    oldVersions: []
},
    {
    id: 46,
    name: "Grand Theft Auto: Vice City",
    developer: "Rockstar Games",
    tagline: "Welcome to the neon-soaked 80s",
    icon: "../img/gtavc.webp",
    rating: 4.8,
    category: "games",
    trending: true,
    new: false,
    version: "1.1",
    size: "1.1GB",
    windowsVersion: "7+",
    lastUpdated: "Oct 22, 2024",
    description: `<h3>🌴 Features</h3>
        <p>Grand Theft Auto: Vice City takes you back to the 1980s with a vibrant open world, unforgettable soundtrack, and thrilling missions in a city inspired by Miami.</p>
        <h3>✨ What's New</h3>
        <ul>
            <li>Enhanced widescreen and HD texture support</li>
            <li>Improved controller compatibility</li>
            <li>Bug fixes for smoother gameplay</li>
        </ul>`,
    downloads: [
        { type: "Game", size: "1.1GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/LQ.GTA.VC.ATOM.GUY.rar" }
    ],
    screenshots: ["https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/7c3466bd07d09ec14c9555505ea4e6af.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/b0353d1406b5264dc18326a811bc5bb5.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/0301d4689fa8e170ceefe118a18b3afb.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/e689e87adb68899abb7957e4b0d70612.jpg"],
    oldVersions: []
},
    {
    id: 47,
    name: "Grand Theft Auto IV",
    developer: "Rockstar Games",
    tagline: "A new life in Liberty City",
    icon: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/0b01707ef5603a26c1f542088f8f7c09.jpg",
    rating: 4.6,
    category: "games",
    trending: true,
    new: false,
    version: "1.2.0",
    size: "14.9GB",
    windowsVersion: "10+",
    lastUpdated: "Sep 10, 2024",
    description: `<h3>🌆 Features</h3>
        <p>Experience the gritty streets of Liberty City with an immersive storyline, stunning physics, and unforgettable characters.</p>
        <h3>✨ What's New</h3>
        <ul>
            <li>Improved performance & visual enhancements</li>
            <li>Better compatibility for Windows 10/11</li>
            <li>Latest Rockstar patch integration</li>
        </ul>`,
    downloads: [
        { type: "Tutorial", size: "YT-Video", url: "https://www.instagram.com/reels/DBQztB5yuJ8/" },
        { type: "Part 1", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part01.rar" },
        { type: "Part 2", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part02.rar" },
        { type: "Part 3", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part03.rar" },
        { type: "Part 4", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part04.rar" },
        { type: "Part 5", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part05.rar" },
        { type: "Part 6", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part06.rar" },
        { type: "Part 7", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part07.rar" },
        { type: "Part 8", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part08.rar" },
        { type: "Part 9", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part09.rar" },
        { type: "Part 10", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part10.rar" },
        { type: "Part 11", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part11.rar" },
        { type: "Part 12", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part12.rar" },
        { type: "Part 13", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part13.rar" },
        { type: "Part 14", size: "276MB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.IV.-.ATOM.GUY.EDITION.part14.rar" }
    ],
    screenshots: ["https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/5576e5d2cd0f451508d8b025b77e7250.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/cae6f19ea5ca9f4dca32ad0e6c149bf0.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/64735be0708ba85d2d31130b0b5ded19.jpg", "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/86f4cb49763c34e9816535006f5e6a08.jpg"],
    oldVersions: []
},
    {
    id: 48,
    name: "Grand Theft Auto: San Andreas – DE",
    developer: "Rockstar Games",
    tagline: "The legend remastered",
    icon: "https://images.sftcdn.net/images/t_app-icon-s/p/ead93d3c-a2bc-45a9-a217-e0d891ee0fe0/181365800/grand-theft-auto-san-andreas-the-definitive-edition-Grand%20Theft%20Auto%20San%20Andreas%20%E2%80%93%20The%20Definitive%20Edition.png",
    rating: 4.7,
    category: "games",
    trending: true,
    new: false,
    version: "1.0.3",
    size: "22GB",
    windowsVersion: "10+",
    lastUpdated: "Aug 14, 2024",
    description: `<h3>🔥 Features</h3>
        <p>The classic San Andreas experience rebuilt for modern hardware, featuring enhanced graphics and modernized controls.</p>
        <h3>🔄 What's New</h3>
        <ul>
            <li>Improved lighting & high-resolution textures</li>
            <li>Better UI scaling for high-refresh displays</li>
            <li>General performance improvements</li>
        </ul>`,
    downloads: [
        { type: "Tutorial", size: "YT-Video", url: "https://www.instagram.com/reels/DBQztB5yuJ8/" },
        { type: "Part 1", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part01.rar" },
        { type: "Part 2", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part02.rar" },
        { type: "Part 3", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part03.rar" },
        { type: "Part 4", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part04.rar" },
        { type: "Part 5", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part05.rar" },
        { type: "Part 6", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part06.rar" },
        { type: "Part 7", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part07.rar" },
        { type: "Part 8", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part08.rar" },
        { type: "Part 9", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part09.rar" },
        { type: "Part 10", size: "207MB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.SA.Definitive.Edition.-.Atom.Guy.part10.rar" }
    ],
    screenshots: [
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/5c00b0e39ea1fa1e867a6402ed9f4761.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/d28dac374fa7413d066a50ca33cf6da7.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/39d1b9492d201b5d046ee2ba2f136001.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/4bddd183ad5bce1fa0efdc5cbd958743.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/e8a120c239702e7578f40def8fe1b8e5.jpg"
    ],
    oldVersions: []
},
    {
    id: 49,
    name: "Grand Theft Auto: Vice City – DE",
    developer: "Rockstar Games",
    tagline: "Return to the neon paradise",
    icon: "https://i.ibb.co/F4R8xNTL/images.jpg",
    rating: 4.5,
    category: "games",
    trending: true,
    new: false,
    version: "1.0.2",
    size: "18GB",
    windowsVersion: "10+",
    lastUpdated: "Aug 17, 2024",
    description: `<h3>🌴 Features</h3>
        <p>Vice City re-imagined with polished visuals, better lighting, and reworked character models — still keeping its 80s charm.</p>
        <h3>🚀 What's New</h3>
        <ul>
            <li>HD textures + updated shaders</li>
            <li>Modernized controls & UI</li>
            <li>Performance stability improvements</li>
        </ul>`,
    downloads: [
        { type: "Tutorial", size: "YT-Video", url: "https://www.instagram.com/reels/DBQztB5yuJ8/" },
        { type: "Part 1", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.VC.Definitive.Edition.-.Atom.Guy.part1.rar" },
        { type: "Part 2", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.VC.Definitive.Edition.-.Atom.Guy.part2.rar" },
        { type: "Part 3", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.VC.Definitive.Edition.-.Atom.Guy.part3.rar" },
        { type: "Part 4", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.VC.Definitive.Edition.-.Atom.Guy.part4.rar" },
        { type: "Part 5", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.VC.Definitive.Edition.-.Atom.Guy.part5.rar" }
    ],
    screenshots: [
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/aa480237baeaa2aeb0df779e3b42e840.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/c37f2dbd02b15d29abfce91294f29403.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/c56ece29d1d4a95952e36faf50215d22.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/423be4b38c2a859d7cf5b599814d4374.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/6baec421d2ea5db3c5db1dfff3206ea4.jpg"
    ],
    oldVersions: []
},
    {
    id: 50,
    name: "Grand Theft Auto III – DE",
    developer: "Rockstar Games",
    tagline: "The beginning of an era",
    icon: "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/ebac74a3bd8855474149e5183e5daab9.svg",
    rating: 4.4,
    category: "games",
    trending: false,
    new: false,
    version: "1.0.1",
    size: "12GB",
    windowsVersion: "10+",
    lastUpdated: "Jul 29, 2024",
    description: `<h3>🏙 Features</h3>
        <p>The classic Liberty City story rebuilt using modern graphics and gameplay improvements.</p>
        <h3>🆕 What's New</h3>
        <ul>
            <li>Upgraded lighting & textures</li>
            <li>Smoother driving & shooting controls</li>
            <li>Minor performance/bug fixes</li>
        </ul>`,
    downloads: [
        { type: "Tutorial", size: "YT-Video", url: "https://www.instagram.com/reels/DBQztB5yuJ8/" },
        { type: "Part 1", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.III.Definitive.Edition.-.Atom.Guy.part1.rar" },
        { type: "Part 2", size: "2GB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.III.Definitive.Edition.-.Atom.Guy.part2.rar" },
        { type: "Part 3", size: "192MB", url: "https://github.com/privatevoltnexis/appshub/releases/download/v1/GTA.III.Definitive.Edition.-.Atom.Guy.part3.rar" }
    ],
    screenshots: [
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/2d0db280cc91d285f6ed5eb64f3d9d8e.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/f21b89ff222aec91c5c432eeb7993a15.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/4aeff66c2cfd92173bf6a93f9a533b24.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/4d8cb815ee8236e1dbac6e7d3120809b.jpg",
        "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/a6305db310108acdaa5f15d169b1b6c7.jpg"
    ],
    oldVersions: []
},
    {
    id: 51,
    name: "Grand Theft Auto V",
    developer: "Rockstar Games",
    tagline: "Los Santos. Crime. Chaos. Freedom.",
    icon: "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/6a84/c670974867f83cb814c6b46b6fbc6c3d9caa23bf.jpg",
    rating: 4.9,
    category: "games",
    trending: true,
    new: false,
    version: "1.0.2802",
    size: "95GB",
    windowsVersion: "10+",
    lastUpdated: "Oct 03, 2024",
    description: `<h3>🌇 Features</h3>
        <p>Experience the ultimate open-world action with stunning visuals, three playable protagonists, dynamic missions, and endless opportunities across Los Santos & Blaine County.</p>
        <h3>🚀 What's New</h3>
        <ul>
            <li>Optimized graphics for high-end hardware</li>
            <li>Updated Online features and patch support</li>
            <li>General stability and performance improvements</li>
        </ul>`,
    downloads: [
        { type: "Coming Soon", size: "95GB", url: "coming soon" }
    ],
    screenshots: [
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/9ca23774eb886a9dce533874723e35ce7a825f5d.png",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/224f9a314a45e5828e9af56153f8871c06290689.png",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/7f4ce4e75d7fdf8242be91007816104772c99935.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/1e85d43728a064d7cddcdffdc45a6181c4bcb218.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/9b9931818dfa5217424ef574f3aa9c43f06a5d9c.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/24ba6644deb404944cdbe64705285bbad80154a4.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/a9877dd12c6baf42e1def32e0218c540cc95a13d.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/6f3821f838206d283eb6d4daba97d40eee78aa51.jpg",
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/a457313ec277b6e74bd25238768cbcecda739549.jpg"
    ],
    oldVersions: []
}

];

let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Make apps data globally available
window.appsData = apps;

// URL normalization - remove trailing slash from ID-based URLs
if (window.location.search.includes('id=') && window.location.pathname.endsWith('/')) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderApps();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        renderApps();
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderApps();
        });
    });
}

function renderApps() {
    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery) || 
                            app.developer.toLowerCase().includes(searchQuery);
        
        const matchesFilter = currentFilter === 'all' || 
                            app.category === currentFilter ||
                            (currentFilter === 'trending' && app.trending) ||
                            (currentFilter === 'new' && app.new);
        
        return matchesSearch && matchesFilter;
    });

    appsGrid.innerHTML = filteredApps.map(app => createAppCard(app)).join('');
    
    // Add click listeners to app cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', function() {
            const appId = this.dataset.appId;
            const app = apps.find(a => a.id == appId);
            const appData = encodeURIComponent(JSON.stringify(app));
            window.location.href = `app_exe.html?id=${appId}`;
        });
    });
}

function createAppCard(app) {
    const stars = generateStars(app.rating);
    const appData = encodeURIComponent(JSON.stringify(app));
    
    return `
        <div class="app-card" data-app-id="${app.id}">
            <div class="app-card-header">
                <div class="app-card-icon">
                    <img src="${app.icon}" alt="${app.name}">
                </div>
                <div class="app-card-info">
                    <h3>${app.name}</h3>
                    <p class="developer">${app.developer}</p>
                </div>
            </div>
            <p class="app-card-tagline">${app.tagline}</p>
            <div class="app-card-footer">
                <div class="app-rating">
                    <div class="stars">${stars}</div>
                    <span>${app.rating}</span>
                </div>
                <button class="download-btn-small" onclick="event.stopPropagation(); window.location.href='app_exe.html?id=${app.id}'">
                    Details
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}
