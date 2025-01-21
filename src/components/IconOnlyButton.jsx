const IconOnlyButton = ({ onClickFn, className, icon }) => {
  return (
    <button
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
