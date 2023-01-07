import { render, screen } from "@testing-library/react";
import { MonthSelector } from "./MonthSelector";
import { toLongDateString } from "~/modules/core/utils/Date";
import { describe, it, expect } from "vitest";

describe("MonthSelector", () => {
  it("renders the correct label for the current month", () => {
    const date = new Date(2022, 0, 1);
    const label = toLongDateString(date);

    render(<MonthSelector date={date} onChange={() => {}} />);

    console.log(label);

    expect(screen.getByText("1st January 2022")).toBeInTheDocument();
  });

  it('should support a custom render function', () => {
    const date = new Date(2022, 0, 1);
    const renderLabel = (date: Date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    render(<MonthSelector date={date} onChange={() => {}} renderLabel={renderLabel} />);

    expect(screen.getByText("January 2022")).toBeInTheDocument();
  })
});
