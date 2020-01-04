import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
/* import Script  from "react-load-script"; */
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { incrementAsync, decrementAsync, testPermission } from "../testarea/testActions";
import GoogleMapReact from 'google-map-react';
import {  openModal} from '../modals/modalActions';

const mapState = state => ({
  data: state.test.data, // the test represents the test reducer and the data is from the test reducer
  loading: state.test.loading
});

const actions = {
  //this can be called any name here its called action and we need to let the component that will be using this action know abou the actions
  incrementAsync,
  decrementAsync,
  openModal,
  testPermission
};

const Marker = () => <Icon name="marker" size="big" color="red"/>

class TestComponent extends Component {
  static defaultProps = {  // This is a way of passing default props to a component that are not passed down from parents
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
       address: "",
    scriptLoaded : false
};
 
 handleScriptLoad = () => {
  this.setState({
      scriptLoaded: true
  })
 }

 handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }


  onChange = (address) => this.setState({ address })

  render() {
    const { incrementAsync, decrementAsync, data, openModal, loading, testPermission} = this.props;
    const inputProps = {
        value: this.state.address,
        onChange: this.onChange,
      }
    return (
      <div>
         {/*  <Script
          url="https://maps.googleapis.com/maps/api/js?key=YourKey&libraries=places"
         onLoad={this.handleScriptLoad/*this event handler is used to check if the script has loaded this can be used to ensure that places autocomplete component is shown on the page so as to prevent error 
         /> The reason for commenting this out is because when you view the component the map does not show, the only thing you can probably see is google map api has been called multiple times so commenting this out, uses the one google map react version below */}
        <h1>Test Component</h1>
        <p>The answer is {data}</p>
        <Button loading={loading} onClick={incrementAsync} color="green" content="Increment" /> 
        <Button loading={loading} onClick={decrementAsync} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal" />
        <Button onClick={testPermission} color="teal" content="Test Permission" />
        <br/><br/>
        
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded &&<PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBcM6uLV_zM-23FolzhjeWvKMaRlCTe95M' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
        
       </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
