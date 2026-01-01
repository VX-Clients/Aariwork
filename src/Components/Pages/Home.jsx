import React from "react";
import { BedDouble as Needle, Sparkles, Users, BookOpen, Rocket, Target, Palette, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

import { COURSES, FUTURE_INITIATIVES } from "../../data/homeData";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fadeIn">
          <h1>Welcome to Aari Design Kalai</h1>
          <p>Empowering women through the art of Aari embroidery</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/courses" className="cta-button">
              Start Learning
            </Link>
            <Link to="/shop" className="cta-button" style={{ background: 'white', color: 'var(--color-primary)', border: '2px solid white' }}>
              Shop Drop
            </Link>
          </div>
        </div>
      </section>

      {/* Merged About Stats / Story */}
      <section className="container section-padding">
        <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Our Vibe & Story</h2>
            <div className="story-content">
              <p className="mb-4" style={{ fontSize: '1.1rem', color: 'var(--color-text-light)' }}>
                Hey, I'm <strong>Kalaiarasi</strong>, the founder. I started this journey from a middle-class background with just a needle and a dream.
                Now, Aari Design Kalai is all about helping you smash those creative goals.
              </p>
              <img src="/Images/canvas.png" alt="Sketching" style={{ width: '100%', borderRadius: '1rem', marginTop: '1rem', boxShadow: 'var(--shadow-md)' }} />
            </div>
          </div>
          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
            <div className="feature-card text-center">
              <div className="icon-wrapper"><Target /></div>
              <h3>Mission</h3>
              <p>To help you monetize your skills and achieve financial freedom through affordable, high-quality courses.</p>
            </div>
            <div className="feature-card text-center">
              <div className="icon-wrapper"><Rocket /></div>
              <h3>Vision</h3>
              <p>Building the ultimate creative hub for fashion, jewelry, and digital design.</p>
            </div>
            <div className="feature-card" style={{ gridColumn: 'span 2', padding: 0, overflow: 'hidden' }}>
              <img src="/Images/workshop.png" alt="Our Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Merged Designs Preview - Simplified Grid */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2>Fresh Drops</h2>
            <p className="subtitle">Check out our latest intricate designs</p>
          </div>

          <div className="grid grid-3">
            {/* Using a few select images from the Designs page */}
            <div className="card">
              <img src="/Images/aariClass/basic/3dAariWork.jpg" alt="3D Aari Work" className="card-image" style={{ height: '300px', objectFit: 'cover', borderRadius: '1rem', width: '100%' }} />
              <h3 className="text-center mt-2">3D Aari Drip</h3>
            </div>
            <div className="card">
              <img src="/Images/aariClass/brooches/basicClassLevel.jpg" alt="Brooches" className="card-image" style={{ height: '300px', objectFit: 'cover', borderRadius: '1rem', width: '100%' }} />
              <h3 className="text-center mt-2">Statement Brooches</h3>
            </div>
            <div className="card">
              <img src="/Images/aariClass/pro/jewelleryMaking.jpg" alt="Jewellery" className="card-image" style={{ height: '300px', objectFit: 'cover', borderRadius: '1rem', width: '100%' }} />
              <h3 className="text-center mt-2">Bling & Accessories</h3>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/shop" className="learn-more" style={{ fontSize: '1.1rem' }}>
              See Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Course Preview - Kept from Original Home */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center">Trending Courses</h2>
          <p className="subtitle text-center">Skill up and start your brand</p>

          <div className="grid grid-3">
            {COURSES.map((course) => (
              <div key={course.title} className="course-card">
                <div className="course-image">
                  <Link to="/courses">
                    <img src={course.image} alt={course.title} />
                  </Link>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link to="/courses" className="learn-more">
                    Check Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Initiatives - Integrated from About */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, white 0%, var(--color-bg-body) 100%)' }}>
        <div className="container">
          <h2 className="text-center mb-4">What's Next?</h2>
          <div className="grid grid-4 text-center">
            {FUTURE_INITIATIVES.map((initiative) => (
              <div key={initiative.title} className="feature-card">
                <div className="icon-wrapper">{initiative.icon}</div>
                <h3>{initiative.title}</h3>
                <p>{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Kept from Original Home */}
      <section className="container section-padding">
        <h2 className="text-center mb-4">Why Vibin' With Us?</h2>
        <div className="grid grid-4 text-center">
          <div className="feature-card">
            <div className="icon-wrapper"><Sparkles /></div>
            <h3>Pocket Friendly</h3>
            <p>Top-tier skills without breaking the bank.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Needle /></div>
            <h3>Pro Mentors</h3>
            <p>Learn from the real OGs of the industry.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Users /></div>
            <h3>Squad Goals</h3>
            <p>Join 500+ creators making moves.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><BookOpen /></div>
            <h3>Get Certified</h3>
            <p>Official certs to boost your portfolio.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta text-center section-padding">
        <div className="container">
          <h2>Ready to Slay?</h2>
          <p className="mb-4">Join the community and start your creative hustle today.</p>
          {/* Note: Contact is now sticky, so CTA directs to courses or shop */}
          <Link to="/courses" className="cta-button">
            Join the Squad
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
