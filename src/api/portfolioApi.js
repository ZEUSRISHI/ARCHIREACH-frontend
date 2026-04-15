// ============================================
// FILE: api/portfolioApi.js
// Frontend API service for portfolio operations
// ============================================

const API_BASE_URL = 'https://archireach.onrender.com/api';

class PortfolioAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.userUID = null;
  }

  // Set user UID (call this after login)
  setUserUID(userUID) {
    this.userUID = userUID;
    localStorage.setItem('userUID', userUID);
  }

  // Get user UID from storage
  getUserUID() {
    if (!this.userUID) {
      this.userUID = localStorage.getItem('userUID');
    }
    return this.userUID;
  }

  // Helper method to get headers
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'x-user-uid': this.getUserUID() || '',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Handle API response
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // ============================================
  // PORTFOLIO CRUD OPERATIONS
  // ============================================

  /**
   * Get portfolio for current user
   * @returns {Promise<Object>} Portfolio data
   */
  async getPortfolio() {
    try {
      console.log('📥 Fetching portfolio from backend...');

      const response = await fetch(`${this.baseURL}/portfolio`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      const data = await this.handleResponse(response);
      console.log('✅ Portfolio fetched successfully:', data);

      return data.data;
    } catch (error) {
      console.error('❌ Error fetching portfolio:', error);
      throw error;
    }
  }

  /**
   * Check if portfolio exists for current user
   * @returns {Promise<boolean>} True if portfolio exists
   */
  async checkPortfolioExists() {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/exists`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      const data = await this.handleResponse(response);
      return data.exists;
    } catch (error) {
      console.error('❌ Error checking portfolio existence:', error);
      throw error;
    }
  }

  /**
   * Save portfolio (create or update)
   * @param {Object} portfolioData - Portfolio data with base64 images
   * @returns {Promise<Object>} Saved portfolio
   */
  async savePortfolio(portfolioData) {
    try {
      console.log('💾 Saving portfolio to backend...');
      console.log('📦 Portfolio data size:', JSON.stringify(portfolioData).length, 'bytes');

      // Check if portfolio exists
      const exists = await this.checkPortfolioExists();
      const method = exists ? 'PUT' : 'POST';
      const endpoint = `${this.baseURL}/portfolio`;

      console.log(`📡 Using ${method} method for ${exists ? 'update' : 'create'}`);

      const response = await fetch(endpoint, {
        method: method,
        headers: this.getHeaders(),
        body: JSON.stringify(portfolioData)
      });

      const data = await this.handleResponse(response);
      console.log('✅ Portfolio saved successfully:', data);

      return data.data;
    } catch (error) {
      console.error('❌ Error saving portfolio:', error);
      throw error;
    }
  }

  /**
   * Delete portfolio
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deletePortfolio() {
    try {
      console.log('🗑️ Deleting portfolio from backend...');

      const response = await fetch(`${this.baseURL}/portfolio`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      const data = await this.handleResponse(response);
      console.log('✅ Portfolio deleted successfully');

      return data;
    } catch (error) {
      console.error('❌ Error deleting portfolio:', error);
      throw error;
    }
  }

  // ============================================
  // IMAGE UTILITIES
  // ============================================

  /**
   * Convert file to base64
   * @param {File} file - Image file
   * @returns {Promise<string>} Base64 encoded image
   */
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Compress base64 image
   * @param {string} base64 - Base64 encoded image
   * @param {number} maxWidth - Maximum width
   * @param {number} quality - Image quality (0-1)
   * @returns {Promise<string>} Compressed base64 image
   */
  async compressBase64Image(base64, maxWidth = 1200, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = reject;
      img.src = base64;
    });
  }

  /**
   * Validate base64 string
   * @param {string} base64 - Base64 string to validate
   * @returns {boolean} True if valid base64
   */
  isValidBase64(base64) {
    if (!base64 || typeof base64 !== 'string') return false;

    // Check if it's a data URL
    const dataUrlPattern = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
    return dataUrlPattern.test(base64);
  }

  /**
   * Get base64 image size in KB
   * @param {string} base64 - Base64 encoded image
   * @returns {number} Size in KB
   */
  getBase64Size(base64) {
    if (!base64) return 0;

    // Remove data URL prefix
    const base64String = base64.split(',')[1] || base64;

    // Calculate size
    const sizeInBytes = (base64String.length * 3) / 4;
    return Math.round(sizeInBytes / 1024);
  }

  // ============================================
  // BATCH OPERATIONS
  // ============================================

  /**
   * Process multiple images to base64
   * @param {FileList} files - List of image files
   * @param {boolean} compress - Whether to compress images
   * @returns {Promise<Array<string>>} Array of base64 images
   */
  async processMultipleImages(files, compress = true) {
    const promises = Array.from(files).map(async (file) => {
      let base64 = await this.fileToBase64(file);

      if (compress) {
        base64 = await this.compressBase64Image(base64);
      }

      return base64;
    });

    return Promise.all(promises);
  }
}

// Create singleton instance
const portfolioAPI = new PortfolioAPI();

export default portfolioAPI;