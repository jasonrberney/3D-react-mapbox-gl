import React, { Component } from 'react';
//import { Map } from 'mapbox-gl';
//import { accessToken } from './token';
import PropTypes from 'prop-types';
//import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from 'mapbox-gl-geocoder';
//import { MapboxGeocoder } from 'mapbox-gl';

class Geocoder extends Component {
    constructor(props) {
        super(props)
    }
    //TYPESCRIPT
  //static contextTypes = { map: PropTypes.object.isRequired };

//   context: {
//     map: Map;
//   };

  componentDidMount() {
    const { map } = this.context;

    map.addControl(
      new MapboxGeocoder({
        accessToken: "pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZjRoaWZzdTEzaGwyd2xucWRwZjdrZnkifQ.6sggCRKfF9kYMDjy-eDYtg"
      })
    );
  }

  render() {
    return null;
  }

  static contextTypes = {
    map: PropTypes.object.isRequired
  };
}

export default Geocoder;