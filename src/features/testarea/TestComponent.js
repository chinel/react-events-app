import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import {  connect} from 'react-redux';
import {  incrementCounter, decrementCounter} from '../testarea/testActions';

const mapState = (state) => ({
    data: state.test.data   // the test represents the test reducer and the data is from the test reducer
})

const actions = {   //this can be called any name here its called action and we need to let the component that will be using this action know abou the actions
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    render() {
        const  {incrementCounter, decrementCounter, data} = this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <p>The answer is {data}</p>
                 <Button onClick={incrementCounter} color="green" content="Increment"/>
                 <Button onClick={decrementCounter} color="red" content="Decrement"/>
            </div>
        )
    }
}

export default connect(mapState, actions)(TestComponent);
