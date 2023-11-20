import useGeocode from "@/hooks/useGoecode";
import { useBoolean } from "@chakra-ui/react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import useContextFunctions from "@/hooks/useContextFunctions";
import { useEffect, useState } from "react";
import useContextData from "@/hooks/useContextData";
import { SearchLocationByInput } from "./ManualLocationComp/SearchLocationByInput";
import { SetLocationOnMap } from "./ManualLocationComp/SetLocationOnMap";

export function ManualLocation({ onClose }) {
  const [isLoading, setLoading] = useBoolean();
  const [isAddressLoading, setAddressLoading] = useBoolean();
  const { getCoordsFromAddress, getAddressFromCoords } = useGeocode();
  const { user } = useContextData();
  const { setUserInformation, closeLocationModal } = useContextFunctions();
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      debounce: 0,
      options: {
        componentRestrictions: { country: "in" },
      },
    });
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedCoords, setSelectedCoords] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    selectedAddress && setCoords(selectedAddress);
  }, [selectedAddress]);

  const getAddress = async () => {
    setAddressLoading.on();
    const coords = {
      lat: user.latitude,
      lng: user.longitude,
    };
    const address = await getAddressFromCoords(coords);
    setUserInformation({
      shortAddress: address.shortAddress,
      longAddress: address.longAddress,
      savedAddresses: null,
      STORE_CODE: "STORE0001",
      selectedAddress: null,
    });
    setAddressLoading.off();
    return true;
  };

  useEffect(() => {
    user.longitude && getAddress();
  }, [user]);

  const setCoords = async (address) => {
    setLoading.on();
    const coords = await getCoordsFromAddress({
      address,
    });
    setSelectedCoords({
      lat: coords.lat,
      lng: coords.lng,
    });
    setLoading.off();
  };

  if (selectedAddress && !isLoading) {
    return (
      <SetLocationOnMap
        closeLocationModal={closeLocationModal}
        isAddressLoading={isAddressLoading}
        onClose={onClose}
        selectedCoords={selectedCoords}
        user={user}
      />
    );
  }

  return (
    <SearchLocationByInput
      isLoading={isLoading}
      getPlacePredictions={getPlacePredictions}
      isPlacePredictionsLoading={isPlacePredictionsLoading}
      placePredictions={placePredictions}
      setSelectedAddress={setSelectedAddress}
    />
  );
}
