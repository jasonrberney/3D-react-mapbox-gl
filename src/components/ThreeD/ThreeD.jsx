import React, { Component } from 'react';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';
import Geocoder from '../Geocoder/Geocoder.jsx'

const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZjRoaWZzdTEzaGwyd2xucWRwZjdrZnkifQ.6sggCRKfF9kYMDjy-eDYtg" });

// const mapStyle = {
//   flex: 1
// };
const mapStyle = {
  height: '100vh',
  width: '100vw'
};

const paintLayer = {
  'fill-extrusion-color': '#aaa',
  // 'fill-extrusion-height': {
  //   type: 'identity',
  //   property: 'height'
  // },
  // 'fill-extrusion-base': {
  //   type: 'identity',
  //   property: 'min_height'
  // },
  'fill-extrusion-height': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "height"]
  ],
  'fill-extrusion-base': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "min_height"]
  ],
  'fill-extrusion-opacity': 0.6
};

class ThreeD extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zoom: [14],
      bearing: [-17.6],
      pitch: [45],
      center: [-122.3321, 47.6062]
    }
  }


  render() {
    return (
      <Map
        style={"mapbox://styles/mapbox/streets-v9"}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoad}
        zoom={this.state.zoom}
        center={this.state.center}
        pitch={this.state.pitch}
        bearing={this.state.bearing}
      >
        <Layer
          id="3d-buildings"
          sourceId="composite"
          sourceLayer="building"
          filter={['==', 'extrude', 'true']}
          type="fill-extrusion"
          minZoom={14}
          paint={paintLayer}
        />
        <Geocoder Map={Map} />
      </Map>
    );
  }
}


export default ThreeD;