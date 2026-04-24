import { createBarikoiClient } from "barikoiapis";

const locationService = createBarikoiClient({
  apiKey: process.env.NEXT_PUBLIC_LOCATION_SERVICE_API_KEY as string,
});

export default locationService;
