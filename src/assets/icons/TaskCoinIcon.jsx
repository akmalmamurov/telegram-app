export const TaskCoinIcon = (props) => {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="6.4115"
        cy="6.31286"
        rx="6.4115"
        ry="6.31286"
        fill="#EFC269"
      />
      <path
        d="M11.8298 6.31283C11.8298 9.24292 9.41188 11.6325 6.41147 11.6325C3.41107 11.6325 0.993164 9.24292 0.993164 6.31283C0.993164 3.38275 3.41107 0.993164 6.41147 0.993164C9.41188 0.993164 11.8298 3.38275 11.8298 6.31283Z"
        fill="url(#paint0_linear_438_115)"
        stroke="url(#paint1_linear_438_115)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_438_115"
          x1="2.77829"
          y1="1.92342"
          x2="10.9324"
          y2="10.8338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2BC62" />
          <stop offset="0.5" stopColor="#FBD772" />
          <stop offset={1} stopColor="#E2BC62" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_438_115"
          x1="2.13714"
          y1="1.74258"
          x2="8.92675"
          y2="12.1325"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AC8130" />
          <stop offset={1} stopColor="#F7E18B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TaskCoinIcon;
