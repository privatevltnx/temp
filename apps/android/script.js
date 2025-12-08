// Sample app data with complete details
const apps = [
    {
        id: 1,
        name: "ServeTracko by VoltNexis",
        developer: "VoltNexis PVT LMTD",
        tagline: "Simple. Reliable. Fast.",
        icon: "../img/servetracko.webp",
        rating: 4.5,
        category: "social",
        trending: true,
        new: true,
        version: "2.2.0",
        size: "13MB",
        lastUpdated: "Aug 29, 2025",
        description: `<h3>🚀 Features</h3><p>Serve Tracker is a FREE Service Tool available for Android and other smartphones. ServeTrack uses your phone's Internet connection to Note and recall customers and orders.</p><h3>✨ What's New</h3><ul><li>High Storage</li><li>Improved noting features</li><li>Better file sharing capabilities</li></ul>`,
        downloadUrl: "https://ameeennn.github.io/servetracko",
        apkObb: false,
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: [
            { version: "2.1.0", size: "12MB", url: "https://www.mediafire.com/file/def456/servetracko-v2.1.0.apk/file" },
            { version: "2.0.0", size: "11MB", url: "https://www.mediafire.com/file/ghi789/servetracko-v2.0.0.apk/file" }
        ]
    },
    {
        id: 4,
        name: "WhatsApp Messenger",
        developer: "WhatsApp LLC",
        tagline: "Simple. Reliable. Secure.",
        icon: "../img/whatsapp.webp",
        rating: 4.5,
        category: "social",
        trending: true,
        new: false,
        version: "2.24.19.17",
        size: "96MB",
        lastUpdated: "Dec 15, 2024",
        description: `<h3>🚀 Features</h3><p>WhatsApp Messenger is a FREE messaging app available for Android and other smartphones. WhatsApp uses your phone's Internet connection to message and call friends and family.</p><h3>✨ What's New</h3><ul><li>Enhanced security with end-to-end encryption</li><li>Improved group chat features</li><li>Better file sharing capabilities</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/xgct9xpchdlqyfg/whatsapp-messenger-2-24-19-17.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/ey21SzFwDygWgKaRggLUbdIyu2tglKBpFwGkLVHFmJOM8m01Oek3bi3fJ-7HVsC9XOU=w526-h296-rw", "https://play-lh.googleusercontent.com/ZmcWoo-YPfdO9fiSJ5EekdhNbm0pifBpOBN05HryaT-t2OHpIVmZhQd5vAE4QcoPFQ=w526-h296-rw", "https://play-lh.googleusercontent.com/U4SFDCqj0l9XtKvffEzVcJ3z8TSuGibBMRlOFudbbkfL8YKs5STVB5W71eRty881Zorn=w526-h296-rw", "https://play-lh.googleusercontent.com/EjSO3MSyZN-itVa9kOlvNkNakBw2T1opl6COxjQtLIwjNAYMTTNWkXP8LLN1JTTf7w=w526-h296-rw", "https://play-lh.googleusercontent.com/jFySdSELzJM8i4jmlIVkZBphkyUHKQnSPjle54uCVe3B8FArSnRxiO7FCPZWO6yd9w=w526-h296-rw"],
        oldVersions: [
            { version: "2.24.12.79", size: "56MB", url: "https://www.mediafire.com/file/t1umgjzc384x4dy/whatsapp-messenger-2-24-12-79.apk/file" }
        ]
    },
    {
        id: 2,
        name: "PUBG Mobile",
        developer: "PUBG Corporation",
        tagline: "Battle Royale Experience",
        icon: "../img/pubg_mobile.webp",
        rating: 4.2,
        category: "games",
        trending: true,
        new: false,
        version: "2.9.0",
        size: "1.2GB",
        lastUpdated: "Dec 12, 2024",
        description: `<h3>🎮 Game Features</h3><p>PUBG MOBILE delivers the most intense free-to-play multiplayer action on mobile. Drop in, gear up, and compete.</p><h3>🆕 Latest Updates</h3><ul><li>New Sanhok 2.0 map</li><li>Enhanced graphics and performance</li><li>New weapons and vehicles</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/xyz123/pubg-mobile-v2.9.0.apk/file",
        obbUrl: "https://www.mediafire.com/file/obb456/pubg-mobile-v2.9.0.obb/file",
        apkObb: true,
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: [
            { version: "2.8.0", size: "1.1GB", url: "https://www.mediafire.com/file/old123/pubg-mobile-v2.8.0.apk/file", obbUrl: "https://www.mediafire.com/file/oldobb123/pubg-mobile-v2.8.0.obb/file" }
        ]
    },
    {
        id: 3,
        name: "Instagram",
        developer: "Instagram",
        tagline: "Photo & Video Sharing",
        icon: "../img/instagram.webp",
        rating: 4.3,
        category: "social",
        trending: false,
        new: false,
        version: "396.0.0.46.242",
        size: "86MB",
        lastUpdated: "Dec 14, 2024",
        description: `<h3>📸 Share Your Story</h3><p>Instagram is a simple way to capture and share the world's moments. Follow your friends and family to see what they're up to.</p><h3>🌟 Key Features</h3><ul><li>Stories that disappear after 24 hours</li><li>Reels for short, entertaining videos</li><li>Direct messaging with friends</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/zlkrcu4hrxoj7yh/com-instagram-android-396.0.0.46.242-VoltNexis.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/n74uQe2LDP6pqPQvDsgN8pabNNc8NdShoRzbA7gr7Hd9Y9clPkZ5Xg2L1osnPqTJC9IHHYD867RC3eDORxDd=w526-h296-rw", "https://play-lh.googleusercontent.com/_K0t5bG4GM30T6QF6onfa4Xbp1fjgXuB1EQBTaCY_CS2_agQKvxB2SBQxEPjnP6-AY9bNrHAjxSGXCwFNO9RMQ=w526-h296-rw", "https://play-lh.googleusercontent.com/Ovro78HjEglmrw0VggPyZnjoVSaH_odOdTnDh52LyCH6OtB3gQyq9qT86N0p7CuWg22YVjP-siq0x5PlqxVQWX0=w526-h296-rw", "https://play-lh.googleusercontent.com/6gTZ3MuWAe10qEjX4JmFVZdyAqxYcigwvgixrx8eI8Llbmkd9UzJtkIsLSKkLBM5QFLNp6a4eXknqMTt0uks7A=w526-h296-rw", "https://play-lh.googleusercontent.com/KBU8I0Z76oAnpQ9K2zNGs6-mi3O3O_m9c_V-BlRF90lh2jjll4uE8nQ4-zIXgM4rPbmr4pPfImEIC6Ze_CNT_Go=w526-h296-rw", "https://play-lh.googleusercontent.com/AGsm7HoW9NbRwzSGHqCGVx-Hz9v2ps2nBAz0uKnxg95xfuO82ESNCN50y1-M2oxhR09Zq74naiWa3ECd809qNg=w526-h296-rw", "https://play-lh.googleusercontent.com/1jevwdYf5vTIoTInKEV3XF0bQw_tqF4-umAV5CYO-CZ9CPN0tc5CAdUkMt-yCPPtqFKZK12AyrbR3SsXrJT9kZM=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 5,
        name: "Chrome Browser",
        developer: "Google LLC",
        tagline: "Fast & Secure Browser",
        icon: "../img/chrome.webp",
        rating: 4.1,
        category: "tools",
        trending: false,
        new: false,
        version: "119.0.6045.193",
        size: "95MB",
        lastUpdated: "Dec 13, 2024",
        description: `<h3>🌐 Browse the Web</h3><p>Google Chrome is a fast, easy to use, and secure web browser. Designed for Android.</p><h3>🔒 Security Features</h3><ul><li>Safe Browsing protection</li><li>Automatic security updates</li><li>Built-in password manager</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/ch123/chrome-v119.0.6045.193.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/tJ_NMSzPdfheBndSFBajp6OlTMytkPhSfI-L706jUlmb8n1aZ2EbL9Q-gRG2YgLUH0c=w526-h296-rw", "https://play-lh.googleusercontent.com/66oq-94yvBkr0VM24hBWQVig88osE_tuvpp4GLQAdBKSO76CoifaW2V2D1yJfgFGST4=w526-h296-rw", "https://play-lh.googleusercontent.com/O4EK8x13GqLgZSncjB-hY0VE0jW_ML0LlYUhw7dbhm2xIwAhxmaV1Ntj5DhHvT481i8=w526-h296-rw", "https://play-lh.googleusercontent.com/TujlV-eHL2wibKnFtZHLui2nxH4vKGTGkMLEZdLXIy8Ri-dmVh2zGJd3DbduPGmxiM0=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 6,
        name: "Spotify Music",
        developer: "Spotify AB",
        tagline: "Music & Podcasts",
        icon: "../img/spotify.webp",
        rating: 4.6,
        category: "entertainment",
        trending: false,
        new: false,
        version: "8.8.96.488",
        size: "85MB",
        lastUpdated: "Dec 11, 2024",
        description: `<h3>🎵 Music Streaming</h3><p>Spotify gives you instant access to millions of songs and podcasts. Listen to your favorite music and discover new tracks.</p><h3>🎧 Premium Features</h3><ul><li>Ad-free music streaming</li><li>Offline downloads</li><li>High-quality audio</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/sp123/spotify-v8.8.96.488.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/9SmS6iDjgHMeJ0eQEYO_aqydHwva5IKW-AgsDYVTA0qGl-sR7kVs53tfefH7M5SbXkHZ=w2560-h1440-rw", "https://play-lh.googleusercontent.com/jxKKTdO_yUaRF3WgaEVQc_kRgGVwZsHy8tk39U44w-aC9j3Fn8D5Or5_mFN2yUb7mw=w2560-h1440-rw", "https://play-lh.googleusercontent.com/0LdOwYnofsDhzzkv-h2oVpbsHeBJJaemACZkIFPk38zgMQUjrFqZEuYe2kCETvxJFg=w2560-h1440-rw", "https://play-lh.googleusercontent.com/vm1wDmBZ9D5TkJq0TD-oDRMlhE5OklyI3jIaKnvl2dgVDk5vpCz861BkZgq14Ut8AAs=w2560-h1440-rw", "https://play-lh.googleusercontent.com/AM8tH9-Un9q-TqDd87Cahyv19VxI-eMi2iIOQljzLilMA3evLJTrdAptDhlBDnkDrA=w2560-h1440-rw", "https://play-lh.googleusercontent.com/FnWoGBWaA1cCBEu8k9OeflRLo-x9Bv1pKJ8fGCbM0hpZuyUVea6X1FNWwZeW8VcH9lpO=w2560-h1440-rw", "https://play-lh.googleusercontent.com/1dU67szY42cpRMi9-7ELzUrGvaDJbBYJ3YTzwCN7zKSAxQIf6rF8XE45ZtDB5EeLtVCO=w2560-h1440-rw", "https://play-lh.googleusercontent.com/ZEwynRPyrt-7SHSOOTR-WTCRT5RRcANiaBWQyscgV6N8RVgXgX58Ndbs6xFMh17ZRQ=w2560-h1440-rw"],
        oldVersions: []
    },
    {
        id: 7,
        name: "Telegram",
        developer: "Telegram FZ-LLC",
        tagline: "Cloud-Based Messaging",
        icon: "../img/telegram.webp",
        rating: 4.7,
        category: "social",
        trending: false,
        new: true,
        version: "10.2.5",
        size: "55MB",
        lastUpdated: "Dec 17, 2024",
        description: `<h3>💬 Secure Messaging</h3><p>Telegram is a messaging app with a focus on speed and security. It's super-fast, simple and free.</p><h3>🔐 Privacy Features</h3><ul><li>Secret chats with end-to-end encryption</li><li>Self-destructing messages</li><li>No ads or subscription fees</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/tg123/telegram-v10.2.5.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/wlwY1vowGxTrvQMRDHJD21iYBG7S_E09QbKPY-L6dqEc4UxCi0fDQiNuCBonFYED1yU=w526-h296-rw", "https://play-lh.googleusercontent.com/xdjWKko-a2DFtICA6tfP0vXSBIDTFl_iprhVQb9HnS-rGjyR1wZckqM721qHsF-2z0U=w526-h296-rw", "https://play-lh.googleusercontent.com/NaeXtT-aGP9_R8LROs3XyWVc6eU7sxYuuywNwg3c99AjRtj6cCoPaJynhP0t8uynF6hm=w526-h296-rw", "https://play-lh.googleusercontent.com/J5JG9T92CSZopWKloI00_DsmyQprRvEwItBwPkESjcAlIKy5v4ae3T4pmbH1sWFf3RTQ=w526-h296-rw", "https://play-lh.googleusercontent.com/9HoCw2kOVFD504YpjDyk1Aa5WtcbDsxS_wesF-yT-5iHEvRgHZXT22g2clFXGGwoCTOt=w526-h296-rw", "https://play-lh.googleusercontent.com/bDGf2oHe1y_uaFE6XCh2kYicn3-1yiLMTI5hae9s5zMaNPzOpj04An1URWQyw5m5JhA=w526-h296-rw", "https://play-lh.googleusercontent.com/v0zodHEHUcMgUZSK490M9L5c3Grk5pkDHL-TTdfQK3098Wg0W2bxbK1-cmgN9aKEuQ=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 8,
        name: "VLC Media Player",
        developer: "VideoLAN",
        tagline: "Universal Media Player",
        icon: "../img/vlc.webp",
        rating: 4.5,
        category: "tools",
        trending: false,
        new: false,
        version: "3.5.4",
        size: "40MB",
        lastUpdated: "Dec 10, 2024",
        description: `<h3>🎬 Media Player</h3><p>VLC media player is a free and open source cross-platform multimedia player that plays most multimedia files.</p><h3>📱 Features</h3><ul><li>Plays all video and audio formats</li><li>Network streaming support</li><li>Subtitle support</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/vlc123/vlc-v3.5.4.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/95v1I1Ug0osHaRXS333ep-eRwS4Ge2VbPLr0-iWV6M-zrtoMI6_0dyjeXBwgAVNxsc0=w526-h296-rw", "https://play-lh.googleusercontent.com/nikOvX6j85cKDh03YXWXAaxe7NnqHqmWfLSHKh4Vovz8j3i-AZsAkGXnTPKhQrYxew=w526-h296-rw", "https://play-lh.googleusercontent.com/eTugsqoG3uGUIIGELBEJ9roJUADaQtcDUilEarDDNz2No04UDvDNv9q8t9KKtuKVY3s=w526-h296-rw", "https://play-lh.googleusercontent.com/ogL_ALeWnGWa17DtypsiosZK0C5ica6Ywj2W4EolImtWoeTSvMHT9WWd1jXAxG2F5Fs=w526-h296-rw", "https://play-lh.googleusercontent.com/k8r4N7nJEbgaQxr_LQamdBm_mKq4JzPLB1JutXGtK7IvTlKuLmTcHpGIT_C8J5_H5EEu=w526-h296-rw", "https://play-lh.googleusercontent.com/1XODGSmpS1DW4d-7qOkF0f3lPXmfSUwYh-kOGYM9PoA8qgPHacfoqv99dw3DMlM7nQ=w526-h296-rw", "https://play-lh.googleusercontent.com/p9IUPGzeR8o8v_NPjgsGvbqwGVT-T0evVqXJYAbvGO-s9CTWI1HfMefQ-fvNbA8cl28=w526-h296-rw", "https://play-lh.googleusercontent.com/gG6kqF7kTcru-iPQ1q2mmGTQ3KDqASFIRQ5KddtDrOWsD8h0lgbzIwU8VQH9SLFjgA=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 9,
        name: "ChatGPT",
        developer: "OpenAI",
        tagline: "AI Chat Assistant",
        icon: "../img/chatgpt.webp",
        rating: 4.8,
        category: "tools",
        trending: true,
        new: false,
        version: "3.8.8.0",
        size: "48MB",
        lastUpdated: "Sep 10, 2025",
        description: `<h3>🤖 AI Assistant</h3><p>ChatGPT helps you with conversations, coding, and creative writing.</p><h3>📱 Features</h3><ul><li>AI-powered chat</li><li>Code and text generation</li><li>Cross-platform support</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/lqrh3jc5n4db37k/ChatGPT_v3.8.8.0.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/kos-01Oyvq1Ew83cwHSLidZBFZY9VUHRvPulIDqRQm2PybvdW0N8VHaXNFw5Y9E7eA=w526-h296-rw", "https://play-lh.googleusercontent.com/M6hPP-7qKvIWOB-MsS7JGIgPdejx2UO-xmCo3Y70ktq0vk4G5EMR0JVbnM6UwK69edJY=w526-h296-rw", "https://play-lh.googleusercontent.com/zYxgV8u7Y8JpFeXsOkm8vld6dCw03D659pkYsNCsraAfTEFqOcrwNdX7192x5vTX-g=w526-h296-rw", "https://play-lh.googleusercontent.com/j7tOkeAVtthcKMd11BGtMGHB-N2TPuBLkGNuI172amq1eq8la3NGxZYYcqruB8GQeefY=w526-h296-rw", "https://play-lh.googleusercontent.com/5leQ0VF54DWJiCzkij2fhuU8ALW-Zl5l-CQSpl-wsKvicMYBqqB5h67RkbP40jBKSENW=w526-h296-rw", "https://play-lh.googleusercontent.com/8LOboIAHVpWBeyUjocr3ktLeof_XN8wUhImoIhUTZln5ELXXmqXBBYtBbBhIcEz31Tk=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 11,
        name: "Google Family",
        developer: "Google LLC",
        tagline: "Family Safety & Sharing",
        icon: "../img/google-family.webp",
        rating: 4.6,
        category: "tools",
        trending: false,
        new: false,
        version: "2.30.0",
        size: "52MB",
        lastUpdated: "Jul 18, 2025",
        description: `<h3>👨‍👩‍👧 Family Management</h3><p>Google Family helps you manage kids' accounts, apps, and screen time.</p><h3>📱 Features</h3><ul><li>Parental controls</li><li>Location tracking</li><li>Screen time limits</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/ujd4oolcj4sqspc/google-family-link-2-30-0.VoltNexis.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/ybDY1GG3OKKkuP6ptnd0PhOaIrR2J1YXP6LKy-CoIy9V2iCtD7WXWHkh2MUdORnmQwg=w526-h296-rw", "https://play-lh.googleusercontent.com/pbB-7zVg0Mcr3b90CBnk7YBQT-PA-TXd0A_KqVQ-XUhYC1IbTrig0ndz_nQvcRsk3w=w526-h296-rw", "https://play-lh.googleusercontent.com/Wlh5j3tQg_NJ3mtqCt63r6_2boxvBNfGsInITZR06D2lYXX6v3JUQo5JhDQLqlFeJP0=w526-h296-rw", "https://play-lh.googleusercontent.com/Owl6vMrP5prBiSjZuxeC1YTzgfUOJz5quPiQwmeVzbePHvmxf5dV7eU7BlWUk2sTuRVg=w526-h296-rw", "https://play-lh.googleusercontent.com/Qj3Mkp0L5VqiKZJBbCVD6PUIMLp7gknHX4DNhEpWJSdBERCZXhFzIK-4xoaCaHeD-w=w526-h296-rw", "https://play-lh.googleusercontent.com/kd3IvI5SD-GMEeuiEbD5hkWiBlwSbR3SMvzs2D3L52AviihLKRwXaNvbgyOMCJDWiOcx=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 12,
        name: "GTA 3",
        developer: "Rockstar Games",
        tagline: "Classic Open World",
        icon: "../img/gta3.webp",
        rating: 4.7,
        category: "games",
        trending: true,
        new: false,
        version: "1.8",
        size: "12MB+655MB",
        lastUpdated: "Jun 12, 2025",
        description: `<h3>🚗 Open World Action</h3><p>GTA 3 brings the revolutionary open-world experience to mobile.</p><h3>🎮 Features</h3><ul><li>Story missions</li><li>Open-world freedom</li><li>HD graphics</li></ul>`,
        downloads: [
            { type: "APK Part 1", url: "https://www.mediafire.com/file/84rffifixkrjae5/GTA_3_v1.8_Part1.apk/file", size: "6MB" },
            { type: "APK Part 2", url: "https://www.mediafire.com/file/84rffifixkrjae6/GTA_3_v1.8_Part2.apk/file", size: "6MB" },
            { type: "OBB Data", url: "https://www.mediafire.com/file/wkae6wtgy3nkqkk/com.rockstar.gta3.zip/file", size: "655MB" }
        ],
        multiPart: true,
        screenshots: ["https://play-lh.googleusercontent.com/44ZhJFHQQzHSt5HVA7tkNMOAWOnMhYhbpPEQvOZ7dDnVTM8-I-ai55B66mlH9IV_jw=w526-h296-rw", "https://play-lh.googleusercontent.com/Qn5b6PqQSbpHvJzxMgnBB32UEyTwXt39kdzzx17Xuu-98GkjbK27XR5Et_oyKEoyw3c=w526-h296-rw", "https://play-lh.googleusercontent.com/G1-bzIxaWy5DGqv-vlfd7fgWCDmWJhMVIdx8KLSceXqBUGJikqSpD-36lcldpzBaRSU=w526-h296-rw", "https://play-lh.googleusercontent.com/biWCYTThuoay6Gs4aAKBRI5CMFtbC2FezZUWJ0PCskOTgJfSHnUdW6T04JZ3PZb_hQ=w526-h296-rw", "https://play-lh.googleusercontent.com/hW8s3qJdsmYJLfuHV1baq8X5hZp2igbk29mItOosezqxpqzpHrTRnMsu_6bfGJSeoWU=w526-h296-rw", "https://play-lh.googleusercontent.com/ujih8zF9R2ghF-qx2-gfu9hzDybab_hkmbTcelcS_lipXzbN0Yq9uSjXXNhfMucNqW84=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 13,
        name: "GTA 4",
        developer: ".....",
        tagline: "Liberty City Stories",
        icon: "../img/gta4.webp",
        rating: 4.8,
        category: "games",
        trending: true,
        new: false,
        version: "1.0",
        size: "229MB",
        lastUpdated: "May 8, 2025",
        description: `<h3>🏙️ Next-Gen Open World</h3><p>Experience Liberty City with HD graphics and action-packed missions.</p><h3>🎮 Features</h3><ul><li>Massive open world</li><li>Realistic physics</li><li>Epic storyline</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/fe2zd89oi6oibb7/GTA_4_Mobile_Edition_1_1.0.apk/file",
        apkObb: false,
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: []
    },
    {
        id: 14,
        name: "GTA Chinatown Wars",
        developer: "Rockstar Games",
        tagline: "Handheld GTA Adventure",
        icon: "../img/gta-ctw.webp",
        rating: 4.3,
        category: "games",
        trending: false,
        new: false,
        version: "4.4.221",
        size: "913MB",
        lastUpdated: "Apr 20, 2025",
        description: `<h3>🕹️ Handheld Open World</h3><p>A unique top-down GTA with action, missions, and crime-filled gameplay.</p><h3>🎮 Features</h3><ul><li>Top-down GTA style</li><li>Story missions</li><li>Fun mini-games</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/oy7512ufnhpxmcs/com.rockstargames.gtactw_4.4.221-VoltNexis.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/MhpadInAToLj9aDXpkeSGsB7wJC41Seg3kXMCQBxztBakOQ26D0leql07NYbo7Ek9Go=w526-h296-rw", "https://play-lh.googleusercontent.com/bLLeI9mlgY3EiOhKqOwtm6delmSY_rsu4TSQ6suFT5xzM749b0eHVt35i3bqTw4Osgs=w526-h296-rw", "https://play-lh.googleusercontent.com/LgPH6EKKRd1yb25hHVanwuak9k4b4ykf1lvBNSkp22j8iAJbNLQr2Uy88cOEvqZw_A=w526-h296-rw", "https://play-lh.googleusercontent.com/r-LDNmVGtvsqpEYDygXyONLP1PHgq4gWrlsgNjjyKXO_D9ZQ_etCxd1CfUtMpt8qn0o=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 15,
        name: "HappyMod",
        developer: "HappyMod Team",
        tagline: "Mod APK Store",
        icon: "../img/happy-mod.webp",
        rating: 4.1,
        category: "tools",
        trending: true,
        new: false,
        version: "3.1.6",
        size: "18MB",
        lastUpdated: "Sep 1, 2025",
        description: `<h3>📥 Mod APKs</h3><p>HappyMod provides modded versions of popular apps and games.</p><h3>📱 Features</h3><ul><li>Thousands of mods</li><li>Fast downloads</li><li>User community</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/zf4f0z9gua5kkom/HappyMod-Download-3-1-6.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/jHgs0CyZh6UUcG-QnGuKkVkYsSo0KfvrzU6wdp5RwXfCWUehRJfhAHXemp_bXHgsk6O1x0U-VQNq4nULmjf76A=w526-h296-rw", "https://play-lh.googleusercontent.com/DLSUtIOgMNOt7B5NhJ82U3DdniKSLRjDWgA-6jDaOeZx6eElvukkYWFlBS9s-xrrQVQwc8aTfpVhfmJxO-Lwgw=w526-h296-rw", "https://play-lh.googleusercontent.com/wzP66qXQHUiTO_LoD2bzTY-MiWzxlO31-Q90B61K_a-f0BshPmP8zLcRv8c1TOJQo0-Vxkv1c5OC_4th3aAgEg=w526-h296-rw", "https://play-lh.googleusercontent.com/29QmXdC-oL6QUvUGZkoU4YjS3-4v18XiX-nlKfTWr5TQhwcYBBI69g_YhJ4ivqHs6xQjLeu8BhGfmzTXAnF-FaI=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 17,
        name: "Instagram Lite",
        developer: "Meta",
        tagline: "Lightweight Instagram",
        icon: "../img/insta-lite.webp",
        rating: 4.5,
        category: "social",
        trending: true,
        new: false,
        version: "411.0.0.10.112",
        size: "2MB",
        lastUpdated: "Sep 15, 2025",
        description: `<h3>📷 Social Media</h3><p>Instagram Lite is the fast, lightweight version of Instagram.</p><h3>📱 Features</h3><ul><li>Photos & reels</li><li>Stories support</li><li>DMs and likes</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/xfcbh7uw4fp6o9e/instagram-lite-411-0-0-10-112.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/3O8IUWyN9Iijf8XvolIud4HnD762d4FbEXG2j4VE8XA52gIyMwQNA2Ae7H6_FUsfGLXB=w526-h296-rw", "https://play-lh.googleusercontent.com/BJgy51ohXrbeushjspUbDZguX6wpvpYKppCf7iCc4mLHSqh-VI9D6IY_usH5aeGfHnWF=w526-h296-rw", "https://play-lh.googleusercontent.com/_CSDgUNeQ-ci6z6-eymHRFck0elcbfLS0iYT7Qnyh3Qz9m29tKxn5cFEFyB3mYg2qA8=w526-h296-rw", "https://play-lh.googleusercontent.com/uXfu123rb8kbFu3prUCPm4lEgPW9vKbimqmw8Zu1zdUWr1C7xpw8mV139xz6UgoNqtw=w526-h296-rw", "https://play-lh.googleusercontent.com/xe_tCywdhgrXAN-Xpc9YfM4HTU7fhNZYuxA1Zzt-bmpsdi3C19AiAQlNqfTotwUxpg=w526-h296-rw", "https://play-lh.googleusercontent.com/vIklVc3XqXCpdZuoAjWPUshje45BzQkNhmX3RuMkCxrkE51c0eUdjKM9xVMW2rDQ1k8=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 18,
        name: "Pydroid",
        developer: "Lider Soft KZ",
        tagline: "Python IDE for Android",
        icon: "../img/pydroid.webp",
        rating: 4.7,
        category: "education",
        trending: true,
        new: false,
        version: "6.2",
        size: "60MB",
        lastUpdated: "Jul 28, 2025",
        description: `<h3>🐍 Python IDE</h3><p>Pydroid lets you code and run Python on your Android device.</p><h3>📱 Features</h3><ul><li>Offline Python compiler</li><li>Library manager (pip)</li><li>Easy UI for beginners</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/svnk87uhehinw0t/PyDroid.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/E1iBlWNcbJ5dENtH7fbdMMBISlVCfGbuiqqvTrvs3pcKdHiRXu7dyNaDMSRVPXA1JQ=w526-h296-rw", "https://play-lh.googleusercontent.com/qW_OiYXNgycCQ6Xf4vo8teIuqMvvt6Lgd3K9_aPIJmQ5Nquu-6c41dAlDSIDJhdRqgg=w526-h296-rw", "https://play-lh.googleusercontent.com/7jlIIvJoG7gxUgqc3b7vMn1cEpDHyUGPyzcyT7SA3RecWa019ecmjJwYwlX3UDzc2sk=w526-h296-rw", "https://play-lh.googleusercontent.com/703u1lb45d4STtoP049dP9YOxS3HcMectPVoVkr7S0TpgojcI8PtYnWlxLOS3pfe26g=w526-h296-rw", "https://play-lh.googleusercontent.com/lRS6jmwfrmRfWCZVIEPste7C2q9WMef7XMmGasGAn8Z5Rk66_84DMfUAdeNeo8o9_g=w526-h296-rw", "https://play-lh.googleusercontent.com/NmLPoY7uSmVIrXfmqoLZACtFMXKCOOWggyYW8VXjVfqxY2Xgf0XWem6E5HQcMrChyozi=w526-h296-rw", "https://play-lh.googleusercontent.com/WBwb6lDIjSDoL9E24rd-fk7UvXHqeHeCWk6V6S_9lPFBPTlanAl2T0K57QccWPNN4Q=w526-h296-rw", "https://play-lh.googleusercontent.com/ng42ufmvB5F1mZvTYWYvewd-QeYKY7i_iVuz8s5d8gS_ZwrsiQpHS1qHm--gfCySs0kc=w526-h296-rw"],
        oldVersions: []
    },
    {
        id: 19,
        name: "Uptodown",
        developer: "Uptodown Inc.",
        tagline: "APK Store",
        icon: "../img/uptodown.webp",
        rating: 4.4,
        category: "tools",
        trending: true,
        new: false,
        version: "5.9",
        size: "17MB",
        lastUpdated: "Aug 25, 2025",
        description: `<h3>📥 APK Store</h3><p>Uptodown is a safe app store with thousands of APKs.</p><h3>📱 Features</h3><ul><li>Wide app selection</li><li>Older versions</li><li>Free downloads</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/c0045tl34e2a243/UPTODOWN_APP-STORE.apk/file",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 20,
        name: "WhatsApp Business",
        developer: "WhatsApp LLC",
        tagline: "Business Messaging App",
        icon: "../img/whatsapp_business.webp",
        rating: 4.9,
        category: "social",
        trending: true,
        new: false,
        version: "2.25.14",
        size: "35MB",
        lastUpdated: "Sep 12, 2025",
        description: `<h3>💬 Messaging</h3><p>WhatsApp lets you chat, call, and share files worldwide.</p><h3>📱 Features</h3><ul><li>Free messaging</li><li>Voice & video calls</li><li>Secure encryption</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/whatsapp/whatsapp.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/4OcZbSdHY67pw--Fm_JGeNp4pXmSpjPKRBQYkX2PXinxRhDSAJ96v-WEmyGrBtwP3C7C=w526-h296", "https://play-lh.googleusercontent.com/YW0nK6tnxykZcdeqlUUIGbHdJ-M9S5-ozT3UJB3yzNymHgFIVX-xCryTsbJhIOFXMwY=w526-h296", "https://play-lh.googleusercontent.com/48oIXcHsskmY2EIeOFnpo284deeMC37bb2FYFHqXrGT6fWlhJNU_L_GuWOxI4t5tbf0c=w526-h296", "https://play-lh.googleusercontent.com/I1_KRcB0BNiwHNChPvulWgr8mxLZ8-VuHG3wHR-rW61q3UzrSYK22uTb9GuAZVeqGw=w526-h296", "https://play-lh.googleusercontent.com/y9z37CuT-YtZnWzTL2Ad1jmG3YxFMpXEwjsXJ2y0AgSJPhmxZ1Pf0SKOYAqHblCJ9A=w526-h296", "https://play-lh.googleusercontent.com/2AREEwBVXqOrBTkuqYH2Q8llzJTbQKAf1EQyYBESfXdNf0KSywfAFCodrY-TVxH8qLc=w526-h296", "https://play-lh.googleusercontent.com/2AREEwBVXqOrBTkuqYH2Q8llzJTbQKAf1EQyYBESfXdNf0KSywfAFCodrY-TVxH8qLc=w526-h296", "https://play-lh.googleusercontent.com/eYwrBsUE9qpxnz2OJTqbLlGxaWSn9lNMl_v99ZOnKD_yNRoweD8jluLQWGNhOVrNM06u=w526-h296", "https://play-lh.googleusercontent.com/rLU1hdqqizwFU9YTGzEVPrza2rvnS04cj3uKuw5lyOCZKlkJaE0LjgdcWlZ9YjV1YLo=w526-h296", "https://play-lh.googleusercontent.com/yFxoqFPQxSdLlfHJQQpPFpDwtqvdaVccw9MUkiJ7_L9ju1vji3aukxB-KFsYgMeBxig=w526-h296"],
        oldVersions: []
    },
    {
        id: 21,
        name: "ZArchiver",
        developer: "ZDevs",
        tagline: "Archive Manager",
        icon: "../img/zarchiver.webp",
        rating: 4.6,
        category: "tools",
        trending: false,
        new: false,
        version: "1.0.9",
        size: "5MB",
        lastUpdated: "Aug 30, 2025",
        description: `<h3>📂 File Manager</h3><p>ZArchiver helps you manage and extract compressed files.</p><h3>📱 Features</h3><ul><li>ZIP, RAR, 7Z support</li><li>Password protection</li><li>Simple UI</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/t70vm57n2bk4yap/Zarchiver.apk/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/gKQ-g_ftYkM5UwRn8ZHzI6pBsWmefZqk0zMyjy2ZU75empVVWLYqnwBURl39Kzlqqw=w526-h296", "https://play-lh.googleusercontent.com/hDL0GqhXUsMHOWOTIyp_56xd6If7i48fE_1KAKNMvtqWi3Ll_6kLxuKCNmd11QgaRp0=w526-h296", "https://play-lh.googleusercontent.com/4DfYsNDFO_J--oaH8Epmb2SIcdovfOyfvlZ2SgwktKlICEPLHi21bD-v0MWzDmDq5FY=w526-h296", "https://play-lh.googleusercontent.com/7a1qe0Wvc-hhXMFc17kRiU2FsnUpEdaTn_qrVVa0ThrYtM1s3aLltgm7-Vl5L2Q_dTc=w526-h296", "https://play-lh.googleusercontent.com/5_B7rs-4ftPzf3k9I-1mei4eFPoBDLs2pnt9g8x9F-PXaHsWPCSV2rshiZ-JSRIjqbY=w526-h296", "https://play-lh.googleusercontent.com/envptXJHuduvJYX6fMRxm4-K8GotQ4-w48-o0ganC86zOFLtYHLiv4EQJGH_8C8pag=w526-h296"],
        oldVersions: []
    },
    {
        id: 22,
        name: "1 2 3 4 Player Games",
        developer: "Better World Games",
        tagline: "Fun Multiplayer Games, XAPK",
        icon: "../img/1234player.webp",
        rating: 4.6,
        category: "games",
        trending: true,
        new: false,
        version: "2.18.3",
        size: "65MB",
        lastUpdated: "Sep 5, 2025",
        description: `<h3>🎮 Multiplayer Fun</h3><p>Play mini-games with 1, 2, 3, or 4 players on the same device.</p><h3>📱 Features</h3><ul><li>Variety of fun mini-games</li><li>Single-player & multiplayer modes</li><li>Easy controls</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/eiym613tv3fygbk/1_2_3_4_Player_Games_v2.18.3_APKPure.VoltNexis.xapk/file",
        apkObb: false,
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: []
    },
    {
        id: 23,
        name: "Eduport Learning App",
        developer: "VoltNexis",
        tagline: "Smart Learning Platform, XAPK",
        icon: "../img/eduport.webp",
        rating: 4.4,
        category: "education",
        trending: false,
        new: true,
        version: "8.0.4",
        size: "120MB",
        lastUpdated: "Sep 16, 2025",
        description: `<h3>📘 Learning App</h3><p>Eduport provides courses, tutorials, and learning resources for students.</p><h3>📱 Features</h3><ul><li>Interactive lessons</li><li>Quizzes & assignments</li><li>Offline content access</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/19aa1lzdyy4q2e3/Eduport_Learning_App_8.0.4.voltnexis.zip/file",
        apkObb: false,
        screenshots: ["https://play-lh.googleusercontent.com/diB7LK6C3omeU0wO0EXyglH_pBDFFsZqzKStQaeVkZDHToZrqwJsbfzU3huBaL8KNg=w526-h296", "https://play-lh.googleusercontent.com/0cvqT7G0aC09j5rBYgISP6MKHbHmOe6B_j_AutXjoPsFgvJJ8WzObLqpG7u-lv1ICA=w526-h296", "https://play-lh.googleusercontent.com/rdWyBdQ6kUKjgNE6NqE4DYxFxNXNYRHeNVqUiy_sS9uTrvzfjCVHOIIWzlVk7uvGFuQ=w526-h296", "https://play-lh.googleusercontent.com/yeMlhYvGvo5gnY_7IITjcUFXr6pHhHgvaoE7TH8XtljhUvLjhIrZxsbO6RlXM6wasbw=w526-h296", "https://play-lh.googleusercontent.com/46loeX6MAjb4rWpF2qGN4lUTezsFSZAAOxuW2dSMBKUozjr9p6YkbbBzbckS1j0Pjw=w526-h296"],
        oldVersions: []
    },
    {
        id: 25,
        name: "Helper",
        developer: "Helper Devs",
        tagline: "Utility Tool",
        icon: "../img/helper.webp",
        rating: 3.9,
        category: "tools",
        trending: false,
        new: false,
        version: "1.4",
        size: "12MB",
        lastUpdated: "Aug 10, 2025",
        description: `<h3>🔧 Utility App</h3><p>Helper is a small tool app that assists with daily tasks.</p><h3>📱 Features</h3><ul><li>Quick tools</li><li>Easy interface</li><li>Lightweight</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/helper/helper.apk/file",
        apkObb: false,
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: []
    },
    {
        id: 26,
        name: "Appstore",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Official App Store",
        icon: "../img/appstore.webp",
        rating: 4.2,
        category: "tools",
        trending: false,
        new: false,
        version: "1.1",
        size: "501KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🛒 App Store</h3><p>Browse and download any apps.</p><h3>✨ Features</h3><ul><li>Simple UI</li><li>Fast downloads</li><li>Secure apps</li></ul>`,
        downloadUrl: "../files/appstore-v1.1-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 27,
        name: "Codexaura AI",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Smart AI Assistant",
        icon: "../img/codexaura.webp",
        rating: 4.5,
        category: "productivity",
        trending: true,
        new: false,
        version: "1.0",
        size: "183KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🤖 Codexaura AI</h3><p>Your intelligent AI companion.</p><h3>✨ Features</h3><ul><li>Quick answers</li><li>Smart writing</li><li>AI chat</li></ul>`,
        downloadUrl: "../files/codexaura-ai-v1.0-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 28,
        name: "Eshop",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Online Shopping",
        icon: "../img/eshop.webp",
        rating: 4.0,
        category: "shopping",
        trending: false,
        new: false,
        version: "1.0",
        size: "414KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🛍️ Eshop</h3><p>Buy your favorite products online.</p><h3>✨ Features</h3><ul><li>Wide categories</li><li>Secure payments</li><li>Fast delivery</li></ul>`,
        downloadUrl: "../files/eshop-v1-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 29,
        name: "Fixmitra (Providers Hub)",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Service Provider Hub",
        icon: "../img/fixmitra-provider.webp",
        rating: 4.1,
        category: "business",
        trending: false,
        new: false,
        version: "1.0",
        size: "350KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🔧 Fixmitra Providers Hub</h3><p>Connect and manage service providers.</p><h3>✨ Features</h3><ul><li>Provider management</li><li>Job tracking</li><li>Fast support</li></ul>`,
        downloadUrl: "../files/fixmitra-(providers-hub)-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 30,
        name: "Fixmitra",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Repair & Service App",
        icon: "../img/fixmitra.webp",
        rating: 4.4,
        category: "utilities",
        trending: true,
        new: false,
        version: "1.1",
        size: "840KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🛠️ Fixmitra</h3><p>Get your services and repairs done easily.</p><h3>✨ Features</h3><ul><li>Book services</li><li>Track orders</li><li>Trusted providers</li></ul>`,
        downloadUrl: "../files/fixmitra-v1.1-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 31,
        name: "PC Builds",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Custom PC Builder",
        icon: "../img/pcbuilds.webp",
        rating: 4.7,
        category: "tools",
        trending: true,
        new: false,
        version: "1.1",
        size: "1.37MB",
        lastUpdated: "Sep 2025",
        description: `<h3>💻 PC Builds</h3><p>Plan and configure your dream PC.</p><h3>✨ Features</h3><ul><li>Custom PC builder</li><li>Component database</li><li>Performance estimator</li></ul>`,
        downloadUrl: "../files/pcbuilds-v1.1-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 32,
        name: "Qoutes",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Daily Inspiration",
        icon: "../img/qoutes.webp",
        rating: 3.8,
        category: "lifestyle",
        trending: false,
        new: false,
        version: "1.0",
        size: "350KB",
        lastUpdated: "Sep 2025",
        description: `<h3>💬 Quotes</h3><p>Get motivational quotes every day.</p><h3>✨ Features</h3><ul><li>Daily updates</li><li>Beautiful UI</li><li>Share easily</li></ul>`,
        downloadUrl: "../files/qoutes-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 33,
        name: "VN Wallpapers",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Wallpapers App",
        icon: "../img/wallpapers.webp",
        rating: 4.0,
        category: "personalization",
        trending: false,
        new: false,
        version: "1.0",
        size: "342KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🖼️ VN Wallpapers</h3><p>Customize your device with beautiful wallpapers.</p><h3>✨ Features</h3><ul><li>HD wallpapers</li><li>Categories</li><li>One-tap set</li></ul>`,
        downloadUrl: "../files/vn-wallpapers.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 34,
        name: "Voltnexis",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Main App",
        icon: "../img/voltnexis.webp",
        rating: 4.6,
        category: "tools",
        trending: true,
        new: false,
        version: "1.9",
        size: "950KB",
        lastUpdated: "Sep 2025",
        description: `<h3>⚡ Voltnexis</h3><p>The main Voltnexis utility app.</p><h3>✨ Features</h3><ul><li>All-in-one tools</li><li>Simple interface</li><li>Fast and reliable</li></ul>`,
        downloadUrl: "../files/voltnexis-v1.9.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 35,
        name: "Voltnexis Timer",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Time Management",
        icon: "../img/timer.webp",
        rating: 3.9,
        category: "productivity",
        trending: false,
        new: false,
        version: "1.0",
        size: "357KB",
        lastUpdated: "Sep 2025",
        description: `<h3>⏲️ Voltnexis Timer</h3><p>Manage your time effectively.</p><h3>✨ Features</h3><ul><li>Custom timers</li><li>Reminders</li><li>Lightweight</li></ul>`,
        downloadUrl: "../files/voltnexis-timer.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 36,
        name: "Wandermatch",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Travel & Meet",
        icon: "../img/wandermatch.webp",
        rating: 4.3,
        category: "lifestyle",
        trending: true,
        new: false,
        version: "5.8.3",
        size: "470KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🌍 Wandermatch</h3><p>Find travel partners and explore new places.</p><h3>✨ Features</h3><ul><li>Travel matching</li><li>Profile system</li><li>Secure messaging</li></ul>`,
        downloadUrl: "../files/wandermatch-v5.8.3-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
        id: 37,
        name: "Webcreator",
        developer: "Voltnexis Pvt Ltd",
        tagline: "Website Builder",
        icon: "../img/webcreator.webp",
        rating: 4.4,
        category: "tools",
        trending: true,
        new: false,
        version: "1.0",
        size: "458KB",
        lastUpdated: "Sep 2025",
        description: `<h3>🌐 Webcreator</h3><p>Create your own websites easily.</p><h3>✨ Features</h3><ul><li>Drag & drop builder</li><li>Responsive design</li><li>Fast exports</li></ul>`,
        downloadUrl: "../files/webcreator-voltnexis.apk",
        apkObb: false,
        oldVersions: []
    },
    {
    id: 38,
    name: "GTA San Andreas",
    developer: "Rockstar Games",
    tagline: "Classic Open-World Crime Adventure",
    icon: "https://play-lh.googleusercontent.com/XRlCpj22PFJuFK43QcE3u5RxmoNUed7YO_zG-6F1PCqjrBIIURbTBDvTgLVVIk5pNeY=w240-h480",
    rating: 4.7,
    category: "games",
    trending: true,
    new: false,
    version: "2.10",
    size: "2.4GB",
    lastUpdated: "Oct 05, 2024",
    description: `<h3>🌎 Welcome to San Andreas</h3><p>Embark on CJ's journey to reclaim his turf in this legendary open-world game.</p><h3>🔧 Features</h3><ul><li>High-quality classic visuals</li><li>Full map open-world gameplay</li><li>100+ missions & gang wars</li></ul>`,
    downloadUrl: "https://github.com/privatevoltnexis/appshub/releases/download/v3/GTA.SA.-.ATOM.GUY.apk",
    obbUrl: "https://www.mediafire.com/file/ze7wywmxhqlrsz9/com.rockstar.gtasa.zip/file",
    apkObb: true,
    screenshots: ["https://play-lh.googleusercontent.com/XJIXWvMtYKOfdE8k_353XZwKEHE63JigwjZnsSyhUH6VzOeUHhxouqGHpy7f1nQGyQ=w526-h296","https://play-lh.googleusercontent.com/gLb0inRrKnSPB2vR4yTDcxJVYNfnCmLs0n2fp0L5EEF28aBUarvwrxVzUw8xnOlarA=w526-h296","https://play-lh.googleusercontent.com/CQiBcsfvjd0nv3--yjinA6YAZuWoj58WiymNQ3JGLhYWaH4zXgb8NbIlCSrjJRmtMvl2=w526-h296", "https://play-lh.googleusercontent.com/UMbELQfIJCw7HMl3xT9ypYNczwH_njQJM1Z0B7EuTURnG0pbVq6sxy6NBAxL-NVMg8o=w526-h296", "https://play-lh.googleusercontent.com/pzhLMpZID8gd-1bcOJgpWdXA4ukXGXGRwKnNE42I9u7ZkT5a6vwQLqbkdWCmD713-4U=w526-h296", "https://play-lh.googleusercontent.com/8ZUdV9WZUDgmR57IAnZ8UrJWll0TJcovweFNQjXUzjNCIkR4C7XV-jaLz4K1e0-8uS08=w526-h296", "https://play-lh.googleusercontent.com/SYyS63I8tUmMCljawaDwPyNA5zH4aOxpFF7R3JMFk2YvpTsRn-JGXYOdVNj9m0Su5cRm=w526-h296"],
    oldVersions: []
},
    {
    id: 39,
    name: "GTA San Andreas DE",
    developer: "Rockstar Games",
    tagline: "Remastered Crime Legend",
    icon: "https://play-lh.googleusercontent.com/Plgr-TF6CRvZSLuXeCeximGXI86YLR-oH1M9ja-yuRz40eXsOTe-HgqbD6XtHVRCcGK6CLjq8sj2p4vfZfJ6sYI=w240-h480",
    rating: 4.3,
    category: "games",
    trending: true,
    new: true,
    version: "1.03",
    size: "4.9GB",
    lastUpdated: "Nov 30, 2024",
    description: `<h3>✨ Remastered for Modern Devices</h3><p>Experience San Andreas with enhanced textures, lighting, and reworked models.</p><h3>🔸 Improvements</h3><ul><li>Remastered graphics & UI</li><li>Better shadows + reflections</li><li>Updated controls for mobile</li></ul>`,
    downloadUrl: "https://dl.apkvision.org/gta-san-andreas-definitive/GTA-SA-DE-1.86.44544238-full-apkvision.apks",
    apkObb: false,
    screenshots: ["https://play-lh.googleusercontent.com/-iZT5zq0f4IB29DE51Q2Key6g1ac-Nm2CGp04F9MbA6xflBUFodx2FgQkhLEzJOP18zS=w526-h296","https://play-lh.googleusercontent.com/ddR95FGFZxpEpuNbGmWzgiUd2Q9_AjcyqPUn8QKWci3_nZbDvW3xBnPQcnff3L5WAV4=w526-h296","https://play-lh.googleusercontent.com/-c89O16kd8aR2SXE_OpCd-mUGExMSNEOgdeG8NsUmQAifYzoYUZcGAqn0-qZRXRIRy0=w526-h296", "https://play-lh.googleusercontent.com/0eiVY9gNlW_2GWyLBkdWWF8I1SN-_V6xsE3em272kzLYjGMKc2tdDMWd69dEluSTpnY=w526-h296", "https://play-lh.googleusercontent.com/UC_W50eSwBuHLJh6N_fOTCxqQ3v8bJHhVvFOa0MK6IjkDQg67FSDltE9ft4w9bIk_zo=w526-h296"],
    oldVersions: []
},
    {
    id: 40,
    name: "GTA Vice City",
    developer: "Rockstar Games",
    tagline: "1980s Crime & Neon Style",
    icon: "https://play-lh.googleusercontent.com/nl1Y6bn06faVBuPEwWh5gInl_Zji3A5wTA4zscKDsJLXpcZ5C35F5zaGzEwCE0bKJ8Jr",
    rating: 4.6,
    category: "games",
    trending: false,
    new: false,
    version: "1.12",
    size: "1.5GB",
    lastUpdated: "Sep 14, 2024",
    description: `<h3>🌴 Welcome to Vice City</h3><p>Step into the neon-soaked 80s with Tommy Vercetti in this legendary open world classic.</p><h3>⭐ Highlights</h3><ul><li>Iconic soundtrack + atmosphere</li><li>Motorbikes, boats & helicopters</li><li>Classic crime-based storylines</li></ul>`,
    downloadUrl: "https://github.com/privatevoltnexis/appshub/releases/download/v3/GTA.VC.-.ATOM.GUY.apk",
    obbUrl: "https://www.mediafire.com/file/gw1oxe7ienp36he/GTA_VC_APK%252BSCRIPT.zip/file",
    apkObb: true,
    screenshots: ["https://play-lh.googleusercontent.com/soywaPw0kB7fiDHokNdGlxbOijFwLe8XahjnZhJAejpCTcPMdogHEu10hcAF6dBW9LI=w526-h296","https://play-lh.googleusercontent.com/q3Z04rZK0xj0LsWZo9JZ-RF6FHeqIri-HJpDmNeQ7ObM2xzXZi532gclw37InkgTRVU=w526-h296","https://play-lh.googleusercontent.com/tuYtl9M4l9ukrxKY3e6NZyLlz7iZItE0CgzRuiDBPGNUYnholCnt2HT-73YSQWr3Qjqa=w526-h296"],
    oldVersions: []
},
     {
    id: 41,
    name: "GTA Vice City DE",
    developer: "Rockstar Games",
    tagline: "Ultimate 80s Remastered Crime Story",
    icon: "https://play-lh.googleusercontent.com/PMwwyuavLk0Ob6vd8NXYW3yDu-yzQ5T_ZgYe0duQkft0ygCBfNGUCZztAPRcw6H6G1nIkNhB3ImyslXRy-GL=w240-h480",
    rating: 4.1,
    category: "games",
    trending: true,
    new: true,
    version: "1.01",
    size: "3.8GB",
    lastUpdated: "Dec 10, 2024",
    description: `<h3>🎨 Fully Remastered Visuals</h3><p>Better lighting, polished models and modern optimization.</p><h3>🔹 New Features</h3><ul><li>HD character models</li><li>Improved controls</li><li>Better texture clarity</li></ul>`,
    downloads: [
        { type: "Tutorial", url: "https://www.mediafire.com/file/gta-vc-tutorial/GTA_VC_DE_Installation_Guide.pdf/file", size: "YT" },
        { type: "APK Part 1", url: "https://github.com/privatevoltnexis/appshub/releases/download/v3/GTA.VC.-.DE.-.ATOM.GUY.z01", size: "2GB" },
        { type: "APK Part 2", url: "https://github.com/privatevoltnexis/appshub/releases/download/v3/GTA.VC.-.DE.-.ATOM.GUY.zip", size: "1010GB" }
    ],
    multiPart: true,
    hasTutorial: true,
    screenshots: ["https://play-lh.googleusercontent.com/aNAmwSXwoeBzVHojshMQVjlI_EAVQq2NWqazKPWcfrDMIXKBpDjuKVysxSzzFAfoplc=w526-h296","https://play-lh.googleusercontent.com/8853chD8RhUenlKgRSleUeyD84QwWoaVScYPtPUADn6s2pMzVl0YbweeOY1m6tdFtg=w526-h296","https://play-lh.googleusercontent.com/6hRxB1WR6UAxl5mI5uLt2WVq8PNOg8yOTZG9e1jinEjGhdAsZysnWT0JUbPmFikSy9Y=w526-h296", "https://play-lh.googleusercontent.com/MU2_TJK-yLj_BvkacKhC5RRhhBjssJ6Q8iWh_vsFwGp0pD9iZKft8j7vxoDhT7eZSw=w526-h296", "https://play-lh.googleusercontent.com/SQeDfHeFB6jUywShrcZSgtBMtfPHzzMHyo0q4IjxeKZXWK47lgDScErcDaNwGthuZg=w526-h296"],
    oldVersions: []
},
    {
    id: 42,
    name: "GTA 3 DE",
    developer: "Rockstar Games",
    tagline: "The Beginning of the Open-World Revolution",
    icon: "https://play-lh.googleusercontent.com/fW06ls46hBjsQfdwES0cV_v6Yy_yEBoOOf2K8ACwmi26_4vZ9rhzYhRW3CucdUZpxYxZ=w240-h480",
    rating: 4.0,
    category: "games",
    trending: false,
    new: true,
    version: "1.05",
    size: "3.2GB",
    lastUpdated: "Dec 01, 2024",
    description: `<h3>🏙 Liberty City Remastered</h3><p>The game that started it all — now modernized for new players and veterans.</p><h3>⚙ Upgrades</h3><ul><li>Advanced lighting system</li><li>Smoother animations & gameplay</li><li>Improved traffic + density</li></ul>`,
    downloadUrl: "https://github.com/privatevoltnexis/appshub/releases/download/v3/GTA.3.-.DE.-.ATOM.GUY.apk",
    apkObb: false,
    screenshots: ["https://play-lh.googleusercontent.com/NpIHx92juuR5Tr1duSTA1-vhaG9jji76H8X7gf2TEhc_GzR8qINNrbuj7moCN5nGhPO8=w526-h296","https://play-lh.googleusercontent.com/0i7xZ_EpbasnimL-uImm8NZIX764kEf9nhD8TNueuhBi36BGz5k1ofmzoAgfSXfp=w526-h296","https://play-lh.googleusercontent.com/drscQYcZInDY6gnYwUwbubnjBJVFcmLJxbWAcqrnGIqwb_9ejwtXFM0tXLQQl74JnQ=w526-h296", "https://play-lh.googleusercontent.com/co-ChdYpV8a00otitSvtc0r8emIYd938E1pHBz5vukGjuJy0Yu32t3ETuFLMRuf5gw=w526-h296", "https://play-lh.googleusercontent.com/-soQKJ2nxGluJfbqKTrTNxfqysqe2tYWAeAhauMI2Qjn19LTZJhUdXh1GBlvinX0I9UF=w526-h296"],
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
            window.location.href = `app.html?id=${appId}`;
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
                <button class="download-btn-small" onclick="event.stopPropagation(); window.location.href='app.html?id=${app.id}'">
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

