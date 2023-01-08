import type { Aircraft } from "~/modules/rotation/models/Aircraft";

export const fetchAircrafts = () => {
  return fetch("https://ec304ac5-ce38-44c1-bcf9-2a5b1a5b09a1.mock.pstmn.io/aircrafts")
    .then((response) => response.json())
    .then<Aircraft[]>((data) => data);
};
