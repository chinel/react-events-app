import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired("displayName"), //this is the default if you don;t want to specify your custom message
  email: isRequired('email'),//we will not need to validate if its an email as firebase already provides email validation on registration
  password: isRequired('password')
})

const RegisterForm = ({handleSubmit, registerUser, invalid, submitting, error}) => {  // after adding the validate to redux form we have to bring in invalid and submitting props passed down from redux form to disable the button if there is an error, the error is from the registerUser action try catch error
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
             {error && <Label basic color="red">{error}</Label>}
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>
          <Divider horizontal>Or</Divider>
              <SocialLogin/> {/*Here the social login still shown login because the idea is to allow the user to register and login at the same time */}
              
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form:'registerForm', validate})(RegisterForm));