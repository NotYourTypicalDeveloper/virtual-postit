const IconOnlyButton = ({ onClickFn, className, icon }) => {
  return (
    <button
      onClick={onClickFn}
      className={className}
      style={{
        background: "transparent",
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
