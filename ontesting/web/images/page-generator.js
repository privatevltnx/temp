// Dynamic page generator for uploaded images
class PageGenerator {
  static createImagePage(imageData) {
    const pageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${imageData.title} - VoltNexis</title>
    <link rel="stylesheet" href="../../style.css">
    <meta property="og:title" content="${imageData.title}">
    <meta property="og:description" content="${imageData.description}">
    <meta property="og:image" content="../../assets/${imageData.category}/${imageData.id}.${imageData.extension}">
</head>
<body>
    <header>
        <nav>
            <div class="nav-brand">
                <a href="../../index.html">VoltNexis</a>
            </div>
            <div class="nav-links">
                <a href="../../index.html">Home</a>
                <a href="../../category/${imageData.category}/index.html">${imageData.category}</a>
            </div>
        </nav>
    </header>

    <main class="image-page">
        <div class="image-container">
            <img src="../../assets/${imageData.category}/${imageData.id}.${imageData.extension}" 
                 alt="${imageData.title}" 
                 onclick="openImage(this)">
        </div>
        
        <div class="image-info">
            <h1>${imageData.title}</h1>
            <p class="image-description">${imageData.description}</p>
            <div class="image-meta">
                <span class="category">Category: ${imageData.category}</span>
                <span class="views">Views: <span id="view-count">${imageData.views}</span></span>
                <span class="upload-date">Uploaded: ${new Date(imageData.uploadTime).toLocaleDateString()}</span>
            </div>
            
            <div class="image-actions">
                <button onclick="downloadCurrentImage()" class="download-btn">⬇ Download</button>
                <button onclick="toggleCurrentFavorite()" class="favorite-btn" id="fav-btn">♡ Save</button>
                <button onclick="shareImage()" class="share-btn">📤 Share</button>
            </div>
        </div>
    </main>

    <!-- Image Modal -->
    <div id="imageModal" class="modal">
        <span class="close" onclick="closeModal()">&times;</span>
        <img class="modal-content" id="modalImage">
        <div class="modal-actions">
            <button onclick="downloadImage()" class="modal-btn">⬇ Download</button>
            <button onclick="toggleFavorite()" class="modal-btn favorite-btn">♡ Save</button>
        </div>
    </div>

    <script src="../../script.js"></script>
    <script>
        // Page-specific functions
        const currentImageData = ${JSON.stringify(imageData)};
        
        function downloadCurrentImage() {
            const link = document.createElement('a');
            link.href = '../../assets/${imageData.category}/${imageData.id}.${imageData.extension}';
            link.download = '${imageData.title.replace(/[^a-zA-Z0-9]/g, '_')}.${imageData.extension}';
            link.click();
        }
        
        function toggleCurrentFavorite() {
            const btn = document.getElementById('fav-btn');
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const existingIndex = favorites.findIndex(fav => fav.id === ${imageData.id});
            
            if (existingIndex > -1) {
                favorites.splice(existingIndex, 1);
                btn.innerHTML = '♡ Save';
                btn.style.color = '#64748b';
            } else {
                favorites.push(currentImageData);
                btn.innerHTML = '♥ Saved';
                btn.style.color = '#ef4444';
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        
        function shareImage() {
            if (navigator.share) {
                navigator.share({
                    title: '${imageData.title}',
                    text: '${imageData.description}',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        }
        
        // Update view count
        function updateViewCount() {
            let imageDatabase = JSON.parse(localStorage.getItem('imageDatabase')) || [];
            const imageIndex = imageDatabase.findIndex(img => img.id === ${imageData.id});
            if (imageIndex > -1) {
                imageDatabase[imageIndex].views++;
                localStorage.setItem('imageDatabase', JSON.stringify(imageDatabase));
                document.getElementById('view-count').textContent = imageDatabase[imageIndex].views;
            }
        }
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            updateViewCount();
            
            // Check if already favorited
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isFavorited = favorites.some(fav => fav.id === ${imageData.id});
            const favBtn = document.getElementById('fav-btn');
            
            if (isFavorited) {
                favBtn.innerHTML = '♥ Saved';
                favBtn.style.color = '#ef4444';
            }
        });
    </script>
</body>
</html>`;
    
    return pageHTML;
  }
  
  static updateCategoryPage(category) {
    const imageDatabase = JSON.parse(localStorage.getItem('imageDatabase')) || [];
    const categoryImages = imageDatabase.filter(img => img.category === category && img.approved);
    
    const pageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.charAt(0).toUpperCase() + category.slice(1)} Images - VoltNexis</title>
    <link rel="stylesheet" href="../../style.css">
</head>
<body>
    <header>
        <nav>
            <div class="nav-brand">
                <a href="../../index.html">VoltNexis</a>
            </div>
        </nav>
    </header>

    <main>
        <h1>${category.charAt(0).toUpperCase() + category.slice(1)} Images</h1>
        <div class="image-grid" id="category-grid">
            ${categoryImages.map(img => `
                <img src="../../assets/${img.category}/${img.id}.${img.extension}" 
                     alt="${img.title}" 
                     onclick="window.location.href='../../image/${img.id}/index.html'">
            `).join('')}
        </div>
    </main>

    <script src="../../script.js"></script>
</body>
</html>`;
    
    return pageHTML;
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageGenerator;
}