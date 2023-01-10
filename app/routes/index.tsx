import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchAircrafts } from "~/modules/rotation/services/aircraft";
import { fetchFlights } from "~/modules/rotation/services/flight";
import { MainPage as RotationPage } from "~/modules/rotation/layouts/MainPage";

export async function loader() {
  const pageData = await Promise.all([fetchAircrafts(), fetchFlights()]);

  return json(pageData);
}

export default function Index() {
  const [aircrafts, flights] = useLoaderData<typeof loader>();

  return <RotationPage aircrafts={aircrafts} flights={flights} />;
}
