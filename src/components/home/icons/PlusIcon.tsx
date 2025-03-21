import React from 'react';

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_57_30822)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 7C2 4.23857 4.23857 2 7 2H17C19.7614 2 22 4.23857 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23857 22 2 19.7614 2 17V7ZM12 6.64286C12.5917 6.64286 13.0714 7.12256 13.0714 7.71429V10.9286H16.2857C16.8774 10.9286 17.3571 11.4083 17.3571 12C17.3571 12.5917 16.8774 13.0714 16.2857 13.0714H13.0714V16.2857C13.0714 16.8774 12.5917 17.3571 12 17.3571C11.4083 17.3571 10.9286 16.8774 10.9286 16.2857V13.0714H7.71429C7.12256 13.0714 6.64286 12.5917 6.64286 12C6.64286 11.4083 7.12256 10.9286 7.71429 10.9286H10.9286V7.71429C10.9286 7.12256 11.4083 6.64286 12 6.64286Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_57_30822">
          <rect width="20" height="20" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusIcon;
