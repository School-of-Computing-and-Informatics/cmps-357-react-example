import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About TechSolutions Inc.</h1>
      
      <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
        <h2>Our Story</h2>
        <p>
          TechSolutions Inc. was founded in 2010 by a group of passionate technologists 
          who believed that technology should empower businesses, not complicate them. 
          What started as a small consulting firm in Silicon Valley has grown into a 
          global technology partner serving clients across six continents.
        </p>
        
        <h2>Our Mission</h2>
        <p style={{ 
          fontStyle: 'italic', 
          fontSize: '18px', 
          backgroundColor: '#e3f2fd', 
          padding: '15px', 
          borderLeft: '4px solid #2196f3',
          margin: '20px 0',
          color: '#1565c0'
        }}>
          "To democratize technology by making cutting-edge solutions accessible, 
          affordable, and tailored to every business's unique needs."
        </p>
        
        <h2>Our Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '20px 0' }}>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#333'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#ff6b35', 
              borderRadius: '50%', 
              margin: '0 auto 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              JS
            </div>
            <h4 style={{ color: '#333' }}>Jane Smith</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>CEO & Founder</p>
            <p style={{ fontSize: '13px', color: '#333' }}>
              Former Google engineer with 15 years of experience in enterprise software.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#333'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#4ecdc4', 
              borderRadius: '50%', 
              margin: '0 auto 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              MJ
            </div>
            <h4 style={{ color: '#333' }}>Michael Johnson</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>CTO</p>
            <p style={{ fontSize: '13px', color: '#333' }}>
              Cloud architecture specialist with expertise in scalable systems.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#333'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#45b7d1', 
              borderRadius: '50%', 
              margin: '0 auto 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              SL
            </div>
            <h4 style={{ color: '#333' }}>Sarah Lee</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>Head of Design</p>
            <p style={{ fontSize: '13px', color: '#333' }}>
              UX/UI expert focused on creating intuitive user experiences.
            </p>
          </div>
        </div>
        
        <h2>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', margin: '20px 0' }}>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <h4 style={{ color: '#2196f3' }}>Innovation</h4>
            <p style={{ fontSize: '14px' }}>
              We embrace new technologies and creative solutions to solve complex problems.
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <h4 style={{ color: '#4caf50' }}>Quality</h4>
            <p style={{ fontSize: '14px' }}>
              Every project meets our high standards for performance and reliability.
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <h4 style={{ color: '#ff9800' }}>Collaboration</h4>
            <p style={{ fontSize: '14px' }}>
              We work closely with clients as true partners in their success.
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <h4 style={{ color: '#9c27b0' }}>Integrity</h4>
            <p style={{ fontSize: '14px' }}>
              Honest communication and transparent processes guide all our work.
            </p>
          </div>
        </div>
        
        <h2>Contact Information</h2>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '20px',
          color: '#333'
        }}>
          <p style={{ color: '#333' }}><strong>Address:</strong> 123 Innovation Drive, Silicon Valley, CA 94025</p>
          <p style={{ color: '#333' }}><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p style={{ color: '#333' }}><strong>Email:</strong> info@techsolutions.com</p>
          <p style={{ color: '#333' }}><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM PST</p>
        </div>
      </div>
    </div>
  );
};

export default About;