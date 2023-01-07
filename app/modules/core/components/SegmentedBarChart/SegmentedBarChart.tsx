import React from "react";
import cx from "classnames";
import { Labels } from "./Labels";

const supportedColors = {
  indigo: "bg-indigo-500",
  lime: "bg-lime-500",
  gray: 'bg-gray-200'
} as const;

export type DataSegment = {
  to: number;
  color: keyof typeof supportedColors;
};

type Props = {
  events: DataSegment[];
  labels: string[];
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const totalLengthSoFar = (events: DataSegment[]) =>
  events.reduce((total, current) => total + current.to, 0);

export function SegmentedBarChart({ events, className, labels, ...otherProps }: Props) {
  return (
    <div
      className={cx(
        "relative flex h-12 w-full flex-col justify-start gap-1 px-2",
        className
      )}
      {...otherProps}
    >
      <Labels labels={labels} />
      <div className="relative flex h-full w-full flex-row border border-gray-400 bg-gray-200">
        {events
          .reduce(
            (total, current) => [
              ...total,
              { ...current, to: current.to - totalLengthSoFar(total) },
            ],
            [] as DataSegment[]
          )
          .map((event, index) => {
            return (
              <div
                key={index}
                className={`h-full shrink-0 ${supportedColors[event.color]}`}
                style={{ width: `${event.to}%`}}
              />
            );
          })}
      </div>
    </div>
  );
}
