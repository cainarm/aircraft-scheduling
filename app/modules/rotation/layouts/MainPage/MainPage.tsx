import { useRotation } from "~/modules/rotation/hooks/useRotation/useRotation";
import { RotationList } from "~/modules/rotation/components/RotationList";
import { FlightList } from "~/modules/rotation/components/FlightList";
import { AircraftList } from "~/modules/rotation/components/AircraftList";
import { RotationTimeline } from "~/modules/rotation/components/RotationTimeline";
import { MonthSelector } from "~/modules/core/components/MonthSelector";
import { TURNAROUND_TIME } from "~/modules/rotation/constants/rotation";
import { SECONDS_IN_A_DAY } from "~/modules/core/constants/time";
import type { Flight } from "~/modules/rotation/models/Flight";
import type { Aircraft } from "~/modules/rotation/models/Aircraft";

type Props = {
  aircrafts: Aircraft[];
  flights: Flight[];
};

function getNextDay() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

export function MainPage({ aircrafts, flights }: Props) {
  const {
    state: { rotation, selectedAircraft, aircraftsUtilizationRate },
    mutators: { setAircraft, addFlightToRotation, removeFlightFromRotation },
  } = useRotation({
    turnaroundTime: TURNAROUND_TIME,
  });

  const latestFlightInRotation = selectedAircraft
    ? rotation[selectedAircraft]?.sort(
        (a, b) => b.arrivaltime - a.arrivaltime
      )[0]
    : undefined;

  const availableFlights = latestFlightInRotation
    ? flights.filter((flight) => {
        const flightDepartsAfterLatestArrival =
          flight.departuretime >=
          latestFlightInRotation.arrivaltime + TURNAROUND_TIME;

        const flightDepartsAtLastestDestination =
          flight.origin === latestFlightInRotation.destination;

        const flightIsNotInRotation = !Object.values(rotation)
          .flat()
          ?.find((rotationFlight) => rotationFlight.ident === flight.ident);

        const flightWillBeOnTheGroundAtMidnight =
          flight.arrivaltime + TURNAROUND_TIME <= SECONDS_IN_A_DAY;

        return (
          flightDepartsAfterLatestArrival &&
          flightDepartsAtLastestDestination &&
          flightIsNotInRotation &&
          flightWillBeOnTheGroundAtMidnight
        );
      })
    : flights;

  return (
    <main className="flex w-full flex-col items-center">
      <MonthSelector
        date={getNextDay()}
        onChange={(date) => console.log(date)}
        className="mt-10"
      />
      <section className="relative grid w-full max-w-screen-lg grid-cols-4 gap-3 pt-10">
        <div className="col-span-1">
          <h3 className="mb-4 text-center text-2xl font-bold ">Aircrafts</h3>

          <AircraftList
            aircrafts={aircrafts.map((aircraft) => ({
              ...aircraft,
              utilization: aircraftsUtilizationRate[aircraft.ident],
            }))}
            selectedAircraft={selectedAircraft}
            onSelect={(id) => setAircraft(id)}
          />
        </div>
        <div className="col-span-2">
          <h3 className="b mb-4 text-center text-2xl font-bold">
            Rotation {selectedAircraft}
          </h3>

          <RotationList
            flights={selectedAircraft ? rotation[selectedAircraft] : []}
            onRemove={removeFlightFromRotation}
          />
          {selectedAircraft && (
            <RotationTimeline
              className="mt-12"
              flights={rotation[selectedAircraft]?.reverse() || []}
              turnaroundTime={TURNAROUND_TIME}
            />
          )}
        </div>
        <div className="col-span-1">
          <h3 className="mb-4 text-center text-2xl font-bold">Flights</h3>

          <FlightList
            flights={availableFlights}
            onSelect={addFlightToRotation}
          />
        </div>
      </section>
    </main>
  );
}
