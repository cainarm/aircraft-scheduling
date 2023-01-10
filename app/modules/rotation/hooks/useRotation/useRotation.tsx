import { useState } from "react";
import type { Flight } from "~/modules/rotation/models/Flight";
import { unique } from "~/utils/Array";
import { getPercentageProportion } from "~/utils/Number";
import { SECONDS_IN_A_DAY } from "~/constants/time";

type Props = {
  turnaroundTime: number;
};

export const useRotation = ({ turnaroundTime }: Props) => {
  const [rotation, setRotationData] = useState<Record<string, Flight[]>>({});
  const [selectedAircraft, setSelectedAircraft] = useState<string>();

  function setAircraft(aircraftId: string) {
    setSelectedAircraft(aircraftId);
  }

  const addFlightToRotation = (flight: Flight) => {
    if (selectedAircraft) {
      setRotationData({
        ...rotation,
        [selectedAircraft]: unique([
          ...(rotation[selectedAircraft] || []),
          flight,
        ]),
      });
    }
  };

  const removeFlightFromRotation = (flightToRemove: Flight) => {
    if (selectedAircraft) {
      setRotationData({
        ...rotation,
        [selectedAircraft]:
          rotation[selectedAircraft]?.filter(
            (flight) => flight.ident !== flightToRemove.ident
          ) || [],
      });
    }
  };

  const aircraftsUtilizationRate = Object.keys(rotation).reduce(
    (total, current) => ({
      ...total,
      [current]: rotation[current]
        ? getPercentageProportion(
            rotation[current].reduce(
              (sum, flight) =>
                sum +
                (flight.arrivaltime - flight.departuretime) +
                turnaroundTime,
              0
            ),
            SECONDS_IN_A_DAY
          )
        : 0,
    }),
    {} as Record<string, number>
  );

  return {
    state: {
      rotation,
      aircraftsUtilizationRate,
      selectedAircraft,
    },
    mutators: {
      setAircraft,
      addFlightToRotation,
      removeFlightFromRotation,
    },
  };
};
