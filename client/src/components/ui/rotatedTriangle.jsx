import React from 'react';

const RotatedRoundedTriangle = ({ size = 100, color = 'black', cornerRadius = 10 }) => {
  const points = `0,${size} ${size / 2},0 ${size},${size}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(180deg)' }}>
      <polygon points={points} fill={color} stroke={color} strokeWidth="0" strokeLinejoin="round" strokeLinecap="round" />
      <defs>
        <clipPath id="rounded-triangle">
          <polygon points={points} rx={cornerRadius} ry={cornerRadius} strokeLinejoin="round" strokeLinecap="round" />
        </clipPath>
      </defs>
      <polygon points={points} fill={color} clipPath="url(#rounded-triangle)" />
    </svg>
  );
};

export default RotatedRoundedTriangle;