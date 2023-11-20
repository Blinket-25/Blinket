export default async function GetCurrentLocation(e, error) {
  navigator.geolocation.getCurrentPosition(e, error);
}
