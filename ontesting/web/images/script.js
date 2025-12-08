// Global variables
let currentImageSrc = '';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let imageDatabase = JSON.parse(localStorage.getItem('imageDatabase')) || [];
let nextImageId = parseInt(localStorage.getItem('nextImageId')) || 1;

// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

// Search functionality
function handleSearch(event) {
  if (event.key === 'Enter') {
    const query = event.target.value.trim();
    if (query) {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
  }
}

// Category navigation
function navigateToCategory(category) {
  window.location.href = `category/${category}/index.html`;
}

// Image modal functionality
function openImage(img) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  
  modal.style.display = 'block';
  modalImg.src = img.src;
  modalTitle.textContent = img.alt;
  currentImageSrc = img.src;
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}


function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Download functionality
async function downloadImage() {
  if (currentImageSrc) {
    try {
      const response = await fetch(currentImageSrc, { mode: 'cors' });
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `voltnexis-image-${Date.now()}.jpg`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, 100);
    } catch (error) {
      // Fallback for CORS issues
      const link = document.createElement('a');
      link.href = currentImageSrc;
      link.download = `voltnexis-image-${Date.now()}.jpg`;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

// Favorite functionality
function toggleFavorite() {
  const btn = document.querySelector('.favorite-btn');
  const imageData = {
    src: currentImageSrc,
    title: document.getElementById('modalTitle').textContent,
    timestamp: Date.now()
  };
  
  const existingIndex = favorites.findIndex(fav => fav.src === currentImageSrc);
  
  if (existingIndex > -1) {
    favorites.splice(existingIndex, 1);
    btn.innerHTML = '♡ Save';
    btn.style.color = '#64748b';
  } else {
    favorites.push(imageData);
    btn.innerHTML = '♥ Saved';
    btn.style.color = '#ef4444';
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Load images from database
function loadMoreImages(containerId, category = null, startIndex = 0) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let images = imageDatabase.filter(img => img.approved);
  if (category) {
    images = images.filter(img => img.category === category);
  }
  
  const endIndex = Math.min(startIndex + 6, images.length);
  
  for (let i = startIndex; i < endIndex; i++) {
    const imageData = images[i];
    const img = document.createElement('img');
    img.src = imageData.dataUrl || `assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
    img.alt = imageData.title;
    img.loading = 'lazy';
    img.onclick = () => openImagePage(imageData.id);
    container.appendChild(img);
  }
}

// Infinite scroll
function initInfiniteScroll() {
  let loading = false;
  let imageCounter = 19;
  
  window.addEventListener('scroll', () => {
    if (loading) return;
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      loading = true;
      
      // Add loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      loadingDiv.innerHTML = '<p>Loading more images...</p>';
      document.body.appendChild(loadingDiv);
      
      setTimeout(() => {
        const trendingGrid = document.getElementById('trending-grid');
        const recentGrid = document.getElementById('recent-grid');
        
        if (trendingGrid && recentGrid) {
          const approvedImages = imageDatabase.filter(img => img.approved);
          const trendingImages = approvedImages.sort((a, b) => b.views - a.views).slice(0, 3);
          const recentImages = approvedImages.sort((a, b) => b.uploadTime - a.uploadTime).slice(0, 3);
          
          trendingImages.forEach(imageData => {
            const img = document.createElement('img');
            img.src = imageData.dataUrl || `assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
            img.alt = imageData.title;
            img.loading = 'lazy';
            img.onclick = () => openImagePage(imageData.id);
            trendingGrid.appendChild(img);
          });
          
          recentImages.forEach(imageData => {
            const img = document.createElement('img');
            img.src = imageData.dataUrl || `assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
            img.alt = imageData.title;
            img.loading = 'lazy';
            img.onclick = () => openImagePage(imageData.id);
            recentGrid.appendChild(img);
          });
        }
        
        document.body.removeChild(loadingDiv);
        loading = false;
      }, 1000);
    }
  });
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      input.style.borderColor = '#e2e8f0';
    }
  });
  
  return isValid;
}

// Dashboard tab functionality
function showTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked tab button
  event.target.classList.add('active');
}

// Admin functions
function approveImage(button, imageId) {
  const imageIndex = imageDatabase.findIndex(img => img.id === imageId);
  if (imageIndex > -1) {
    imageDatabase[imageIndex].approved = true;
    localStorage.setItem('imageDatabase', JSON.stringify(imageDatabase));
  }
  
  button.style.background = '#10b981';
  button.textContent = 'Approved';
  button.disabled = true;
  
  const rejectBtn = button.nextElementSibling;
  if (rejectBtn) {
    rejectBtn.disabled = true;
    rejectBtn.style.opacity = '0.5';
  }
}

function rejectImage(button, imageId) {
  const imageIndex = imageDatabase.findIndex(img => img.id === imageId);
  if (imageIndex > -1) {
    imageDatabase.splice(imageIndex, 1);
    localStorage.setItem('imageDatabase', JSON.stringify(imageDatabase));
  }
  
  button.style.background = '#ef4444';
  button.textContent = 'Rejected';
  button.disabled = true;
  
  const approveBtn = button.previousElementSibling;
  if (approveBtn) {
    approveBtn.disabled = true;
    approveBtn.style.opacity = '0.5';
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  // Load initial images first
  loadInitialImages();
  
  // Load homepage images
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    loadHomepageImages();
    initInfiniteScroll();
  }
  
  // Load category page images
  if (window.location.pathname.includes('/category/')) {
    loadCategoryPageImages();
  }
  
  // Load dashboard page images
  if (window.location.pathname.includes('/dashboard/')) {
    loadDashboardImages();
  }
  
  // Update favorite button state in modal
  const favoriteBtn = document.querySelector('.favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      setTimeout(() => {
        const isFavorited = favorites.some(fav => fav.src === currentImageSrc);
        if (isFavorited) {
          favoriteBtn.innerHTML = '♥ Saved';
          favoriteBtn.style.color = '#ef4444';
        } else {
          favoriteBtn.innerHTML = '♡ Save';
          favoriteBtn.style.color = '#64748b';
        }
      }, 100);
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  

  
  // Handle form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (form.classList.contains('auth-form')) {
        handleAuthSubmit(form);
      } else if (form.classList.contains('upload-form')) {
        handleUploadSubmit(form);
      } else if (form.classList.contains('settings-form')) {
        handleSettingsSubmit(form);
      }
    });
  });
  
  // Handle file input preview
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          let preview = document.getElementById('image-preview');
          if (!preview) {
            preview = document.createElement('img');
            preview.id = 'image-preview';
            preview.style.maxWidth = '200px';
            preview.style.marginTop = '10px';
            input.parentNode.appendChild(preview);
          }
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });
});

// Open image page
function openImagePage(imageId) {
  window.location.href = `image/${imageId}/index.html`;
}

// Load initial images
function loadInitialImages() {
  if (imageDatabase.length === 0) {
    const sampleImages = [
      { id: 1, title: 'Mountain Landscape', category: 'nature', extension: 'jpg', approved: true, views: 150, uploadTime: Date.now() - 86400000, description: 'Beautiful mountain landscape' },
      { id: 2, title: 'City Skyline', category: 'urban', extension: 'jpg', approved: true, views: 120, uploadTime: Date.now() - 172800000, description: 'Modern city skyline' },
      { id: 3, title: 'Ocean Waves', category: 'nature', extension: 'jpg', approved: true, views: 200, uploadTime: Date.now() - 259200000, description: 'Ocean waves crashing' }
    ];
    imageDatabase = sampleImages;
    localStorage.setItem('imageDatabase', JSON.stringify(imageDatabase));
    nextImageId = 4;
    localStorage.setItem('nextImageId', nextImageId.toString());
  }
}

// Auth form handler (deprecated - login removed)
function handleAuthSubmit(form) {
  // Login functionality removed
}

// Upload form handler
function handleUploadSubmit(form) {
  const formData = new FormData(form);
  const file = formData.get('image');
  
  if (!file) {
    alert('Please select an image file.');
    return;
  }
  
  if (!formData.get('title') || !formData.get('description') || !formData.get('category')) {
    alert('Please fill in all required fields.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const category = formData.get('category') || 'nature';
    
    // Create category if it doesn't exist
    createCategoryIfNotExists(category);
    
    const imageData = {
      id: nextImageId++,
      title: formData.get('title') || 'Untitled Image',
      description: formData.get('description') || 'No description',
      category: category,
      extension: file.name.split('.').pop().toLowerCase(),
      approved: true, // Auto-approve for demo
      views: 0,
      uploadTime: Date.now(),
      dataUrl: e.target.result
    };
    
    imageDatabase.push(imageData);
    localStorage.setItem('imageDatabase', JSON.stringify(imageDatabase));
    localStorage.setItem('nextImageId', nextImageId.toString());
    
    createImagePage(imageData);
    alert('Image uploaded successfully!');
    form.reset();
    
    // Remove preview if exists
    const preview = document.getElementById('image-preview');
    if (preview) preview.remove();
    
    // Reset upload form preview
    const uploadPreview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    if (uploadPreview && uploadPlaceholder) {
      uploadPreview.style.display = 'none';
      uploadPlaceholder.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
}

// Create dynamic image page
function createImagePage(imageData) {
  let pageData = JSON.parse(localStorage.getItem('pageData')) || {};
  pageData[imageData.id] = imageData;
  localStorage.setItem('pageData', JSON.stringify(pageData));
  console.log('Created page data for image:', imageData.id);
}

// Load homepage images
function loadHomepageImages() {
  const trendingGrid = document.getElementById('trending-grid');
  const recentGrid = document.getElementById('recent-grid');
  
  if (trendingGrid) {
    const approvedImages = imageDatabase.filter(img => img.approved);
    const trendingImages = approvedImages.sort((a, b) => b.views - a.views).slice(0, 6);
    
    trendingImages.forEach(imageData => {
      const img = document.createElement('img');
      img.src = imageData.dataUrl || `assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
      img.alt = imageData.title;
      img.loading = 'lazy';
      img.onclick = () => openImagePage(imageData.id);
      trendingGrid.appendChild(img);
    });
  }
  
  if (recentGrid) {
    const approvedImages = imageDatabase.filter(img => img.approved);
    const recentImages = approvedImages.sort((a, b) => b.uploadTime - a.uploadTime).slice(0, 6);
    
    recentImages.forEach(imageData => {
      const img = document.createElement('img');
      img.src = imageData.dataUrl || `assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
      img.alt = imageData.title;
      img.loading = 'lazy';
      img.onclick = () => openImagePage(imageData.id);
      recentGrid.appendChild(img);
    });
  }
}

// Create category if it doesn't exist
function createCategoryIfNotExists(category) {
  let categories = JSON.parse(localStorage.getItem('categories')) || ['nature', 'urban', 'technology', 'abstract', 'animals', 'architecture', 'food', 'people', 'travel'];
  
  if (!categories.includes(category)) {
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // Create category page data
    let categoryPages = JSON.parse(localStorage.getItem('categoryPages')) || {};
    categoryPages[category] = {
      name: category,
      created: Date.now(),
      imageCount: 0
    };
    localStorage.setItem('categoryPages', JSON.stringify(categoryPages));
    
    console.log('Created new category:', category);
  }
}

// Load category page images
function loadCategoryPageImages() {
  const path = window.location.pathname;
  const categoryMatch = path.match(/\/category\/([^/]+)\//);
  
  if (categoryMatch) {
    const category = categoryMatch[1];
    const grid = document.getElementById('category-grid');
    
    if (grid) {
      const categoryImages = imageDatabase.filter(img => img.category === category && img.approved);
      
      // Clear existing images
      grid.innerHTML = '';
      
      categoryImages.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData.dataUrl || `../../assets/${imageData.category}/${imageData.id}.${imageData.extension}`;
        img.alt = imageData.title;
        img.loading = 'lazy';
        img.onclick = () => window.location.href = `../../image/${imageData.id}/index.html`;
        grid.appendChild(img);
      });
      
      // Update count
      const countElement = document.querySelector('.category-meta p');
      if (countElement) {
        countElement.textContent = `${categoryImages.length} images available`;
      }
    }
  }
}

// Load dashboard images
function loadDashboardImages() {
  // This function is called when dashboard page loads
  // The dashboard page has its own script to handle user uploads
}

// Settings form handler
function handleSettingsSubmit(form) {
  if (validateForm(form.id)) {
    const formData = new FormData(form);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.name = formData.get('name') || user.name;
    user.email = formData.get('email') || user.email;
    
    localStorage.setItem('user', JSON.stringify(user));
    alert('Settings updated successfully!');
  }
}