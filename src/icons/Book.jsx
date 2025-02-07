export default function BookIcon({ ref, width = 80, height = 59, ...props }) {
  return (
    <svg
      {...props}
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 80 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 9.625C40 9.625 34.45 3 21.5 3C8.55 3 3 9.625 3 9.625V56C3 56 8.55 52.6875 21.5 52.6875C34.45 52.6875 40 56 40 56M40 9.625V56M40 9.625C40 9.625 45.55 3 58.5 3C71.45 3 77 9.625 77 9.625V56C77 56 71.45 52.6875 58.5 52.6875C45.55 52.6875 40 56 40 56"
        stroke="#FFCD29"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
