import React from 'react';
import '../CSS/PolicyPage.css';

const PolicyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

  return (
    <div className="policycontainer">
      <div className="card">
        <h1 className="header">Legal & Policy Center</h1>
        <p className="text text-center" style={{ textAlign: 'center', marginBottom: '40px' }}>effective date: {currentDate}</p>

        {/* Privacy Policy */}
        <section className="section">
          <h2 className="section-title">Privacy Policy</h2>
          <p className="text">
            At <strong>Aari Design Kalai</strong> ("we", "our", "us"), we are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you visit our website or enroll in our courses.
          </p>

          <h3 className="subsection-title">1. Information We Collect</h3>
          <ul className="list">
            <li className="list-item"><strong>Personal Information:</strong> Full Name, WhatsApp Number (Mandatory), and Email Address (Optional).</li>
            <li className="list-item"><strong>Payment Information:</strong> We do not store your banking details. Payments are processed securely via UPI/QR codes directly between you and our bank.</li>
            <li className="list-item"><strong>Usage Data:</strong> We may collect non-personal data (e.g., browser type) to improve website performance.</li>
          </ul>

          <h3 className="subsection-title">2. How We Use Your Data</h3>
          <div className="policy-list">
            <p className="list-item">• To process your course enrollment and material orders.</p>
            <p className="list-item">• To send order confirmations and tracking details via WhatsApp/Email.</p>
            <p className="list-item">• To communicate important course updates or schedule changes.</p>
          </div>
          <p className="text">We <strong>never</strong> sell or share your personal data with third-party advertisers.</p>
        </section>

        <div className="divider"></div>

        {/* Terms of Service */}
        <section className="section">
          <h2 className="section-title">Terms & Conditions</h2>

          <h3 className="subsection-title">1. Course Enrollment</h3>
          <p className="text">
            Enrollment in our Aari Work courses is subject to seat availability. Access to course materials and sessions is granted only after full payment is received. Course enrollment is <strong>non-transferable</strong> to another person.
          </p>

          <h3 className="subsection-title">2. Pricing & Payment</h3>
          <p className="text">
            All prices listed on the website are in Indian Rupees (INR). We reserve the right to change pricing at any time without prior notice. Payments must be made using the official UPI ID or QR code provided on our platform.
          </p>

          <h3 className="subsection-title">3. User Conduct</h3>
          <p className="text">
            Students are expected to maintain a respectful environment during any interaction. Harassment, hate speech, or inappropriate behavior will result in immediate termination of enrollment without refund.
          </p>
        </section>

        <div className="divider"></div>

        {/* Shipping & Delivery */}
        <section className="section">
          <h2 className="section-title">Shipping & Delivery Policy</h2>
          <p className="text">For orders involving physical goods (Material Kits, Tools, etc.):</p>
          <ul className="list">
            <li className="list-item"><strong>Dispatch Time:</strong> Orders are typically processed and dispatched within 2-3 business days after payment confirmation.</li>
            <li className="list-item"><strong>Delivery Time:</strong> Standard delivery takes 5-7 business days depending on your location.</li>
            <li className="list-item"><strong>Shipping Partners:</strong> We use trusted courier partners to ensure your kit reaches you safely.</li>
          </ul>
        </section>

        <div className="divider"></div>

        {/* Refund Policy */}
        <section className="section">
          <h2 className="section-title">Refund & Cancellation Policy</h2>
          <ul className="list">
            <li className="list-item"><strong>Courses:</strong> Fees paid for online/offline courses are <strong>non-refundable</strong> once the batch has started or access has been granted.</li>
            <li className="list-item"><strong>Material Kits:</strong> We do not accept returns on material kits unless the item is received in a damaged condition.</li>
            <li className="list-item"><strong>Damaged Items:</strong> If you receive a damaged product, please contact us within 24 hours of delivery with an unboxing video. We will arrange a replacement.</li>
          </ul>
        </section>

        <div className="divider"></div>

        {/* Contact */}
        <section className="section contact-section">
          <h2 className="section-title">Contact Us</h2>
          <p className="text">If you have any questions regarding these policies, please contact us:</p>
          <div className="contact-details">
            <p><strong>Aari Design Kalai</strong></p>
            <p>📧 Email: <a href="mailto:kalaiarasi6067@gmail.com" className="link">kalaiarasi6067@gmail.com</a></p>
            <p>📱 WhatsApp: +91 94457 38281</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PolicyPage;