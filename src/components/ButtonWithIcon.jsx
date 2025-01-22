const ButtonWithIcon = ({ className, clickEvent, icon, label, props }) => {
  return (
    <button
      className={className}
      onClick={clickEvent}
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "20px",
      }}
      {...props}
    >
      {icon}
      <span> {label}</span>
    </button>
  );
};

export default ButtonWithIcon;
