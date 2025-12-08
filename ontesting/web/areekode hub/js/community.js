// Community Social Media Logic
class CommunityApp {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.posts = [];
        this.stories = [];
        this.selectedMedia = [];
        this.currentPostId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }
    
    getCurrentUser() {
        return {
            id: 1,
            name: 'John Doe',
            avatar: '👤',
            bio: 'Local resident of Areekode',
            posts: 12,
            followers: 45,
            following: 23
        };
    }
    
    setupEventListeners() {
        // Create post form
        const createPostForm = document.getElementById('createPostForm');
        if (createPostForm) {
            createPostForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createPost();
            });
        }
        
        // Media upload
        const mediaUpload = document.getElementById('mediaUpload');
        if (mediaUpload) {
            mediaUpload.addEventListener('change', (e) => {
                this.handleMediaUpload(e.target.files);
            });
        }
        
        // Update current user name
        const currentUserName = document.getElementById('currentUserName');
        if (currentUserName) {
            currentUserName.textContent = this.currentUser.name;
        }
    }
    
    async loadInitialData() {
        await Promise.all([
            this.loadStories(),
            this.loadPosts()
        ]);
    }
    
    async loadStories() {
        // Sample stories data
        this.stories = [
            { id: 1, user: 'Priya Nair', avatar: '👩', viewed: false },
            { id: 2, user: 'Rajesh Kumar', avatar: '👨', viewed: true },
            { id: 3, user: 'Malabar Bakery', avatar: '🥖', viewed: false },
            { id: 4, user: 'Tech World', avatar: '📱', viewed: false }
        ];
        
        this.renderStories();
    }
    
    async loadPosts() {
        // Sample posts data
        this.posts = [
            {
                id: 1,
                user: { name: 'Priya Nair', avatar: '👩' },
                time: '2 hours ago',
                content: 'Beautiful sunset from Areekode hills! 🌅 Perfect evening for a walk.',
                media: [{ type: 'image', url: '🌅' }],
                likes: 24,
                comments: 5,
                shares: 2,
                liked: false,
                shared: false
            },
            {
                id: 2,
                user: { name: 'Malabar Bakery', avatar: '🥖' },
                time: '4 hours ago',
                content: 'Fresh bread just out of the oven! Come grab yours while it\'s warm 🍞',
                media: [{ type: 'image', url: '🍞' }],
                likes: 18,
                comments: 8,
                shares: 3,
                liked: true,
                shared: false
            },
            {
                id: 3,
                user: { name: 'Rajesh Kumar', avatar: '👨' },
                time: '6 hours ago',
                content: 'Great turnout at today\'s community meeting! Thanks everyone for participating 👥',
                media: [],
                likes: 32,
                comments: 12,
                shares: 5,
                liked: false,
                shared: false
            }
        ];
        
        this.renderPosts();
    }
    
    renderStories() {
        const container = document.getElementById('storiesContainer');
        if (!container) return;
        
        container.innerHTML = this.stories.map(story => `
            <div class="story-item" onclick="viewStory(${story.id})">
                <div class="story-avatar ${story.viewed ? 'viewed' : ''}">${story.avatar}</div>
                <div class="story-name">${story.user}</div>
            </div>
        `).join('');
    }
    
    renderPosts() {
        const container = document.getElementById('postsFeed');
        if (!container) return;
        
        container.innerHTML = this.posts.map(post => `
            <div class="post-card">
                <div class="post-user" onclick="showUserProfile('${post.user.name}')">
                    <div class="user-avatar">${post.user.avatar}</div>
                    <div>
                        <div class="user-name">${post.user.name}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                
                <div class="post-content">
                    <div class="post-text">${post.content}</div>
                    ${this.renderPostMedia(post.media)}
                </div>
                
                <div class="post-stats">
                    ${post.likes} likes • ${post.comments} comments • ${post.shares} shares
                </div>
                
                <div class="post-actions">
                    <div class="action-group">
                        <button class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                            <i class="fas fa-heart"></i> Like
                        </button>
                        <button class="post-action" onclick="showComments(${post.id})">
                            <i class="fas fa-comment"></i> Comment
                        </button>
                        <button class="post-action ${post.shared ? 'shared' : ''}" onclick="sharePost(${post.id})">
                            <i class="fas fa-share"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderPostMedia(media) {
        if (!media || media.length === 0) return '';
        
        const gridClass = media.length === 2 ? 'two' : 
                         media.length === 3 ? 'three' : 
                         media.length >= 4 ? 'four' : '';
        
        return `
            <div class="post-media">
                <div class="media-grid ${gridClass}">
                    ${media.map(item => `
                        <div class="media-item" onclick="openMediaViewer('${item.url}', '${item.type}')">
                            ${item.type === 'video' ? 
                                `<video class="post-video" src="${item.url}" muted></video>` :
                                `<div class="post-image">${item.url}</div>`
                            }
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    handleMediaUpload(files) {
        const preview = document.getElementById('mediaPreview');
        this.selectedMedia = [];
        
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaItem = {
                    type: file.type.startsWith('video/') ? 'video' : 'image',
                    url: e.target.result,
                    file: file
                };
                
                this.selectedMedia.push(mediaItem);
                
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    ${mediaItem.type === 'video' ? 
                        `<video src="${mediaItem.url}" muted></video>` :
                        `<img src="${mediaItem.url}" alt="Preview">`
                    }
                    <button class="remove-media" onclick="removeMedia(${index})">×</button>
                `;
                
                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }
    
    createPost() {
        const content = document.getElementById('postContent').value.trim();
        const privacy = document.getElementById('postPrivacy').value;
        const enableComments = document.getElementById('enableComments').checked;
        const enableSharing = document.getElementById('enableSharing').checked;
        
        if (!content && this.selectedMedia.length === 0) {
            this.showNotification('Please add some content or media to your post', 'error');
            return;
        }
        
        const newPost = {
            id: Date.now(),
            user: { name: this.currentUser.name, avatar: this.currentUser.avatar },
            time: 'Just now',
            content: content,
            media: this.selectedMedia.map(item => ({ type: item.type, url: item.url })),
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false,
            shared: false,
            privacy: privacy,
            enableComments: enableComments,
            enableSharing: enableSharing
        };
        
        this.posts.unshift(newPost);
        this.renderPosts();
        
        // Reset form
        document.getElementById('createPostForm').reset();
        document.getElementById('mediaPreview').innerHTML = '';
        this.selectedMedia = [];
        
        closeModal('createPostModal');
        this.showNotification('Post created successfully!', 'success');
    }
    
    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.renderPosts();
        }
    }
    
    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            if (navigator.share) {
                navigator.share({
                    title: `Post by ${post.user.name}`,
                    text: post.content,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(post.content).then(() => {
                    this.showNotification('Post content copied to clipboard!', 'success');
                });
            }
            
            post.shared = true;
            post.shares += 1;
            this.renderPosts();
        }
    }
    
    showComments(postId) {
        this.currentPostId = postId;
        const post = this.posts.find(p => p.id === postId);
        
        // Sample comments
        const comments = [
            {
                id: 1,
                user: { name: 'Sarah Ahmed', avatar: '👩' },
                text: 'Beautiful shot! 📸',
                time: '1 hour ago'
            },
            {
                id: 2,
                user: { name: 'Mike Johnson', avatar: '👨' },
                text: 'Love this place! 😍',
                time: '30 minutes ago'
            }
        ];
        
        this.renderComments(comments);
        document.getElementById('commentsModal').style.display = 'block';
    }
    
    renderComments(comments) {
        const container = document.getElementById('commentsList');
        if (!container) return;
        
        container.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="user-avatar" onclick="showUserProfile('${comment.user.name}')">${comment.user.avatar}</div>
                <div class="comment-content">
                    <div class="comment-user">${comment.user.name}</div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-time">${comment.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    addComment() {
        const input = document.getElementById('newComment');
        const text = input.value.trim();
        
        if (!text) return;
        
        const post = this.posts.find(p => p.id === this.currentPostId);
        if (post) {
            post.comments += 1;
            this.renderPosts();
        }
        
        // Add comment to list
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="user-avatar">${this.currentUser.avatar}</div>
            <div class="comment-content">
                <div class="comment-user">${this.currentUser.name}</div>
                <div class="comment-text">${text}</div>
                <div class="comment-time">Just now</div>
            </div>
        `;
        
        commentsList.appendChild(newComment);
        input.value = '';
        
        this.showNotification('Comment added!', 'success');
    }
    
    showUserProfile(userName) {
        // Sample user data
        const userData = {
            name: userName,
            avatar: '👤',
            bio: 'Local resident and community member',
            posts: Math.floor(Math.random() * 50) + 5,
            followers: Math.floor(Math.random() * 200) + 10,
            following: Math.floor(Math.random() * 100) + 5
        };
        
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('profileAvatar').textContent = userData.avatar;
        document.getElementById('profileBio').textContent = userData.bio;
        document.getElementById('profilePosts').textContent = userData.posts;
        document.getElementById('profileFollowers').textContent = userData.followers;
        document.getElementById('profileFollowing').textContent = userData.following;
        
        // Sample user posts
        const userPosts = Array.from({length: 9}, (_, i) => ({
            id: i + 1,
            image: ['🌅', '🍞', '🏪', '🌳', '🎉', '📱', '🍕', '🚗', '🏠'][i]
        }));
        
        const postsContainer = document.getElementById('profilePosts');
        postsContainer.innerHTML = userPosts.map(post => `
            <div class="profile-post-item">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    ${post.image}
                </div>
            </div>
        `).join('');
        
        document.getElementById('userProfileModal').style.display = 'block';
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions
function openCreatePostModal() {
    document.getElementById('createPostModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function removeMedia(index) {
    communityApp.selectedMedia.splice(index, 1);
    const preview = document.getElementById('mediaPreview');
    preview.children[index].remove();
}

function viewStory(storyId) {
    communityApp.showNotification('Story viewer coming soon!', 'info');
}

function showUserProfile(userName) {
    communityApp.showUserProfile(userName);
}

function toggleLike(postId) {
    communityApp.toggleLike(postId);
}

function sharePost(postId) {
    communityApp.sharePost(postId);
}

function showComments(postId) {
    communityApp.showComments(postId);
}

function addComment() {
    communityApp.addComment();
}

function openMediaViewer(url, type) {
    // Simple media viewer
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; text-align: center;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="font-size: 10rem; margin: 20px 0;">${url}</div>
        </div>
    `;
    modal.style.display = 'block';
    document.body.appendChild(modal);
}

function openMessageModal() {
    communityApp.showNotification('Messaging feature coming soon!', 'info');
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Initialize community app
let communityApp;
document.addEventListener('DOMContentLoaded', () => {
    communityApp = new CommunityApp();
});