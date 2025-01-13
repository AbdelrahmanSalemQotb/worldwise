import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Spinner from "./SmallComponents/Spinner";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import Button from "./SmallComponents/Button";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useCities } from "../features/Cities/useCities";
import { useSidebar } from "../context/SidebarContext";

const DEFAULT_POSITION = [30.044968, 31.244174];

function Map() {
  const { cities = [] } = useCities();

  const [urlLat, urlLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useLocalStorageState([], "userCoords");

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      async function getUserLocation() {
        setMapPosition(DEFAULT_POSITION);
      }
      if (!mapPosition?.length) getUserLocation();
    },
    [setMapPosition, mapPosition]
  );

  useEffect(
    function () {
      if (urlLat && urlLng) setMapPosition([urlLat, urlLng]);
    },
    [urlLat, urlLng, setMapPosition]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition?.lat, geolocationPosition?.lng]);
    },
    [geolocationPosition, setMapPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button style="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      {mapPosition?.length ? (
        <MapContainer
          center={mapPosition}
          zoom={10}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          <ChangePosition position={mapPosition} />
          <MapEvents />
        </MapContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.flyTo(position, 10);
  return null;
}

function MapEvents() {
  const navigator = useNavigate();
  const { toggleSidebar } = useSidebar();

  useMapEvent({
    click(e) {
      navigator(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      toggleSidebar(true);
    },
  });
}
export default Map;
