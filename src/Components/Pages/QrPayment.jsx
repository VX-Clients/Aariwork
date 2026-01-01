import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import '../CSS/QrPayment.css';
import '../CSS/QrPaymentTerms.css';
import { COURSES_DATA } from '../../data/coursesData';

const QrPayment = () => {
  const upiId = 'kalaiarasi6067@okaxis';
  const payeeName = 'Kalaiarasi';
  const location = useLocation();

  // Use global data
  const courses = COURSES_DATA;

  // Initialize state based on navigation prop or default to first course
  const [selectedCourse, setSelectedCourse] = useState(() => {
    const preSelectedTitle = location.state?.courseTitle;
    if (preSelectedTitle) {
      const found = courses.find(c => c.title === preSelectedTitle);
      return found || courses[0];
    }
    return courses[0];
  });

  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Constants
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleCourseChange = (e) => {
    const course = courses.find(c => c.title === e.target.value);
    setSelectedCourse(course);
    setAmount('');
    setSelectedOption('');
    setPaymentConfirmed(false);
    setQrGenerated(false);
  };

  const handleOptionChange = (label, value) => {
    setSelectedOption(label);
    setAmount(value);
    setQrGenerated(false);
  };

  const generateUpiLink = () => {
    if (!amount) return '';
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      toast.success("UPI ID Copied!");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const sendConfirmationEmail = () => {
    const toastId = toast.loading("Verifying payment details...");

    // Client Email
    emailjs.send(
      'service_2vlbucq',
      'template_yn15awc',
      {
        to_name: clientName || 'Student',
        to_email: clientEmail,
        amount: amount,
        course: selectedCourse.title,
        payment_status: "Pending Verification" // Since we don't have real gateway
      },
      'PP_8F5IRluMT9wSXq'
    ).catch(err => console.error("Client email failed", err));

    // Admin Notification
    emailjs.send(
      'service_2vlbucq',
      'template_gr2ttje',
      {
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        amount: amount,
        course: selectedCourse.title,
        to_email: 'balagibadri2002@gmail.com',
      },
      'PP_8F5IRluMT9wSXq'
    ).then(() => {
      toast.success("Payment recorded! We will contact you shortly.", { id: toastId });
      setPaymentConfirmed(true);
    }).catch((err) => {
      toast.error("Network error. Please contact us on WhatsApp.", { id: toastId });
      console.error("Admin email failed", err);
    });
  };

  const handleGenerateQR = () => {
    if (!amount) {
      toast.error("Please select a pricing plan.");
      return;
    }
    if (!clientName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!isValidPhone(clientPhone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Email is optional now
    if (clientEmail && !isValidEmail(clientEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isTermsAccepted) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }

    setQrGenerated(true);
    toast.success("QR Code Generated! Scan to Pay.");
  };

  const pricing = selectedCourse.pricing;

  return (
    <div className="qr-container animate-fade-in">
      <h2 className="qr-title">Secure Enrollment</h2>
      <p className="description-text text-center mb-4">Complete your registration for <strong>{selectedCourse.title}</strong></p>

      <div className="section-card">
        <label className="section-label">1. Select Pricing Plan</label>
        <div className="qr-options">
          <label className={`qr-option ${selectedOption === 'without' ? 'active' : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={selectedOption === 'without'}
              onChange={() => handleOptionChange('without', pricing.withoutMaterial)}
            />
            <div className="option-details">
              <span className="option-name">Course Only</span>
              <span className="price">₹{pricing.withoutMaterial}</span>
            </div>
          </label>

          <label className={`qr-option ${selectedOption === 'material' ? 'active' : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={selectedOption === 'material'}
              onChange={() => handleOptionChange('material', pricing.materialCost)}
            />
            <div className="option-details">
              <span className="option-name">Material Kit Only</span>
              <span className="price">₹{pricing.materialCost}</span>
            </div>
          </label>

          <label className={`qr-option ${selectedOption === 'with' ? 'active' : ''}`}>
            <input
              type="radio"
              name="payment"
              checked={selectedOption === 'with'}
              onChange={() => handleOptionChange('with', pricing.withMaterial)}
            />
            <div className="option-details">
              <span className="option-name">Full Bundle (Course + Kit)</span>
              <span className="price">₹{pricing.withMaterial}</span>
            </div>
          </label>
        </div>
      </div>

      <div className="section-card">
        <label className="section-label">2. Student Details</label>

        <div className="name-input-container">
          <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            className="name-input"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Priya Sharma"
          />
        </div>

        <div className="form-row">
          <div className="email-input-container">
            <label htmlFor="phone">WhatsApp Number <span style={{ color: 'red' }}>*</span></label>
            <input
              type="tel"
              id="phone"
              maxLength="10"
              className="email-input"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="9876543210"
            />
          </div>
          <div className="email-input-container">
            <label htmlFor="email">Email Address <span style={{ fontWeight: 'normal', fontSize: '0.8rem', color: 'gray' }}>(Optional)</span></label>
            <input
              type="email"
              id="email"
              className="email-input"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="priya@example.com"
            />
          </div>
        </div>
      </div>

      <div className="terms-checkbox-container">
        <input
          type="checkbox"
          id="terms"
          className="terms-checkbox"
          checked={isTermsAccepted}
          onChange={() => setIsTermsAccepted(!isTermsAccepted)}
        />
        <label htmlFor="terms" className="terms-label">
          I agree to the <Link to="/policy" className="terms-link">Privacy Policy</Link> and <Link to="/policy" className="terms-link">Terms & Conditions</Link>.
        </label>
      </div>

      {!paymentConfirmed && (
        <div className="action-area">
          <button
            className={`generate-qr-btn ${!amount ? 'disabled' : ''}`}
            onClick={handleGenerateQR}
            disabled={!amount}
          >
            {qrGenerated ? 'Regenerate QR' : 'Generate Payment QR'}
          </button>
        </div>
      )}

      {qrGenerated && !paymentConfirmed && (
        <div className="qr-display-section animate-fade-in">
          <div className="qr-code-wrapper">
            <QRCode value={generateUpiLink()} size={200} />
          </div>

          <div className="qr-details">
            <p className="pay-to">Pay to: <strong>{payeeName}</strong></p>
            <div className="upi-copy-box" onClick={handleCopyUpi}>
              <span>{upiId}</span>
              <span className="copy-icon">📋</span>
            </div>
            <p className="amount-display">Amount to Pay: <strong>₹{amount}</strong></p>
          </div>

          <button
            className="payment-done-btn"
            onClick={sendConfirmationEmail}
          >
            I Have Completed Payment
          </button>
        </div>
      )}

      {paymentConfirmed && (
        <div className="payment-success-message animate-fade-in">
          <div className="success-icon">🎉</div>
          <h3>Enrollment Successful!</h3>
          <p>Thank you, <strong>{clientName}</strong>.</p>
          <p>We have recorded your interest for <strong>{selectedCourse.title}</strong>.</p>
          <p className="small-text">Our team will verify the payment and contact you on WhatsApp shortly.</p>
          <Link to="/courses" className="back-link">Browse More Courses</Link>
        </div>
      )}
    </div>
  );
};

export default QrPayment;
