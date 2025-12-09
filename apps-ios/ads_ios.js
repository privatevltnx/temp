// Auto Ad System for iOS
const adNetworks = [
    {
        name: "Apple Search Ads",
        sizes: {
            "728x90": "http://voltnexis.github.io/assets/logo.webp",
            "300x250": "http://voltnexis.github.io/assets/logo.webp",
            "320x100": "http://voltnexis.github.io/assets/logo.webp",
            "400x300": "http://voltnexis.github.io/assets/logo.webp"
        }
    }
];

function loadAds() {
    // Ads are handled by Google AdSense directly in HTML
    console.log('Google AdSense ads loaded');
}

// Auto load ads when page loads
document.addEventListener('DOMContentLoaded', loadAds);
