import React, { ReactElement } from 'react';
import './App.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from './Map'

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};


function App() {
  if (!process.env.REACT_APP_GOOGLE_KEY) {
    return <h2>Need to add google key</h2>
  }
  return (
    <div className="App">
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY} render={render}>
        <Map center={{ lat: 55.753559, lng: 37.609218 }} zoom={11} />
      </Wrapper>
    </div>
  );
}

export default App;
