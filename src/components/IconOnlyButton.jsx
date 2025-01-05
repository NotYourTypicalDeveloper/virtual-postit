import { Tooltip as ReactTooltip } from "react-tooltip";

const IconOnlyButton = ({
  tooltipText,
  tooltipID,
  onClickFn,
  className,
  icon,
  tooltipPosition,
}) => {
  return (
    <div>
      <button
        onClick={onClickFn}
        className={className}
        data-tooltip-id={tooltipID}
        data-tooltip-variant="light"
        aria-label={tooltipID}
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
      <ReactTooltip
        id={tooltipID}
        content={tooltipText}
        place={tooltipPosition}
      />
    </div>
  );
};

export default IconOnlyButton;
