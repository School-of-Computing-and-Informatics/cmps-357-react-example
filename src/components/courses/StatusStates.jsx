import React from 'react';

export const LoadingState = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#7f8c8d' }}>
      Loading data...
    </div>
  );
};

export const ErrorState = ({ error }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px', 
      fontSize: '18px', 
      color: '#e74c3c',
      backgroundColor: '#fadbd8',
      borderRadius: '8px'
    }}>
      Error: {error}
    </div>
  );
};
