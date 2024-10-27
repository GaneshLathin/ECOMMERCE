import React from 'react';
import '../styles/About.css';
import ajay from "../assets/ajay.jpg";
import ajaybal from "../assets/ajaybal.jpg"
const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <main className="about-main">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At VividCart, our mission is to provide the best e-commerce experience by offering a diverse range of products, exceptional customer service, and a user-friendly platform. We are dedicated to ensuring customer satisfaction and making online shopping enjoyable and hassle-free.
          </p>
        </section>
        <section className="about-section">
          <h2>Our History</h2>
          <p>
            Founded in 2020, VividCart started with a vision to revolutionize the way people shop online. Since then, we have grown rapidly, expanding our product range and enhancing our platform to better serve our customers. Our commitment to quality and innovation has driven our success.
          </p>
        </section>
        <section className="about-section">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <img
              src={ajaybal}
              alt="Team Member 1"
              className="team-image"
            />
            <div className="team-info">
              <h3>Ajay Balaji B</h3>
              <p>Founder & CEO</p>
            </div>
          </div>
          <div className="team-member">
            <img
              src={ajay}
              alt="Team Member 2"
              className="team-image"
            />
            <div className="team-info">
              <h3>Ajay K</h3>
              <p>Chief Technology Officer</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="about-footer">
        <p>&copy; 2024 VividCart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
