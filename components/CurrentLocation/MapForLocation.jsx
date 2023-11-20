import useContextFunctions from "@/hooks/useContextFunctions";
import { useCallback, useEffect, useRef, useState } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

export const MapForLocation = withGoogleMap(({ selectedCoords }) => {
  const [currentLocation, setCurrentLocation] = useState(selectedCoords);
  const refMap = useRef(null);
  const { setUserInformation } = useContextFunctions();

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter();
    const coords = {
      lat: mapCenter.lat(),
      lng: mapCenter.lng(),
    };
    setCurrentLocation(coords);
  };

  useEffect(() => {
    setUserInformation({
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
    });
  }, [currentLocation]);

  return (
    <GoogleMap
      defaultZoom={16}
      zoom={16}
      ref={refMap}
      onDragEnd={useCallback(handleBoundsChanged)}
      defaultCenter={{ lat: currentLocation.lat, lng: currentLocation.lng }}
      defaultOptions={{
        disableDefaultUI: true,
        gestureHandling: "greedy",
      }}
      mapTypeId={"terrain"}
    />
  );
});
