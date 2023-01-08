import type { Flight } from "~/modules/rotation/models/Flight";

export const fetchFlights = () => {
  return fetch(
    "https://ec304ac5-ce38-44c1-bcf9-2a5b1a5b09a1.mock.pstmn.io/flights"
  )
    .then((response) => response.json())
    .then<Flight[]>((data) => data);
};
