import React from 'react';

const EarthCanvas = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        position: 'relative',
        background: 'radial-gradient(circle at 35% 35%, #1a5276, #0e2f44 60%, #071a2b)',
        boxShadow: '0 0 60px rgba(0, 150, 255, 0.15), inset 0 -30px 60px rgba(0,0,0,0.4)',
        overflow: 'hidden'
      }}>
        {/* Continents (simple shapes) */}
        <div style={{
          position: 'absolute',
          width: '60px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(46, 204, 113, 0.5), transparent)',
          top: '30%',
          left: '25%',
          transform: 'rotate(-10deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '45px',
          height: '35px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(46, 204, 113, 0.4), transparent)',
          top: '45%',
          left: '40%',
          transform: 'rotate(5deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '50px',
          height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(46, 204, 113, 0.45), transparent)',
          top: '55%',
          left: '55%',
          transform: 'rotate(15deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '35px',
          height: '25px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(46, 204, 113, 0.35), transparent)',
          top: '20%',
          left: '55%',
          transform: 'rotate(-5deg)'
        }} />
        {/* Highlight */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.06), transparent)',
          pointerEvents: 'none'
        }} />
        {/* Rotation animation */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 60px rgba(0, 150, 255, 0.15), inset 0 -30px 60px rgba(0,0,0,0.4); }
            50% { box-shadow: 0 0 80px rgba(0, 150, 255, 0.25), inset 0 -30px 60px rgba(0,0,0,0.4); }
          }
          .earth-spin > * {
            animation: spin 20s linear infinite;
          }
          .earth-spin {
            animation: pulse 4s ease-in-out infinite;
          }
        `}</style>
      </div>
      {/* Orbit ring */}
      <div style={{
        position: 'absolute',
        width: '340px',
        height: '100px',
        borderRadius: '50%',
        border: '1px solid rgba(0, 150, 255, 0.08)',
        bottom: '-15%',
        transform: 'rotateX(60deg)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default EarthCanvas;
