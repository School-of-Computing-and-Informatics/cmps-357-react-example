import React from 'react';

const Media = () => {
  const colors = [
    { name: 'Ocean Blue', hex: '#0077be', rgb: 'rgb(0, 119, 190)' },
    { name: 'Sunset Orange', hex: '#ff6b35', rgb: 'rgb(255, 107, 53)' },
    { name: 'Forest Green', hex: '#2d5016', rgb: 'rgb(45, 80, 22)' },
    { name: 'Royal Purple', hex: '#663399', rgb: 'rgb(102, 51, 153)' },
    { name: 'Crimson Red', hex: '#dc143c', rgb: 'rgb(220, 20, 60)' },
    { name: 'Golden Yellow', hex: '#ffd700', rgb: 'rgb(255, 215, 0)' },
    { name: 'Turquoise', hex: '#40e0d0', rgb: 'rgb(64, 224, 208)' },
    { name: 'Hot Pink', hex: '#ff1493', rgb: 'rgb(255, 20, 147)' },
    { name: 'Slate Gray', hex: '#708090', rgb: 'rgb(112, 128, 144)' },
    { name: 'Lime Green', hex: '#32cd32', rgb: 'rgb(50, 205, 50)' },
    { name: 'Deep Sky Blue', hex: '#00bfff', rgb: 'rgb(0, 191, 255)' },
    { name: 'Coral', hex: '#ff7f50', rgb: 'rgb(255, 127, 80)' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Media Gallery - Color Showcase</h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', color: '#666' }}>
        A vibrant collection of colors displayed in various layouts and styles.
      </p>
      
      {/* Grid Layout */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Color Grid</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {colors.map((color, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: color.hex,
                height: '120px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: index < 2 || index === 4 || index === 7 ? 'white' : 'black',
                fontWeight: 'bold',
                fontSize: '14px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div>
                <div>{color.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Strips */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Horizontal Color Strips</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {colors.slice(0, 6).map((color, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: color.hex,
                height: '60px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
                color: index === 0 || index === 2 || index === 4 ? 'white' : 'black',
                fontWeight: 'bold',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {color.name} - {color.rgb}
            </div>
          ))}
        </div>
      </section>

      {/* Circular Color Palette */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Circular Color Palette</h2>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '15px',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {colors.map((color, index) => (
            <div 
              key={index}
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: color.hex,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: index < 2 || index === 4 || index === 7 ? 'white' : 'black',
                fontWeight: 'bold',
                fontSize: '10px',
                textAlign: 'center',
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
              }}
            >
              {color.name.split(' ').map(word => word[0]).join('')}
            </div>
          ))}
        </div>
      </section>

      {/* Gradient Showcase */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Gradient Combinations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{
            background: `linear-gradient(45deg, ${colors[0].hex}, ${colors[1].hex})`,
            height: '100px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Ocean to Sunset
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${colors[2].hex}, ${colors[9].hex})`,
            height: '100px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Forest to Lime
          </div>
          <div style={{
            background: `linear-gradient(90deg, ${colors[3].hex}, ${colors[7].hex})`,
            height: '100px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Purple to Pink
          </div>
        </div>
      </section>

      {/* Rainbow Strip */}
      <section>
        <h2>Rainbow Strip</h2>
        <div style={{
          background: `linear-gradient(to right, ${colors.map(c => c.hex).join(', ')})`,
          height: '80px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Full Spectrum
        </div>
      </section>
    </div>
  );
};

export default Media;