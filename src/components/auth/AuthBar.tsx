interface AuthBarProps {
  className?: string;
}

function AuthBar({ className }: AuthBarProps) {
  return (
    <svg
      width="2"
      height="6"
      viewBox="0 0 2 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1 0V6" stroke="#C1BDB8" />
    </svg>
  );
}

export default AuthBar;
