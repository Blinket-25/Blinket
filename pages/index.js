import { SectionHome } from "@/sections";

// const API_URL = "http://localhost:5000/superg-6abfb/us-central1/api";
// const API_URL = "http://localhost:8000";
const API_URL =
  "http://superg-env.eba-q89mw9c8.ap-south-1.elasticbeanstalk.com";
// const API_URL = "https://us-central1-superg-6abfb.cloudfunctions.net/api";

export default function Home() {
  return (
    <>
      <SectionHome />
    </>
  );
}
