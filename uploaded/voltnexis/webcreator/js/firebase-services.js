// Firebase Services for WebCreator
import { db, analytics } from './firebase-config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

// Application Form Service
export const ApplicationService = {
  // Submit application
  async submitApplication(applicationData) {
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...applicationData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all applications
  async getApplications() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'applications'), orderBy('createdAt', 'desc'))
      );
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: applications };
    } catch (error) {
      console.error('Error getting applications:', error);
      return { success: false, error: error.message };
    }
  }
};

// Contact Form Service
export const ContactService = {
  // Submit contact form
  async submitContact(contactData) {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...contactData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }
  }
};

// Portfolio Service
export const PortfolioService = {
  // Get portfolio items
  async getPortfolioItems() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'))
      );
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: items };
    } catch (error) {
      console.error('Error getting portfolio:', error);
      return { success: false, error: error.message };
    }
  },

  // Add portfolio item
  async addPortfolioItem(itemData) {
    try {
      const docRef = await addDoc(collection(db, 'portfolio'), {
        ...itemData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      return { success: false, error: error.message };
    }
  }
};

// File Upload Service (Disabled - requires paid plan)
export const FileService = {
  // Upload file placeholder
  async uploadFile(file, path) {
    console.log('File upload requires Firebase paid plan');
    return { success: false, error: 'File upload requires Firebase paid plan' };
  }
};

// Analytics Service
export const AnalyticsService = {
  // Track page view
  trackPageView(pageName) {
    try {
      if (analytics) {
        // Firebase Analytics tracking
        console.log('Page view:', pageName);
      }
    } catch (error) {
      console.log('Analytics tracking:', error);
    }
  },

  // Track form submission
  trackFormSubmission(formType) {
    try {
      if (analytics) {
        console.log('Form submission:', formType);
      }
    } catch (error) {
      console.log('Analytics tracking:', error);
    }
  },

  // Track button click
  trackButtonClick(buttonName) {
    try {
      if (analytics) {
        console.log('Button click:', buttonName);
      }
    } catch (error) {
      console.log('Analytics tracking:', error);
    }
  }
};