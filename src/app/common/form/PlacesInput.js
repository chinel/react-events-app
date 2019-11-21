import React, { Component } from "react";
import Script from "react-load-script";
import { Form, Label } from "semantic-ui-react";
import  PlacesAutocomplete  from "react-places-autocomplete";

const styles = {
  autocompleteContainer:{
    zIndex: 1000
  }
}

class PlacesInput extends Component {
  state = {
    scriptLoaded: false
  };

  handleScriptLoaded = () => {this.setState({ scriptLoaded: true });};
  

  render() {
    const {
      input,
      onSelect,
      placeholder,
      width,
      options,
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcM6uLV_zM-23FolzhjeWvKMaRlCTe95M&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {/*The onLoad event handler is used to check if the script has loaded this can be used to ensure that places autocomplete component is shown on the page so as to prevent error*/}
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            onSelect={onSelect}
            inputProps={{ ...input , placeholder}}
            options={options}
            styles={styles}
          />
        )}
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default PlacesInput;


