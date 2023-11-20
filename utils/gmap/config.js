import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("in");

export default Geocode;
