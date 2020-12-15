import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const Map = ({ location, zoomLevel }) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
    defaultCenter={location}
    defaultZoom={zoomLevel}
  >
    <LocationPin
      lat={location.lat}
      lng={location.lng}
      text={location.address}
    />
  </GoogleMapReact>
);

const LocationPin = (props) => {
  return (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text"> {props.text}</p>
    </div>
  );
};

export default Map;
