import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Location from "expo-location";

interface LocationProps {
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
}

interface LocationContextProps {
  location: LocationProps | null;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationProps | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let watchId: any;

    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada.");
        return;
      }

      watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 30000, // Atualiza a cada 30 segundos
          distanceInterval: 10, // Atualiza se o usuário se mover mais de 10 metros
        },
        async (locationData) => {
          const { latitude, longitude } = locationData.coords;

          // Obter informações de localização reversa
          let [reverseGeocodeResult] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          const city = reverseGeocodeResult?.subregion;
          const country = reverseGeocodeResult?.country;

          setLocation({ latitude, longitude, city, country });
        }
      );
    };

    fetchLocation();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
