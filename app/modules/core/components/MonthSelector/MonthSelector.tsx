import { toLongDateString } from "~/modules/core/utils/Date";
import { ChevronLeft, ChevronRight } from "~/modules/core/components/Icons";
import cx from "classnames";

type Props = {
  date: Date;
  onChange: (date: Date) => void;
  renderLabel?: (date: Date) => React.ReactNode | string;
} & React.HTMLAttributes<HTMLDivElement>;

export function MonthSelector({
  date,
  onChange,
  renderLabel = toLongDateString,
  className,
  ...otherProps
}: Props) {
  const goToPreviousMonth = () => {
    // todo: implement
  };

  const goToNextMonth = () => {
    // todo: implement
  };

  return (
    <div
      className={cx("flex items-center justify-between gap-5", className)}
      {...otherProps}
    >
      <button className="p-1 focus:outline-none" onClick={goToPreviousMonth}>
        <ChevronLeft />
      </button>
      <span className="text-md font-bold">{renderLabel(date)}</span>
      <button className="p-1 focus:outline-none" onClick={goToNextMonth}>
        <ChevronRight />
      </button>
    </div>
  );
}
