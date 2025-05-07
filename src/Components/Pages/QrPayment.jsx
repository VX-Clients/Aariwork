import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import '../CSS/QrPayment.css';
import '../CSS/QrPaymentTerms.css';

const QrPayment = () => {
  const upiId = 'kalaiarasi6067@okaxis';
  const payeeName = 'Kalaiarasi';

  const courses = [
    {
      title: 'Aari Work',
      description: 'Master the art of Aari embroidery from basic to professional level.',
      pricing: { withMaterial: 1750, withoutMaterial: 250, materialCost: 1500 },
    },
    {
      title: 'Brooch Making',
      description: 'Learn to create unique and stylish brooches for various occasions.',
      pricing: { withMaterial: 1750, withoutMaterial: 250, materialCost: 1500 },
    },
    {
      title: 'Saree Pre-Plating',
      description: 'Perfect the art of saree pleating and create stunning drapes.',
      pricing: { withMaterial: 600, withoutMaterial: 50, materialCost: 550 },
    },
    {
      title: 'Fabric Painting',
      description: 'Create stunning artwork on various textile materials.',
      pricing: { withMaterial: 1500, withoutMaterial: 500, materialCost: 1000 },
    },
    {
      title: 'Thread Bangles',
      description: 'Master the art of creating beautiful thread-wrapped bangles.',
      pricing: { withMaterial: 1750, withoutMaterial: 250, materialCost: 1500 },
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [clientName, setClientName] = useState('');
  const [nameError, setNameError] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

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
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendConfirmationEmail = () => {
    emailjs.send(
      'service_2vlbucq',
      'template_yn15awc',
      {
        to_name: clientName || 'Client',
        to_email: clientEmail,
        amount: amount,
        course: selectedCourse.title,
      },
      'PP_8F5IRluMT9wSXq'
    );

    emailjs.send(
      'service_2vlbucq',
      'template_gr2ttje',
      {
        client_name: clientName || 'Client',
        client_email: clientEmail,
        amount: amount,
        course: selectedCourse.title,
        to_email: 'balagibadri2002@gmail.com',
      },
      'PP_8F5IRluMT9wSXq'
    );
  };

  const handleGenerateQR = () => {
    let hasError = false;

    if (!clientName.trim()) {
      setNameError('Please enter your name.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!isValidEmail(clientEmail)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!hasError) {
      setQrGenerated(true);
    }
  };

  const pricing = selectedCourse.pricing;

  return (
    <div className="qr-container">
      <h2 className="qr-title">Scan & Pay</h2>

      <select className="qr-select" onChange={handleCourseChange} value={selectedCourse.title}>
        {courses.map((course) => (
          <option key={course.title} value={course.title}>
            {course.title}
          </option>
        ))}
      </select>

      <div className="name-input-container">
        <label htmlFor="name">Enter your Name:</label>
        <input
          type="text"
          id="name"
          className={`name-input ${nameError ? 'input-error' : ''}`}
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
            setNameError('');
          }}
          placeholder="Your full name"
        />
        {nameError && <p className="field-error">{nameError}</p>}
      </div>

      <div className="email-input-container">
        <label htmlFor="email">Enter your Email to receive confirmation:</label>
        <input
          type="email"
          id="email"
          className={`email-input ${emailError ? 'input-error' : ''}`}
          value={clientEmail}
          onChange={(e) => {
            setClientEmail(e.target.value);
            setEmailError('');
          }}
          placeholder="yourname@example.com"
        />
        {emailError && <p className="field-error">{emailError}</p>}
      </div>

      <div className="qr-options">
        <label className={`qr-option ${selectedOption === 'without' ? 'active' : ''}`}>
          <input
            type="radio"
            name="payment"
            checked={selectedOption === 'without'}
            onChange={() => handleOptionChange('without', pricing.withoutMaterial)}
          />
          Course Fees: <span className="price">₹{pricing.withoutMaterial}</span>
        </label>

        <label className={`qr-option ${selectedOption === 'material' ? 'active' : ''}`}>
          <input
            type="radio"
            name="payment"
            checked={selectedOption === 'material'}
            onChange={() => handleOptionChange('material', pricing.materialCost)}
          />
          Material Cost: <span className="price">₹{pricing.materialCost}</span>
        </label>

        <label className={`qr-option ${selectedOption === 'with' ? 'active' : ''}`}>
          <input
            type="radio"
            name="payment"
            checked={selectedOption === 'with'}
            onChange={() => handleOptionChange('with', pricing.withMaterial)}
          />
          Total(With Material): <span className="price">₹{pricing.withMaterial}</span>
        </label>
      </div>

      <div className="terms-checkbox-container">
        <input
          type="checkbox"
          className="terms-checkbox"
          checked={isTermsAccepted}
          onChange={() => setIsTermsAccepted(!isTermsAccepted)}
        />
        <label className="terms-label">
          I agree to the <Link to="/policy" className="terms-link">Privacy Policy</Link> and <Link to="/policy" className="terms-link">Terms & Conditions</Link>.
        </label>
      </div>

      {amount && isTermsAccepted && !paymentConfirmed && (
        <>
          <button
            className="generate-qr-btn"
            onClick={handleGenerateQR}
          >
            Generate QR
          </button>

          {qrGenerated && (
            <>
              <div className="qr-code">
                <QRCode value={generateUpiLink()} size={200} />
              </div>

              <p className="qr-details">
                Pay to: <strong className="upi-id" onClick={handleCopyUpi}>{upiId}</strong>
                <div className="copy-img" onClick={handleCopyUpi}>
                  <img src="Images/copy.jpg" alt="Copy" />
                </div>
                <br />
                Amount: ₹<strong>{amount}</strong><br />
                {copySuccess && <span className="copy-success">UPI ID copied!</span>}
              </p>

              <button
                className="payment-done-btn"
                onClick={() => {
                  if (!isValidEmail(clientEmail)) {
                    setEmailError('Please enter a valid email address.');
                    return;
                  }
                  setPaymentConfirmed(true);
                  sendConfirmationEmail();
                }}
              >
                I Have Paid
              </button>
            </>
          )}
        </>
      )}

      {paymentConfirmed && (
        <div className="payment-success-message">
          ✅ Payment Successful! Thank you for enrolling in <strong>{selectedCourse.title}</strong>.
        </div>
      )}
    </div>
  );
};

export default QrPayment;
