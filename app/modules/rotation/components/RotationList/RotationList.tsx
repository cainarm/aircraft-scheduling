import type { Flight } from "~/modules/rotation/models/Flight";
import { CloseIcon } from "~/modules/core/components/Icons";

type Props = {
  flights?: Flight[];
  onRemove: (flight: Flight) => void;
};

const RotationItem = ({
  flight,
  onRemove,
}: {
  flight: Flight;
  onRemove: () => void;
}) => {
  return (
    <div
      className="relative relative rounded-lg border border-gray-200 bg-white p-4"
    >
      <div className="mb-2 text-lg font-bold">Flight: {flight.ident}</div>
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
      <button
        className="absolute top-0 right-0 mr-2 mt-2"
        aria-label={`remove flight ${flight.ident} from rotation`}
        onClick={onRemove}
      >
        <CloseIcon className="text-red-500" />
      </button>
    </div>
  );
};

export function RotationList({ flights = [], onRemove }: Props) {
  return (
    <div
      className="flex h-[28rem] flex-col flex-nowrap  gap-2 overflow-y-auto rounded-lg px-2"
      aria-label={`List of flights in rotation`}
    >
      {flights.map((flight) => (
        <RotationItem
          key={flight.ident}
          flight={flight}
          onRemove={() => onRemove(flight)}
        />
      ))}
    </div>
  );
}
