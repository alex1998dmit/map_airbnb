import { Container, Grid } from '@material-ui/core'
import * as React from 'react'
import ApartmentCard from './ApartmentCard'

type Props = {
  apartments: any
}

const CardsPanel = (props: Props) => {
  return (
    <Container>
      <Grid container spacing={1}>
        {props.apartments.map((apartment: any) => (
          <Grid item xs={3} key={apartment.id}>
            <ApartmentCard
              image={apartment.image}
              address={apartment.address}
              area={apartment.area}
              rooms_number={apartment.rooms_number}
              floor={apartment.floor}
              floor_count={apartment.floor_count}
              rent={apartment.rent}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CardsPanel
