import type { Flight } from "~/modules/rotation/models/Flight";

type Props = {
  flights?: Flight[];
  onSelect: (flight: Flight) => void;
};

function FlightItem({
  flight,
  ...otherProps
}: { flight: Flight } & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="relative cursor-pointer rounded-lg border border-gray-200 bg-white p-2"
      {...otherProps}
    >
      <div
        className="mb-2 text-center text-lg font-bold"
        aria-label="flight identifier"
      >
        {flight.ident}
      </div>
      <div className="flex justify-between">
        <div>
          <div className="mb-2 text-lg font-bold" aria-label="flight origin">
            {flight.origin}
          </div>
          <div aria-label="flight departure">{flight.readable_departure}</div>
        </div>
        <div>
          <div
            className="mb-2 text-lg font-bold"
            aria-label="flight destination"
          >
            {flight.destination}
          </div>
          <div>{flight.readable_arrival}</div>
        </div>
      </div>
    </div>
  );
}

export function FlightList({ flights = [], onSelect }: Props) {
  return (
    <div
      className="flex h-[32rem] flex-col flex-nowrap gap-2 overflow-y-scroll rounded-lg px-2"
      aria-label={`List of available flights (${flights.length} flights)`}

    >
      {flights.map((flight) => (
        <FlightItem
          key={flight.ident}
          flight={flight}
          onClick={() => onSelect(flight)}
        />
      ))}
    </div>
  );
}
