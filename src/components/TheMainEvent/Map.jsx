import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer, 
  InfoWindow
} from "react-google-maps";
require("dotenv").config();

// Helpers
//--------- === NEED MODIFICATION AND API KEY UPGRADE -------------------------- //
const onChangeHandler = (directionService, directionsDisplay, activity) => {
  calcAndDsiplayRoute(directionService, directionsDisplay, activity)
}
const calcAndDsiplayRoute = (directionService, directionsDisplay, activity) => {
  directionService.route({
    origin: new window.google.maps.LatLng(-8.63113460, 115.19047540),
    destination: new window.google.maps.LatLng(-8.66958900, 115.25662500),
    travelMode: 'DRIVING'
  }, (response, status)=> {
    if (status === 'OK') {
      console.log(response)
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Failed ' + status)
    }
  });
};


const Map = props => {
  let activityData = props.activities;
  let friendActivityData = props.friendAct;
  let initialCenter = props.initialCenter;

  const [selectedActivity, setSelectedActivity] = useState(null);
  if (initialCenter.length === 0) {
    return "NO MAP FOUND";
  } else {

    // const directionService = new window.google.maps.DirectionsService();    // <=== NEED API KEY UPGRADE
    // const directionsDisplay = new window.google.maps.DirectionsRenderer();  // <=== NEED API KEY UPGRADE

    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{
          lat: Number(initialCenter[0].lat),
          lng: Number(initialCenter[0].long)
        }}
      >
        {activityData.map(activity => {
          let animation = null;
          if (props.hoverActivity === activity.id) {
            animation = window.google.maps.Animation.BOUNCE;
          } else if (props.latestActivity === activity.id) {
            animation = window.google.maps.Animation.DROP;
          }
          return (
            <Marker
            key={activity.id}
            animation={animation}
            position={{
              lat: Number(activity.lat),
              lng: Number(activity.long)
            }}
            onClick={() => {
              setSelectedActivity(activity);
              // onChangeHandler(directionService, directionsDisplay, activity)  // <=== NEED MODIFICATION AND API KEY UPGRADE
              }}
            />
          );
        })}
        {friendActivityData &&
          friendActivityData.map(activity => {
            return (
              <Marker
                key={activity.id}
                position={{
                  lat: Number(activity.lat),
                  lng: Number(activity.long)
                }}
                icon={{
                  url:
                    "https://media2.giphy.com/media/QONXjFYXGcOgOAWFeb/source.gif",
                  scaledSize: { width: 40, height: 40 }
                }}
                onClick={() => {
                  setSelectedActivity(activity);
                }}
              />
            );
          })}
        {selectedActivity && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedActivity(null);
            }}
            position={{
              lat: Number(selectedActivity.lat),
              lng: Number(selectedActivity.long)
            }}
          >
            <div>
              <h5>{selectedActivity.name}</h5>
              <img
                height="80px"
                width="100px"
                src={selectedActivity.image_url}
                alt='activity_detail'
              />
              <p>🌟🌟🌟🌟🌟</p>
              <p style={{ wordWrap: "break-word", maxWidth: "100px" }}>
                Hello. This is going to be the review.
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
};
const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function GMap(props) {
  const mapUrl = process.env.REACT_APP_GMAPURL;
  const mapApiKey = process.env.REACT_APP_GMAPKey;
  return (
    <div className="g-map">
      <MapWrapped
        googleMapURL={`${mapUrl}=${mapApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={
          <div
            style={{
              height: `100%`,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          />
        }
        activities={props.activities}
        activityItem={props.columns}
        initialCenter={props.initialCenter}
        hoverActivity={props.hoverActivity}
        latestActivity={props.latestActivity}
        friendAct={props.friendActivities}
      />
    </div>
  );
}
