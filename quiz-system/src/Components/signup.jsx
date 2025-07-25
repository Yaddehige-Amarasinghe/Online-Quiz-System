import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Trophy, 
  Star, 
  Zap, 
  Target,
  CheckCircle,
  ArrowRight,
  Shield,
  Award
} from 'lucide-react';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [signupStep, setSignupStep] = useState('form'); // 'form', 'loading', 'success'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      setIsLoading(true);
      setSignupStep('loading');
      
      // Simulate signup process
      setTimeout(() => {
        setIsLoading(false);
        setSignupStep('success');
        setShowSuccessPopup(true);
        
        // Auto hide popup after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          // Redirect to login or dashboard
          console.log('Redirecting to login...');
        }, 3000);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  const userStats = [
    { icon: Trophy, label: 'Rank', value: '#1,247', color: 'gold' },
    { icon: Star, label: 'Points', value: '2,450', color: 'purple' },
    { icon: Zap, label: 'Streak', value: '15 days', color: 'blue' },
    { icon: Target, label: 'Accuracy', value: '94%', color: 'green' }
  ];

  return (
    <div className="signup-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="signup-content">
        {/* Left Side - Branding */}
        <div className="branding-section">
          <div className="brand-content">
            <div className="logo-section">
              <div className="logo-icon">
                <Shield className="shield-icon" />
                <div className="logo-sparkle"></div>
              </div>
              <h1 className="brand-title">QuizMaster Pro</h1>
            </div>
            
            <h2 className="welcome-title">
              Join the <span className="gradient-text">Challenge!</span>
            </h2>
            <p className="welcome-subtitle">
              Start your learning journey and compete with quiz masters worldwide
            </p>

            {/* Stats Preview */}
            <div className="stats-grid">
              {userStats.map((stat, index) => (
                <div key={index} className={`stat-card stat-${stat.color}`}>
                  <stat.icon className="stat-icon" />
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="community-info">
              <div className="avatars-stack">
                <div className="avatar avatar-1"></div>
                <div className="avatar avatar-2"></div>
                <div className="avatar avatar-3"></div>
                <div className="avatar avatar-4"></div>
                <div className="avatar-more">+12K</div>
              </div>
              <div className="community-text">
                <div className="community-title">Active Community</div>
                <div className="community-subtitle">Join 12,000+ active learners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h3 className="form-title">Create Account</h3>
              <p className="form-subtitle">Join the quiz community</p>
            </div>

            {signupStep === 'loading' && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <h4 className="loading-title">Creating Account...</h4>
                <p className="loading-text">Setting up your profile</p>
              </div>
            )}

            {signupStep === 'form' && (
              <div className="signup-form">
                {/* Username Field */}
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`form-input ${errors.username ? 'error' : ''}`}
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </div>
                  {errors.username && <span className="error-message">{errors.username}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="password-toggle"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                {/* Terms Checkbox */}
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
                    </span>
                  </label>
                  {errors.termsAccepted && <span className="error-message">{errors.termsAccepted}</span>}
                </div>

                {/* Signup Button */}
                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="signup-button"
                >
                  <span className="button-text">Create Account</span>
                  <ArrowRight className="button-icon" />
                </button>

                {/* Divider */}
                <div className="divider">
                  <span className="divider-text">or sign up with</span>
                </div>

                {/* Social Signup */}
                <div className="social-buttons">
                  <button className="social-button google">
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="social-button facebook">
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                {/* Login Link */}
                <p className="login-link">
                  Already have an account? 
                  <a href="#" className="login-text">Sign In</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-animation">
              <div className="success-checkmark">
                <CheckCircle className="check-icon" />
              </div>
              <div className="success-sparkles">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
                <div className="sparkle sparkle-3"></div>
                <div className="sparkle sparkle-4"></div>
              </div>
            </div>
            
            <div className="success-content">
              <h4 className="success-title">Welcome Aboard!</h4>
              <p className="success-message">
                Account created successfully. Redirecting to login...
              </p>
              
              <div className="success-stats">
                <div className="success-stat">
                  <Award className="success-stat-icon" />
                  <span>Rank #New</span>
                </div>
                <div className="success-stat">
                  <Star className="success-stat-icon" />
                  <span>0 Points</span>
                </div>
              </div>
            </div>
            
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;