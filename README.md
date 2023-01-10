# Aircraft Scheduling

A web application that allows the user to optimize utilization of aircrafts by scheduling daily rotations for each aircraft. The app displays a list of all aircrafts and flights, allows for editing of the rotation while enforcing rules such as turnaround time and ground time at midnight. It also calculates and displays aircraft utilization and displays a 24 hour timeline of scheduled service, turnaround time and idle time for the selected aircraft.

## Techs
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- [Remix.run](https://remix.run/)

## Getting Started
- Run `npm install` to install all necessary dependencies.
- To start the application, run `npm run dev`.
- To run unit tests, use the command `npm run test`.

## Improvement Ideas
- Implement end-to-end visual regression testing (using tools such as Cypress, Playwright, or Storybook) for the SegmentedBarChart and RotationTimeline components as they are heavily visual and do not require accessibility labels.
- Improve usability by adding additional labels for new users. For example, a tooltip on the flights column could be added to explain how filtering works, such as (showing flights departing from POA after 2:00 PM).
- Enhance the application's responsiveness by adding support for lower resolutions (medium and small screens).

## Assumptions Considered
- It is assumed that the first flight departs from any airport as all "base" properties in the API are the same, and do not match any options in the flights endpoint.
- It is assumed that the "ident" field is a unique identifier.
- It is assumed that pagination is not necessary, as the API did not respond to the offset and limit query parameters.
- A MonthSelector component has been created, but the previous/next functionality has not been implemented as per the requirement "Only one day worth of schedule can be entered ('tomorrow')."




