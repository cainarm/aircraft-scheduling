import React from "react";
import { Timeline } from "~/components/Timeline";
import type { DataSegment } from "~/modules/core/components/SegmentedBarChart";
import type { Flight } from "~/models/Flight";
import { getPercentageProportion } from "~/utils/Number";
import { SECONDS_IN_A_DAY } from "~/constants/time";

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

  console.log(events);

  return (
    <Timeline
      events={events}
      labels={["00:00", "12:00", "23:59"]}
      {...otherProps}
    />
  );
}
