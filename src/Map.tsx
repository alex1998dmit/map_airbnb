import { makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Apartments from "./apartments";
import MapPoint from "./MapPoint";
import OverlayContainer from "./OverlayContainer";

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
  apartments: any[]
}

const useStyles = makeStyles({
  map: {
    height: '50vh'
  }
})

function Map({ center, zoom, apartments }: MapProps) {
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
    {apartments.map((apartment ,index) => {
      return (
      <OverlayContainer
        map={map}
        position={{
          lat: Number(apartment.lat),
          lng: Number(apartment.lng)
        }}
        key={apartment.id}
      >
        <MapPoint
          image={apartment.image}
          address={apartment.address}
          area={Number(apartment.area)}
          rooms_number={apartment.rooms_number}
          floor={apartment.floor}
          floor_count={apartment.floor_count}
          rent={apartment.rent}
          map={map}
          lat={Number(apartment.lat)}
          lng={Number(apartment.lng)}
        />
      </OverlayContainer>
    )})}
  </div>;
}

export default Map