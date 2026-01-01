import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, MapPin, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";
import "./CSS/StickyContact.css";

const StickyContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const cardRef = useRef(null);

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
            if (/[^0-9]/.test(value)) {
                setPhoneError("Only digits (0–9) are allowed.");
            } else {
                setPhoneError("");
            }
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
                toast.success("Message sent! We'll get back to you soon.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    course: "",
                    message: "",
                });
                setIsSubmitting(false);
                setIsOpen(false);
            }, 500);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.dismiss(toastId);
            toast.error("Submission failed! Try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Sticky Trigger Button */}
            <button
                className={`sticky-trigger ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Contact Us"
            >
                <div className="trigger-content">
                    <MessageCircle size={24} />
                    <span>Enquire Now</span>
                </div>
            </button>

            {/* Backdrop */}
            {isOpen && <div className="contact-backdrop" onClick={() => setIsOpen(false)} />}

            {/* Slide-out Panel */}
            <div className={`contact-panel ${isOpen ? 'open' : ''}`} ref={cardRef}>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                </button>

                <div className="panel-content">
                    <div className="panel-header">
                        <h2>Let's Talk!</h2>
                        <p>Have questions? We're here to help you start your creative journey.</p>
                    </div>

                    <div className="contact-methods">
                        <a href="tel:+919445738281" className="method-item">
                            <Phone size={18} />
                            <span>+91 94457 38281</span>
                        </a>
                        <a href="mailto:kalaiarasi6067@gmail.com" className="method-item">
                            <Mail size={18} />
                            <span>Email Us</span>
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="sticky-form">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                                required
                            />
                            {phoneError && <span className="error-text">{phoneError}</span>}
                        </div>

                        <div className="form-group">
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Interested Course</option>
                                <option value="Aari Work">Aari Work</option>
                                <option value="Brooch Making">Brooch Making</option>
                                <option value="Saree Pre-Plating">Saree Pre-Plating</option>
                                <option value="Fabric Painting">Fabric Painting</option>
                                <option value="Thread Bangles">Thread Bangles</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    Send Message <Send size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="location-info">
                        <MapPin size={16} />
                        <p>940 P Viralimalai, Pudukkottai, TN 621312</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StickyContact;
