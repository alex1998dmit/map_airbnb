import { useState } from "react"
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
}

const MapPoint = (props: MapPointProps) => {
  const [opened, setIsOpened] = useState<boolean>(false)
  const handleOnOpen = () => setIsOpened(true)
  const handleOnClose = () => setIsOpened(false)
  
  return opened ?
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
    />
}

export default MapPoint
