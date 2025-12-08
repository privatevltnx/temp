// Auto Ad System for iOS
const adNetworks = [
    {
        name: "Apple Search Ads",
        sizes: {
            "728x90": "https://searchads.apple.com/advanced/campaigns/example&format=728x90",
            "300x250": "https://searchads.apple.com/advanced/campaigns/example&format=300x250",
            "320x100": "https://searchads.apple.com/advanced/campaigns/example&format=320x100",
            "400x300": "https://searchads.apple.com/advanced/campaigns/example&format=400x300"
        }
    }
];

function loadAds() {
    // Ads are handled by Google AdSense directly in HTML
    console.log('Google AdSense ads loaded');
}

// Auto load ads when page loads
document.addEventListener('DOMContentLoaded', loadAds);