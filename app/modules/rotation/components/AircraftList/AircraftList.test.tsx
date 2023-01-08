import { render, screen } from "@testing-library/react";
import { AircraftList } from "./AircraftList";
import { describe, it, expect, vi } from "vitest";
import UserEvent from "@testing-library/user-event";
import type { Aircraft } from "~/modules/rotation/models/Aircraft";

const aircrafts: Array<Aircraft & {
    utilization?: number;
}> = [
  { ident: "A1", type: "a530", economySeats: 100, base: "??", utilization: 50 },
  { ident: "A2", type: "a530", economySeats: 100, base: "??", utilization: 75.234 },
  { ident: "A3", type: "a530", economySeats: 100, base: "??" },
];

describe("AircraftList", () => {
  it("should render a list of aircrafts", () => {
    render(
      <AircraftList aircrafts={aircrafts} onSelect={() => {}} />
    );
    const aircraftIdentifiers = screen.getAllByLabelText("aircraft identifier");

    expect(aircraftIdentifiers).toHaveLength(3);
    expect(aircraftIdentifiers[0]).toHaveTextContent("A1");
    expect(aircraftIdentifiers[1]).toHaveTextContent("A2");
    expect(aircraftIdentifiers[2]).toHaveTextContent("A3");
  });

  it("should render utilization for each aircraft", () => {
    render(
      <AircraftList aircrafts={aircrafts} onSelect={() => {}} />
    );
    const aircraftUtilizations = screen.getAllByLabelText("aircraft utilization");

    expect(aircraftUtilizations).toHaveLength(2);
    expect(aircraftUtilizations[0]).toHaveTextContent("(50 %)");
    expect(aircraftUtilizations[1]).toHaveTextContent("(75 %)");
  });

  it("should call onSelect when an aircraft is clicked", async  () => {
    const onSelect = vi.fn();
    render(
      <AircraftList aircrafts={aircrafts} onSelect={onSelect} />
    );
    await UserEvent.click(screen.getByText("A1"));

    expect(onSelect).toHaveBeenCalledWith("A1");
  });
});