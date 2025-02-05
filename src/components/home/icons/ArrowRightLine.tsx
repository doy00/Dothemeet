import React from 'react';

const ArrowRightLine: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 19L14.3306 12.7809C14.7158 12.3316 14.7158 11.6684 14.3306 11.2191L9 5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ArrowRightLine;
