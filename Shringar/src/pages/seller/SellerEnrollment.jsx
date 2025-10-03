// src/pages/seller/SellerEnrollment.jsx
import React, { useState } from 'react';
import './SellerEnrollment.css';

const SellerEnrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Business Information
    businessType: '',
    gstNumber: '',
    panNumber: '',
    businessAddress: '',
    city: '',
    state: '',
    pincode: '',
    yearsInBusiness: '',
    
    // Product Information
    jewelryTypes: [],
    priceRange: '',
    monthlyInventory: '',
    hasPhysicalStore: false,
    storeAddress: '',
    
    // Banking Information
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    
    // Documents
    gstCertificate: null,
    panCard: null,
    businessLicense: null,
    bankStatement: null,
    storePhotos: [],
    
    // Terms
    agreeToTerms: false,
    agreeToCommission: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Details', icon: '👤' },
    { number: 2, title: 'Business Info', icon: '🏢' },
    { number: 3, title: 'Products & Store', icon: '💎' },
    { number: 4, title: 'Banking', icon: '🏦' },
    { number: 5, title: 'Documents', icon: '📄' },
    { number: 6, title: 'Review', icon: '✅' }
  ];

  const jewelryTypeOptions = [
    'Gold Jewelry', 'Silver Jewelry', 'Diamond Jewelry', 'Platinum Jewelry',
    'Fashion Jewelry', 'Traditional Jewelry', 'Bridal Jewelry', 'Watches',
    'Precious Stones', 'Pearls', 'Antique Jewelry', 'Custom Jewelry'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleJewelryTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      jewelryTypes: prev.jewelryTypes.includes(type)
        ? prev.jewelryTypes.filter(t => t !== type)
        : [...prev.jewelryTypes, type]
    }));
  };

  const handleFileUpload = (fieldName, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.businessName) newErrors.businessName = 'Business name is required';
        if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
        if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
        if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData.businessAddress) newErrors.businessAddress = 'Business address is required';
        break;
      case 3:
        if (formData.jewelryTypes.length === 0) newErrors.jewelryTypes = 'Select at least one jewelry type';
        if (!formData.priceRange) newErrors.priceRange = 'Price range is required';
        break;
      case 4:
        if (!formData.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
        break;
      case 6:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
        if (!formData.agreeToCommission) newErrors.agreeToCommission = 'You must agree to commission structure';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Application submitted successfully! We will review your application and contact you within 3-5 business days.');
      // Reset form or redirect
    } catch (error) {
      alert('Error submitting application. Please try again.');
    }
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Personal & Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className={errors.businessName ? 'error' : ''}
                />
                {errors.businessName && <span className="error-text">{errors.businessName}</span>}
              </div>
              
              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter owner's full name"
                  className={errors.ownerName ? 'error' : ''}
                />
                {errors.ownerName && <span className="error-text">{errors.ownerName}</span>}
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label>Alternate Phone</label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>Business Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className={errors.businessType ? 'error' : ''}
                >
                  <option value="">Select business type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="private-limited">Private Limited</option>
                  <option value="llp">Limited Liability Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && <span className="error-text">{errors.businessType}</span>}
              </div>
              
              <div className="form-group">
                <label>GST Number *</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="27XXXXX1234X1Z5"
                  className={errors.gstNumber ? 'error' : ''}
                />
                {errors.gstNumber && <span className="error-text">{errors.gstNumber}</span>}
              </div>
              
              <div className="form-group">
                <label>PAN Number *</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="ABCTY1234D"
                  className={errors.panNumber ? 'error' : ''}
                />
                {errors.panNumber && <span className="error-text">{errors.panNumber}</span>}
              </div>
              
              <div className="form-group full-width">
                <label>Business Address *</label>
                <textarea
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Enter complete business address"
                  className={errors.businessAddress ? 'error' : ''}
                />
                {errors.businessAddress && <span className="error-text">{errors.businessAddress}</span>}
              </div>
              
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="form-group">
                <label>State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select state</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="west-bengal">West Bengal</option>
                  {/* Add more states */}
                </select>
              </div>
              
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                />
              </div>
              
              <div className="form-group">
                <label>Years in Business</label>
                <select
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>Products & Store Information</h3>
            <div className="form-group">
              <label>Jewelry Types You Deal In *</label>
              <div className="checkbox-grid">
                {jewelryTypeOptions.map(type => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.jewelryTypes.includes(type)}
                      onChange={() => handleJewelryTypeChange(type)}
                    />
                    <span className="checkmark"></span>
                    {type}
                  </label>
                ))}
              </div>
              {errors.jewelryTypes && <span className="error-text">{errors.jewelryTypes}</span>}
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Price Range *</label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className={errors.priceRange ? 'error' : ''}
                >
                  <option value="">Select price range</option>
                  <option value="budget">Budget (₹500 - ₹5,000)</option>
                  <option value="mid-range">Mid-range (₹5,000 - ₹50,000)</option>
                  <option value="premium">Premium (₹50,000 - ₹5,00,000)</option>
                  <option value="luxury">Luxury (₹5,00,000+)</option>
                  <option value="all-ranges">All Ranges</option>
                </select>
                {errors.priceRange && <span className="error-text">{errors.priceRange}</span>}
              </div>
              
              <div className="form-group">
                <label>Monthly Inventory</label>
                <select
                  name="monthlyInventory"
                  value={formData.monthlyInventory}
                  onChange={handleInputChange}
                >
                  <option value="">Select inventory size</option>
                  <option value="1-10">1-10 pieces</option>
                  <option value="11-50">11-50 pieces</option>
                  <option value="51-100">51-100 pieces</option>
                  <option value="100+">100+ pieces</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasPhysicalStore"
                  checked={formData.hasPhysicalStore}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I have a physical store
              </label>
            </div>
            
            {formData.hasPhysicalStore && (
              <div className="form-group">
                <label>Store Address</label>
                <textarea
                  name="storeAddress"
                  value={formData.storeAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your store address"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3>Banking Information</h3>
            <div className="info-box">
              <div className="info-icon">ℹ️</div>
              <div>
                <p><strong>Commission payments will be made to this account</strong></p>
                <p>Ensure all details are accurate to avoid payment delays</p>
              </div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="State Bank of India"
                  className={errors.bankName ? 'error' : ''}
                />
                {errors.bankName && <span className="error-text">{errors.bankName}</span>}
              </div>
              
              <div className="form-group">
                <label>Account Holder Name *</label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="As per bank records"
                />
              </div>
              
              <div className="form-group">
                <label>Account Number *</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  className={errors.accountNumber ? 'error' : ''}
                />
                {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
              </div>
              
              <div className="form-group">
                <label>IFSC Code *</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="SBIN0001234"
                  className={errors.ifscCode ? 'error' : ''}
                />
                {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h3>Document Upload</h3>
            <p className="step-description">Upload required documents for verification</p>
            
            <div className="document-grid">
              <div className="document-upload">
                <label>GST Certificate *</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload('gstCertificate', e.target.files[0])}
                  />
                  <div className="upload-content">
                    <span className="upload-icon">📄</span>
                    <p>Click to upload or drag and drop</p>
                    <small>PDF, JPG, PNG (Max 5MB)</small>
                  </div>
                </div>
              </div>
              
              <div className="document-upload">
                <label>PAN Card *</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload('panCard', e.target.files[0])}
                  />
                  <div className="upload-content">
                    <span className="upload-icon">🆔</span>
                    <p>Click to upload or drag and drop</p>
                    <small>PDF, JPG, PNG (Max 5MB)</small>
                  </div>
                </div>
              </div>
              
              <div className="document-upload">
                <label>Business License</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload('businessLicense', e.target.files[0])}
                  />
                  <div className="upload-content">
                    <span className="upload-icon">📋</span>
                    <p>Click to upload or drag and drop</p>
                    <small>PDF, JPG, PNG (Max 5MB)</small>
                  </div>
                </div>
              </div>
              
              <div className="document-upload">
                <label>Bank Statement (Last 3 months)</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload('bankStatement', e.target.files[0])}
                  />
                  <div className="upload-content">
                    <span className="upload-icon">🏦</span>
                    <p>Click to upload or drag and drop</p>
                    <small>PDF (Max 10MB)</small>
                  </div>
                </div>
              </div>
            </div>
            
            {formData.hasPhysicalStore && (
              <div className="document-upload full-width">
                <label>Store Photos (Optional)</label>
                <div className="upload-area">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.png"
                    onChange={(e) => setFormData(prev => ({ ...prev, storePhotos: Array.from(e.target.files) }))}
                  />
                  <div className="upload-content">
                    <span className="upload-icon">📸</span>
                    <p>Upload store photos (up to 5 images)</p>
                    <small>JPG, PNG (Max 5MB each)</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h3>Review & Submit</h3>
            
            <div className="review-section">
              <h4>Application Summary</h4>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <strong>Business Name:</strong> {formData.businessName}
                </div>
                <div className="summary-item">
                  <strong>Owner:</strong> {formData.ownerName}
                </div>
                <div className="summary-item">
                  <strong>Email:</strong> {formData.email}
                </div>
                <div className="summary-item">
                  <strong>Phone:</strong> {formData.phone}
                </div>
                <div className="summary-item">
                  <strong>Business Type:</strong> {formData.businessType}
                </div>
                <div className="summary-item">
                  <strong>GST Number:</strong> {formData.gstNumber}
                </div>
                <div className="summary-item">
                  <strong>Jewelry Types:</strong> {formData.jewelryTypes.join(', ')}
                </div>
                <div className="summary-item">
                  <strong>Price Range:</strong> {formData.priceRange}
                </div>
              </div>
            </div>
            
            <div className="commission-info">
              <h4>Commission Structure</h4>
              <div className="commission-table">
                <div className="commission-row">
                  <span>Product Category</span>
                  <span>Commission Rate</span>
                </div>
                <div className="commission-row">
                  <span>Gold Jewelry</span>
                  <span>5%</span>
                </div>
                <div className="commission-row">
                  <span>Silver Jewelry</span>
                  <span>7%</span>
                </div>
                <div className="commission-row">
                  <span>Diamond Jewelry</span>
                  <span>8%</span>
                </div>
                <div className="commission-row">
                  <span>Fashion Jewelry</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
            
            <div className="terms-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" target="_blank">Terms and Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToCommission"
                  checked={formData.agreeToCommission}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I agree to the commission structure and payment terms
              </label>
              {errors.agreeToCommission && <span className="error-text">{errors.agreeToCommission}</span>}
            </div>
            
            <div className="next-steps">
              <h4>What happens next?</h4>
              <ul>
                <li>📋 We'll review your application within 3-5 business days</li>
                <li>📞 Our team will contact you for verification</li>
                <li>✅ Upon approval, you'll receive seller dashboard access</li>
                <li>🚀 Start listing your products and earning commissions</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="seller-enrollment">
      <div className="enrollment-header">
        <h1>Become a Jewelry Seller</h1>
        <p>Join thousands of sellers and showcase your jewelry to customers worldwide</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map(step => (
          <div 
            key={step.number} 
            className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
          >
            <div className="step-number">
              {currentStep > step.number ? '✓' : step.icon}
            </div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="enrollment-form">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              ← Previous
            </button>
          )}
          
          {currentStep < 6 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Next →
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerEnrollment;