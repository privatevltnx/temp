// Supabase Services for WebCreator
import { supabase } from './supabase-config.js';

// Application Service
export const ApplicationService = {
  // Submit application
  async submitApplication(applicationData) {
    try {
      // Map form fields to database columns
      const mappedData = {
        project_type: applicationData.projectType,
        primary_goal: applicationData.primaryGoal,
        page_count: applicationData.pageCount,
        cms_needed: applicationData.cmsNeeded,
        features: applicationData.features,
        brand_kit: applicationData.brandKit,
        content_ready: applicationData.contentReady,
        inspiration: applicationData.inspiration,
        timeline: applicationData.timeline,
        budget: applicationData.budget,
        full_name: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone,
        company: applicationData.company,
        country: applicationData.country,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('applications')
        .insert([mappedData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all applications
  async getApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting applications:', error);
      return { success: false, error: error.message };
    }
  }
};

// Contact Service
export const ContactService = {
  // Submit contact form
  async submitContact(contactData) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
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
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error getting portfolio:', error);
      return { success: false, error: error.message };
    }
  },

  // Add portfolio item
  async addPortfolioItem(itemData) {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .insert([{
          ...itemData,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      return { success: false, error: error.message };
    }
  }
};

// Analytics Service
export const AnalyticsService = {
  // Track page view
  async trackPageView(pageName) {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert([{
          event_type: 'page_view',
          page_name: pageName,
          url: window.location.href,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.log('Analytics tracking error:', error);
    }
  },

  // Track form submission
  async trackFormSubmission(formType) {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert([{
          event_type: 'form_submit',
          form_type: formType,
          url: window.location.href,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.log('Analytics tracking error:', error);
    }
  },

  // Track button click
  async trackButtonClick(buttonName) {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert([{
          event_type: 'button_click',
          button_name: buttonName,
          url: window.location.href,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.log('Analytics tracking error:', error);
    }
  }
};