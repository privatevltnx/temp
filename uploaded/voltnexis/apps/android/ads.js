// Auto Ad System for Android APK
const adNetworks = [
    {
        name: "Google AdSense",
        sizes: {
            "728x90": "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-example&format=728x90",
            "300x250": "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-example&format=300x250",
            "320x100": "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-example&format=320x100",
            "400x300": "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-example&format=400x300"
        }
    }
];

function loadAds() {
    // Ads are handled by Google AdSense directly in HTML
    console.log('Google AdSense ads loaded');
}

// Auto load ads when page loads
document.addEventListener('DOMContentLoaded', loadAds);