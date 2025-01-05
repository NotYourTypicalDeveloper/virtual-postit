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
      <div
        onClick={onClickFn}
        className={className}
        data-tooltip-id={tooltipID}
        data-tooltip-variant="light"
      >
        {icon}
      </div>
      <ReactTooltip
        id={tooltipID}
        content={tooltipText}
        place={tooltipPosition}
      />
    </div>
  );
};

export default IconOnlyButton;
