import { render, screen } from "@testing-library/react";
import { FlightList } from "./FlightList";
import type { Flight } from "~/modules/rotation/models/Flight";
import UserEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

const flights: Flight[] = [
  {
    ident: "F001",
    origin: "JFK",
    destination: "SFO",
    departuretime: 1609459200,
    arrivaltime: 1609470000,
    readable_departure: "12:00",
    readable_arrival: "3:00",
  },
  {
    ident: "F002",
    origin: "SFO",
    destination: "JFK",
    departuretime: 1609459200,
    arrivaltime: 1609470000,
    readable_departure: "15:00",
    readable_arrival: "18:00",
  },
];

describe("FlightList", () => {
  const props = {
    onSelect: vi.fn(),
    flights: flights,
  };

  it("renders a list of flights", () => {
    render(<FlightList {...props} />);

    expect(screen.getByText("F001")).toBeInTheDocument();
    expect(screen.getByText("F002")).toBeInTheDocument();

    expect(screen.getByText('12:00')).toBeInTheDocument();
  });

  it("calls the onSelect handler when a flight is clicked", async () => {
    render(<FlightList {...props} />);

    await UserEvent.click(screen.getByText("F001"));

    expect(props.onSelect).toHaveBeenCalledWith(props.flights[0]);
  });
});
