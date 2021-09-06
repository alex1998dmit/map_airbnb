import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import Apartments from "./apartments";
import MapPoint from "./MapPoint";
import OverlayContainer from "./OverlayContainer";

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}

const useStyles = makeStyles({
  map: {
    height: '100vh'
  }
})

function Map({ center, zoom }: MapProps) {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null)
  const classes = useStyles();

  useEffect(() => {
    if (ref.current) { 
      let createdMap = new window.google.maps.Map(
        ref.current,
        {
          center,
          zoom,
          disableDefaultUI: true,
          clickableIcons: false
        }
      );
      setMap(createdMap)
    }
  }, [center, zoom]);

  return <div ref={ref} id="map" className={classes.map}>
    {Apartments.map((apartment, index) => (
      <OverlayContainer
        map={map}
        position={{
          lat: apartment.lat,
          lng: apartment.lng
        }}
        key={index}
      >
        <MapPoint
          image={apartment.image}
          address={apartment.address}
          area={apartment.area}
          rooms_number={apartment.rooms_number}
          floor={apartment.floor}
          floor_count={apartment.floor_count}
          rent={apartment.rent}
        />
      </OverlayContainer>
    ))}
  </div>;
}

export default Map