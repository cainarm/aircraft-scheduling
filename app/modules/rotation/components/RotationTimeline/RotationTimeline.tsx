import React from "react";
import { SegmentedBarChart } from "~/modules/core/components/SegmentedBarChart";
import type { DataSegment } from "~/modules/core/components/SegmentedBarChart";
import type { Flight } from "~/modules/rotation/models/Flight";
import { getPercentageProportion } from "~/modules/core/utils/Number";
import { SECONDS_IN_A_DAY } from "~/modules/core/constants/time";

type Props = {
  turnaroundTime: number;
  flights: Flight[];
} & React.HTMLAttributes<HTMLDivElement>;

export function RotationTimeline({
  flights,
  turnaroundTime,
  ...otherProps
}: Props) {
  const events = flights.reduce((total, current) => {
    const turnAroundEvent: DataSegment = {
      color: "indigo",
      to: getPercentageProportion(
        current.arrivaltime + turnaroundTime,
        SECONDS_IN_A_DAY
      ),
    };

    const idleTimeEvent: DataSegment = {
      color: "gray",
      to: getPercentageProportion(current.departuretime, SECONDS_IN_A_DAY),
    };

    const event: DataSegment = {
      color: "lime",
      to: getPercentageProportion(current.arrivaltime, SECONDS_IN_A_DAY),
    };

    return [...total, idleTimeEvent, event, turnAroundEvent];
  }, [] as DataSegment[]);

  return (
    <SegmentedBarChart
      events={events}
      labels={["00:00", "12:00", "23:59"]}
      aria-hidden
      {...otherProps}
    />
  );
}
