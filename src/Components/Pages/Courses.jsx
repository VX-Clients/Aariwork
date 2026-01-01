import React from 'react';
import PropTypes from 'prop-types';
import { BookOpen, CheckCircle2, Sparkles, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../CSS/Courses.css';
import { COURSES_DATA, UPCOMING_COURSES } from '../../data/coursesData';

// CourseCard Component
const CourseCard = ({ title, description, learningPoints, pricing, image, popular }) => {
  return (
    <div className="glass-panel course-card animate-fade-in">
      {popular && <span className="popular-tag">Trending</span>}

      <div className="course-image-wrapper">
        <img src={image} alt={title} className="course-image" />
        <div className="course-overlay">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="course-details">
        <p className="course-description">{description}</p>

        <div className="learning-points">
          <h4>
            <BookOpen size={18} />
            Highlights
          </h4>
          <ul>
            {learningPoints.map((point, index) => (
              <li key={index}>
                <CheckCircle2 size={16} className="text-gradient" style={{ flexShrink: 0 }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-section">
          <h4>
            <Sparkles size={18} />
            Investment
          </h4>
          <div className="pricing-details">
            {/* Show Material Cost only if relevant */}
            <div className="price-row">
              <span>Class Only</span>
              <span>₹{pricing.withoutMaterial}</span>
            </div>
            <div className="price-row">
              <span>Material Kit</span>
              <span>₹{pricing.materialCost}</span>
            </div>
            <div className="price-row highlight">
              <span>Full Bundle</span>
              <span style={{ fontSize: '1.2rem' }}>₹{pricing.withMaterial}</span>
            </div>
          </div>
        </div>

        <Link to="/pay" state={{ courseTitle: title }} className="enroll-button">
          Book Your Slot
        </Link>
      </div>
    </div>
  );
};

// PropTypes for Type Checking
CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  learningPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
  pricing: PropTypes.shape({
    withMaterial: PropTypes.number.isRequired,
    withoutMaterial: PropTypes.number.isRequired,
    materialCost: PropTypes.number.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
  popular: PropTypes.bool,
};

// Courses Component
function Courses() {
  return (
    <div className="courses">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fadeIn">
          <h1>Master the Art</h1>
          <p>Professional courses designed to turn your creativity into a career.</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container courses-section">
        <div className="courses-grid">
          {COURSES_DATA.map((course, index) => (
            <CourseCard key={course.title} {...course} style={{ animationDelay: `${index * 0.1}s` }} />
          ))}
        </div>
      </section>

      {/* Upcoming Courses */}
      <section className="upcoming-courses">
        <div className="container">
          <h2 className="text-center mb-4">Coming Soon</h2>
          <div className="upcoming-grid">
            {UPCOMING_COURSES.map((course, index) => (
              <div key={index} className="glass-panel upcoming-card">
                <div className="upcoming-date"><Calendar size={14} style={{ display: 'inline', marginRight: '5px' }} /> {course.date}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="mt-4">
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} /> Stay Tuned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
