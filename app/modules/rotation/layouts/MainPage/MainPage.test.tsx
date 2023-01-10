import { MainPage } from "./MainPage";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { TURNAROUND_TIME } from "~/modules/rotation/constants/rotation";
import { SECONDS_IN_A_DAY } from "~/modules/core/constants/time";

describe("Rotation MainPage", () => {
  const aircrafts = [
    {
      ident: "A1",
      type: "a530",
      economySeats: 100,
      base: "??",
    },
  ];

  const flights = [
    {
      ident: "F001",
      origin: "JFK",
      destination: "SFO",
      departuretime: 7200,
      arrivaltime: 10800,
      readable_departure: "2:00",
      readable_arrival: "3:00",
    },
    {
      ident: "F002",
      origin: "POA",
      destination: "SFO",
      departuretime: 21600,
      arrivaltime: 25200,
      readable_departure: "6:00",
      readable_arrival: "7:00",
    },
    {
      ident: "F003",
      origin: "SFO",
      destination: "PNM",
      departuretime: 32400,
      arrivaltime: 39600,
      readable_departure: "9:00",
      readable_arrival: "11:00",
    },
    {
      ident: "F004",
      origin: "PNM",
      destination: "ABC",
      departuretime: 50400,
      arrivaltime: 57600,
      readable_departure: "14:00",
      readable_arrival: "16:00",
    },
  ];

  beforeAll(() => {
    const date = new Date(2023, 1, 8);

    vi.setSystemTime(date);
  });

  it("user should be able to create a rotation", async () => {
    // this single test case stress a few use cases besides the rotation creation:
    // flight filtering based on origin, departure/arrival and turnaround times
    // default date as "tomorrow"

    render(<MainPage aircrafts={aircrafts} flights={flights} />);

    await selectAircraft("A1");

    await selectFlight("F001");
    await selectFlight("F003");
    await selectFlight("F004");

    expect(screen.queryByText("F002")).not.toBeInTheDocument();
    expect(screen.getByText("9th February 2023")).toBeInTheDocument();

    expect(screen.getByLabelText("aircraft utilization")).toHaveTextContent(
      "(25 %)"
    );
  });

  it("aircraft utilization should be reflected correctly on the left panel", async () => {
    render(
      <MainPage
        aircrafts={aircrafts}
        flights={[
          {
            ident: "F001",
            origin: "JFK",
            destination: "SFO",
            departuretime: 0,
            arrivaltime: SECONDS_IN_A_DAY - TURNAROUND_TIME,
            readable_departure: "2:00",
            readable_arrival: "3:00",
          },
        ]}
      />
    );

    await selectAircraft("A1");
    await selectFlight("F001");

    expect(screen.getByLabelText("aircraft utilization")).toHaveTextContent(
      "(100 %)"
    );
  });

  it("should be possible to remove aircrafts from the rotation", async () => {
    render(<MainPage aircrafts={aircrafts} flights={flights} />);

    await selectAircraft("A1");
    await selectFlight("F002");

    await removeFlight("F002");

    expect(screen.queryByText("Flight: F002")).not.toBeInTheDocument();
  });

  it("should allow user to modify many rotations at the same time", async () => {
    render(
      <MainPage
        aircrafts={[
          {
            ident: "A1",
            type: "a530",
            economySeats: 100,
            base: "??",
          },
          {
            ident: "A2",
            type: "a530",
            economySeats: 100,
            base: "??",
          },
        ]}
        flights={flights}
      />
    );

    await selectAircraft("A1");

    await selectFlight("F001");
    expect(screen.getByText("Flight: F001")).toBeInTheDocument();

    await selectAircraft("A2");
    expect(screen.queryByText("Flight: F001")).not.toBeInTheDocument();

    await selectFlight("F002");
    expect(screen.getByText("Flight: F002")).toBeInTheDocument();

    await selectAircraft("A1");
    expect(screen.getByText("Flight: F001")).toBeInTheDocument();
  });

  it("should filter out flights (from flight selection column) that departs before latest arrival in rotation", async () => {
    render(
      <MainPage
        aircrafts={aircrafts}
        flights={[
          {
            ident: "F001",
            origin: "JFK",
            destination: "SFO",
            departuretime: 0,
            arrivaltime: 10800,
            readable_departure: "2:00",
            readable_arrival: "3:00",
          },
          {
            ident: "F002",
            origin: "SFO",
            destination: "JFK",
            departuretime: 10800,
            arrivaltime: 23404,
            readable_departure: "3:00",
            readable_arrival: "4:00",
          },
          {
            ident: "F003",
            origin: "SFO",
            destination: "JFK",
            departuretime: 10800 + TURNAROUND_TIME,
            arrivaltime: 23404,
            readable_departure: "3:30",
            readable_arrival: "4:00",
          },
        ]}
      />
    );

    await selectAircraft("A1");

    await selectFlight("F001");
    expect(screen.queryByText("F002")).not.toBeInTheDocument();
    expect(screen.getByText("F003")).toBeInTheDocument();
  });

  it("should filter flights to enforce aircrafts on ground at midnight", async () => {
    render(
      <MainPage
        aircrafts={aircrafts}
        flights={[
          {
            ident: "F001",
            origin: "JFK",
            destination: "SFO",
            departuretime: 0,
            arrivaltime: SECONDS_IN_A_DAY / 2,
            readable_departure: "0:00",
            readable_arrival: "12:00",
          },
          {
            ident: "F002",
            origin: "JFK",
            destination: "SFO",
            departuretime: 0,
            arrivaltime: SECONDS_IN_A_DAY,
            readable_departure: "12:00",
            readable_arrival: "+23:59",
          },
        ]}
      />
    );

    await selectAircraft("A1");
    await selectFlight("F001");

    expect(screen.queryByText("F002")).not.toBeInTheDocument();
  });
});

async function selectAircraft(id: string) {
  const aircraftList = within(
    screen.getByLabelText("List of available aircrafts")
  );

  await UserEvent.click(aircraftList.getByText(id));
}

async function selectFlight(id: string) {
  const flightList = within(screen.getByLabelText("List of available flights"));

  await UserEvent.click(flightList.getByText(id));
}

async function removeFlight(id: string) {
  await UserEvent.click(
    screen.getByRole("button", { name: `remove flight ${id} from rotation` })
  );
}
