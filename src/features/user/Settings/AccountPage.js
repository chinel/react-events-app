import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {combineValidators, composeValidators, matchesField, isRequired} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
    newPassword1: isRequired({message: 'Please enter a password'}),
    newPassword2: composeValidators(
        isRequired({message: "Please confirm your new password"}),
        matchesField('namePassword1')({message: 'Passwords do not match'})
    )() //note whenever you are using composeValidators you have to ensure you add this () at the end to execute it,else it won;t work
});

const Account = ({ error , invalid, submitting}) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      <div>
        <Header color="teal" sub content="Change password" />
        <p>Use this form to update your account settings</p>
        <Form>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={TextInput}
            placeholder="Confirm Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Divider />
          <Button disabled={invalid || submitting} size="large" positive content="Update Password" />
        </Form>
      </div>

      <div>
        <Header color="teal" sub content="Facebook Account" />
        <p>Please visit Facebook to update your account settings</p>
        <Button type="button" color="facebook">
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>

      <div>
        <Header color="teal" sub content="Google Account" />
        <p>Please visit Google to update your account settings</p>
        <Button type="button" color="google plus">
          <Icon name="google plus" />
          Go to Google
        </Button>
      </div>
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate})(Account);