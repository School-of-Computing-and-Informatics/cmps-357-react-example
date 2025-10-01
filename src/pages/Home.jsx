import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Welcome to Our Company</h1>
      <div style={{ marginBottom: '20px' }}>
        <img 
          src="https://via.placeholder.com/600x300/4a90e2/ffffff?text=Company+Banner" 
          alt="Company Banner"
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>
      
      <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
        <h2>About Our Services</h2>
        <p>
          Welcome to TechSolutions Inc., where innovation meets excellence. Founded in 2010, 
          we've been at the forefront of digital transformation, helping businesses of all sizes 
          harness the power of technology to achieve their goals.
        </p>
        
        <h3>What We Do</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Custom Software Development</li>
          <li>Cloud Computing Solutions</li>
          <li>Mobile App Development</li>
          <li>Data Analytics & Business Intelligence</li>
          <li>Cybersecurity Consulting</li>
        </ul>
        
        <h3>Why Choose Us?</h3>
        <p>
          Our team of expert developers, designers, and consultants work collaboratively 
          to deliver cutting-edge solutions that drive real business results. We pride 
          ourselves on our commitment to quality, innovation, and customer satisfaction.
        </p>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '20px' 
        }}>
          <h4>Quick Stats</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '24px', color: '#4a90e2' }}>500+</strong>
              <div>Projects Completed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '24px', color: '#4a90e2' }}>50+</strong>
              <div>Team Members</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '24px', color: '#4a90e2' }}>13</strong>
              <div>Years Experience</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '24px', color: '#4a90e2' }}>25+</strong>
              <div>Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;