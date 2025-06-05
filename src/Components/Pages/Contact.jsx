import React, { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import "../CSS/Contact.css";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // success or error
  const [phoneError, setPhoneError] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Validation function
  const validateForm = () => {
    const { name, email, phone, message, course } = formData;
    if (!name || !email || !phone || !message || !course) {
      toast.error("All fields are required.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^(\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Show warning for invalid characters
      if (/[^0-9]/.test(value)) {
        setPhoneError("Only digits (0–9) are allowed.");
      } else {
        setPhoneError("");
      }

      // Clean input
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("");
    const toastId = toast.loading("Sending...");

    try {
      await fetch("https://script.google.com/macros/s/AKfycby6zi0z5V0Hpy-h8qpbx_aEkOIGE9V-ijZx9gcLR9Lp0UeR_X0upUYl9r4oEo0WQy9hzA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          course: formData.course.trim(),
          message: formData.message.trim(),
        }),
      });

      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success("Message sent!");
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        });
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss(toastId);
      toast.error("Submission failed!");
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fadeIn">
          <h1>Contact Us</h1>
          <p>Get in touch with us to start your creative journey</p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid grid-2">
          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="contact-info-heading">Get in Touch</h2>
            <div className="contact-details">
              <div className="contact-item">
                <MapPin className="icon" />
                <div>
                  <h3>Location</h3>
                  <a
                    href="https://maps.app.goo.gl/qhftHfNBRGLqBPNc8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    940 P Viralimalai, Pudukkottai, TN 621312
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Mail className="icon" />
                <div>
                  <h3>Email</h3>
                  <a href="mailto:kalaiarasi6067@gmail.com" className="contact-link">
                    kalaiarasi6067@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="icon" />
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+919445738281" className="contact-link">
                    +91 94457 38281
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2 className="mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={nameInputRef}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  required
                />
                {phoneError && <p className="error-msg">{phoneError}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="course">Interested Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Aari Work">Aari Work</option>
                  <option value="Brooch Making">Brooch Making</option>
                  <option value="Saree Pre-Plating">Saree Pre-Plating</option>
                  <option value="Fabric Painting">Fabric Painting</option>
                  <option value="Thread Bangles">Thread Bangles</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Send className="icon animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
