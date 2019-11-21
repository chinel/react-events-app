import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import Script  from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { incrementCounter, decrementCounter } from "../testarea/testActions";

const mapState = state => ({
  data: state.test.data // the test represents the test reducer and the data is from the test reducer
});

const actions = {
  //this can be called any name here its called action and we need to let the component that will be using this action know abou the actions
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
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
    const { incrementCounter, decrementCounter, data } = this.props;
    const inputProps = {
        value: this.state.address,
        onChange: this.onChange,
      }
    return (
      <div>
          <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcM6uLV_zM-23FolzhjeWvKMaRlCTe95M&libraries=places"
         onLoad={this.handleScriptLoad/*this event handler is used to check if the script has loaded this can be used to ensure that places autocomplete component is shown on the page so as to prevent error*/} 
         />
        <h1>Test Component</h1>
        <p>The answer is {data}</p>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />

        <br/><br/>
        
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded &&<PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>
        
       </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
