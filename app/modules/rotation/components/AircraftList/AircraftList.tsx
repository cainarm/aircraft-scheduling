import type { Aircraft } from "~/modules/rotation/models/Aircraft";
import cx from "classnames";

type Props = {
  aircrafts: Array<
    Aircraft & {
      utilization?: number;
    }
  >;
  selectedAircraft?: string;
  onSelect: (id: string) => void;
};

export function AircraftList({ aircrafts, selectedAircraft, onSelect }: Props) {
  return (
    <div
      className="flex h-[32rem] flex-col flex-nowrap gap-2 overflow-y-auto rounded-lg p-6 p-0"
      aria-label={`List of available aircrafts`}
    >
      {aircrafts.map((aircraft) => (
        <div
          key={aircraft.ident}
          onClick={() => onSelect(aircraft.ident)}
          tabIndex={1}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSelect(aircraft.ident);
          }}
          className={cx(
            "flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border bg-white bg-white p-2",
            aircraft.ident === selectedAircraft
              ? "border-cyan-600"
              : "border-gray-200"
          )}
        >
          <span className="text-2xl font-bold" aria-label="aircraft identifier">
            {aircraft.ident}
          </span>
          {aircraft?.utilization ? (
            <span
              className="text-xl font-bold text-gray-600"
              aria-label="aircraft utilization"
            >
              {`(${~~aircraft.utilization} %)`}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
