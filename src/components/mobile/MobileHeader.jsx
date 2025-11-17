// src/components/mobile/MobileHeader.jsx
import React from 'react';

export default function MobileHeader({ visible }) {
  return (
    <div
      className="mobile-header"
      style={{
        position: 'fixed',
        top: visible ? '30px' : '-20px',     // больше отступ и мягкий уход наверх
        left: '40px',
        width: '170px',
        height: '26px',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible
          ? 'translateY(0)'
          : 'translateY(-10px)',             // мягкий сдвиг при скрытии
        transition:
          'opacity 0.42s cubic-bezier(0.4,0,0.2,1), transform 0.42s cubic-bezier(0.4,0,0.2,1), top 0.42s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 900,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 18"
        style={{ width: '137px', height: '24px' }}
      >
        <polygon
          points="8,3 15.5,16 0.5,16"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x="17"
          y="15"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="21"
          fontWeight="400"
          fill="white"
          letterSpacing="0.8"
        >
          watteo.
        </text>
      </svg>
    </div>
  );
}
