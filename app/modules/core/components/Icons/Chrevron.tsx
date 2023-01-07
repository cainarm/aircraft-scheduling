import cx from "classnames";

export function ChevronLeft(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className={cx("h-5 w-5", props.className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

export function ChevronRight(props: React.HTMLAttributes<SVGElement>) {
  return <ChevronLeft className={cx("rotate-180", props.className)} {...props}/>;
}
