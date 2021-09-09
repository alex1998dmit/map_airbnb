import React from "react"
import { useEffect, useRef, useState } from "react"
import ApartmentCard from "./ApartmentCard"
import ApartmentPoint from "./ApartmentPoint"

type MapPointProps = {
  image: string
  address: string
  area: number
  rooms_number: number
  floor: number
  floor_count: number
  rent: number
  map: google.maps.Map | null
  lat: number
  lng: number
}

const MapPoint = (props: MapPointProps) => {
  const [opened, setIsOpened] = useState<boolean>(false)
  const handleOnOpen = () => {
    setIsOpened(true)
    if (props.map) props.map.panTo({ lat: props.lat, lng: props.lng })
  }
  const handleOnClose = () => setIsOpened(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpened(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (<div ref={containerRef}>
    {opened ?
      <ApartmentCard
        image={props.image}
        address={props.address}
        area={props.area}
        rooms_number={props.rooms_number}
        floor={props.floor}
        floor_count={props.floor_count}
        rent={props.rent}
        handleClose={handleOnClose}
      /> :
      <ApartmentPoint
        price={props.rent}
        onClick={handleOnOpen}
      />}
  </div>)
}

export default MapPoint
