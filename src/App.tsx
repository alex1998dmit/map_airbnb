import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ApartmentsMap from './Map'
import Apartments from './apartments';
import CardsPanel from './Cards';

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

function App() {
  const [filter, setFilter] = useState<'F' | 'C'>('F')
  const freeApartments = useMemo(() => Apartments.filter((el) => el.status === 'F'), Apartments)
  const closedApartments = useMemo(() => Apartments.filter((el) => el.status === 'C'), Apartments)
  const apartments = filter === 'F' ? freeApartments : closedApartments
  const buttonHandle = (type: 'F' | 'C') => setFilter(type)

  if (!process.env.REACT_APP_GOOGLE_KEY) {
    return <h2>Add google key</h2>
  }

  return (
    <div className="App">
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY} render={render}>
        <ApartmentsMap
          center={{ lat: 55.753559, lng: 37.609218 }}
          zoom={11}
          apartments={apartments}
        />
      </Wrapper>
      Status: {filter}
      <button onClick={() => buttonHandle('C')}>show closed</button>
      <button onClick={() => buttonHandle('F')}>show free</button>
      <CardsPanel apartments={apartments} />
    </div>
  );
}

export default App;
