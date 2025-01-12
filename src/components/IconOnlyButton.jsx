const IconOnlyButton = ({ onClickFn, className, icon }) => {
  return (
    <div>
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
          padding: 0,
        }}
      >
        {icon}
      </button>
    </div>
  );
};

export default IconOnlyButton;
