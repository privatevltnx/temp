// Script to update all category pages to use database images
const categories = ['animals', 'people', 'technology', 'architecture', 'food', 'abstract', 'travel'];

categories.forEach(category => {
  console.log(`Updating ${category} category page...`);
  // This would update each category page to use the same pattern as nature
});

// Template for category page script
const categoryPageScript = (categoryName) => `
document.addEventListener('DOMContentLoaded', function() {
  loadCategoryImages('${categoryName}');
});

function loadCategoryImages(category) {
  const grid = document.getElementById('category-grid');
  const imageDatabase = JSON.parse(localStorage.getItem('imageDatabase')) || [];
  const categoryImages = imageDatabase.filter(img => img.category === category && img.approved);
  
  categoryImages.forEach(imageData => {
    const img = document.createElement('img');
    img.src = imageData.dataUrl || \`../../assets/\${imageData.category}/\${imageData.id}.\${imageData.extension}\`;
    img.alt = imageData.title;
    img.loading = 'lazy';
    img.onclick = () => window.location.href = \`../../image/\${imageData.id}/index.html\`;
    grid.appendChild(img);
  });
  
  // Update count
  const countElement = document.querySelector('.category-meta p');
  if (countElement) {
    countElement.textContent = \`\${categoryImages.length} images available\`;
  }
}

async function forceDownload() {
  const fileUrl = document.getElementById("modalImage").src;
  const fileName = "${categoryName}_image.jpg";
  
  if (fileUrl.startsWith('data:')) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  } else {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}
`;

console.log('Category update script ready');