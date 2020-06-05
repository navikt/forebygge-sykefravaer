import React from "react";

const CheckedCircle = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48583 0 0 4.48667 0 10C0 15.5133 4.48583 20 10 20C15.5133 20 20 15.5133 20 10C20 4.48667 15.5133 0 10 0Z"
        fill="#66A4DC"
      />
      <path
        d="M7.45012 12.6125C7.53547 12.539 7.64426 12.5 7.75642 12.5C7.87274 12.5 7.9869 12.543 8.07005 12.6194L7.7669 12.3379L7.45012 12.6125ZM7.78782 11.179L13.5672 6.17057C14.1093 5.69972 14.9616 5.72445 15.47 6.22899C15.9784 6.73357 15.9493 7.52507 15.4063 7.99685L8.67257 13.8328C8.42118 14.0492 8.09326 14.1667 7.75642 14.1667C7.40307 14.1667 7.06264 14.0385 6.80416 13.8009L4.5606 11.7176C4.03514 11.2297 4.03514 10.4379 4.5606 9.94992C5.08606 9.46198 5.93877 9.46198 6.46423 9.94992L7.78782 11.179Z"
        fill="white"
      />
    </svg>
  );
};

export default CheckedCircle;
