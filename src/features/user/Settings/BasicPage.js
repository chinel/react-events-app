import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../app/common/form/DateInput";
import PlacesInput from "../../../app/common/form/PlacesInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from '../../../app/common/form/RadioInput';
import moment from 'moment';

class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                        <label>Gender:</label>
                     <Field
                     name="gender"
                     type="radio"
                     component={RadioInput}
                     value="male"
                     label="Male"
                     />
                     <Field
                     name="gender"
                     type="radio"
                     component={RadioInput}
                     value="female"
                     label="Female"
                     />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date of Birth'
                        dateFormat ="YYYY-MM-DD"
                        showYearDropdown = {true}
                        showMonthDropdown={true}
                        dropDownMode="select"
                        maxDate={moment().subtract(18, 'years')}

                    />
                   
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlacesInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile',enableReinitialize: true})(BasicPage);
//here enabling reinitialize to true is used when the form will be used as an edit form or needs to have an initial value set, this makes the value available immediately after the page is refreshed
 /*This is set to only allow people 18 years and higher, am talking of the maxDate and using moment to get support  */