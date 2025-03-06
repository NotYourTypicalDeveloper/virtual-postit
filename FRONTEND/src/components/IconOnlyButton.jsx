const IconOnlyButton = ({ onClickFn, className, icon, label }) => {
  return (
    <button
      role="button"
      aria-label={label}
      onClick={onClickFn}
      className={className}
      style={{
        background: "transparent",
        color: "#5f5d5d",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </button>
  );
};

export default IconOnlyButton;
