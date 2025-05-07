import React, { useState } from "react";
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

  // Validation function
  const validateForm = () => {
    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message ||
      !formData.course
    ) {
      toast.error("All fields are required.");
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Phone validation
    const phoneRegex = /^(\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submits
    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Sending...");

    try {
      await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success("Message sent!");
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
      setIsSubmitting(false);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="mb-8">Get in Touch</h2>
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
                  <a href="mailto:contact@adkaari.com" className="contact-link" >contact@adkaari.com </a>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="icon" />
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+919876543210" className="contact-link" >+91 98765 43210</a>
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
                  required
                />
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
                    <Send className="icon" />
                    Sending
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
