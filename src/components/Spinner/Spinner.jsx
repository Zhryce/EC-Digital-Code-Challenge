import "./Spinner.scss";
export const Spinner = () => {
  return (
    <div className="spinner_wrapper">
      <svg
        className="spinner"
        width="35px"
        height="35px"
        viewBox="0 0 51 51"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          cx="25"
          cy="25"
          r="20"
        ></circle>
      </svg>
    </div>
  );
};
