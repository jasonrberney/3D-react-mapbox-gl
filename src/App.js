// import React, { Component } from 'react';
// import ReactMap from 'react-mapbox-gl';

//const accessToken = "pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2o0MHp2cGtiMGFrajMycG5nbzBuY2pjaiJ9.QDApU0XH2v35viSwQuln5w";
// const style = "mapbox://styles/mapbox/streets-v9";

// const Map = ReactMap({
//   accessToken
// });

// const mapStyle = {
//   height: '100vh',
//   width: '100vw'
// };

// class App extends Component {
//   render() {
//     return (
//       <Map
//         style={style}
//         containerStyle={mapStyle}
//       />
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';
//import * from '../../config/config.json'

// tslint:disable-next-line:no-var-requires
//const { token, styles } = require('./config.json');
//const token = "pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZjRoaWZzdTEzaGwyd2xucWRwZjdrZnkifQ.6sggCRKfF9kYMDjy-eDYtg"
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

// export interface Props {
//   // tslint:disable-next-line:no-any
//   onStyleLoad?: (map: any) => any;
// }

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zoom: [15],
      bearing: [-17.6],
      pitch: [45],
      center: [1.3521, 1.8198]
    }
  }

//   // tslint:disable-next-line:no-any
//   const onStyleLoad = (map: any) => {
//     const { onStyleLoad } = this.props;
//     return onStyleLoad && onStyleLoad(map);
//   };

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
      </Map>
    );
  }
}

export default App;
