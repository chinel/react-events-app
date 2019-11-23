import React from "react";
import GoogleMapReact from "google-map-react";
import { Segment, Icon } from "semantic-ui-react";

const Marker = () => <Icon name="marker" size="big" color="red" />;

const EventDetailedMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 15;
  return (
    <Segment attached="bottom">
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBcM6uLV_zM-23FolzhjeWvKMaRlCTe95M" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng}  />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
