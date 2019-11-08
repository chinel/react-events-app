import React, { Component } from 'react';
import {  connect} from 'react-redux';

const mapState = (state) => ({
    data: state.test.data   // the test represents the test reducer and the data is from the test reducer
})

class TestComponent extends Component {
    render() {
        return (
            <div>
                <h1>Test Component</h1>
                <p>The answer is {this.props.data}</p>
            </div>
        )
    }
}

export default connect(mapState)(TestComponent);
