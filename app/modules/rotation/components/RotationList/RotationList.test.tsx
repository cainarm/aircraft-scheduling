import type { Flight } from "~/modules/rotation/models/Flight";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RotationList } from "./RotationList";
import { render, screen } from "@testing-library/react";

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

describe("RotationList", () => {
  it("renders a list of flights", () => {
    render(<RotationList flights={flights} onRemove={() => {}} />);
    expect(screen.getByText("Flight: F001")).toBeInTheDocument();
    expect(screen.getByText("Flight: F002")).toBeInTheDocument();
  });

  it("calls the onRemove function when the remove button is clicked", async () => {
    const onRemoveMock = vi.fn();
    render(<RotationList flights={flights} onRemove={onRemoveMock} />);
    await userEvent.click(
      screen.getByLabelText("remove flight F001 from rotation")
    );

    expect(onRemoveMock).toHaveBeenCalled();
  });
});
