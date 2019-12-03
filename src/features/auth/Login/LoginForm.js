 import React from 'react';
 import { connect } from 'react-redux';
 import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
 import { Field, reduxForm} from 'redux-form';
 import TextInput from '../../../app/common/form/TextInput';
 import {login} from '../authActions';
 import SocialLogin from '../SocialLogin/SocialLogin';
 



 const actions = {
   login
 }

 const LoginForm = ({login, handleSubmit/*The login is from the actions and since we are using reduxForm the we have access to the handleSubmit method from redux form so we will be using it as well */, error /*The error is from redux formss */}) => {
   return (
     <Form size="large" onSubmit={handleSubmit(login)}>
       <Segment>
         <Field
           name="email"
           component={TextInput}
           type="text"
           placeholder="Email Address"
         />
         <Field
           name="password"
           component={TextInput}
           type="password"
           placeholder="password"
         />
         
         <Divider horizontal>
           Or
         </Divider>
         <SocialLogin/>
         {error && <Label basic color="red">{error}</Label>}
         <Button fluid size="large" color="teal">
           Login
         </Button>
       </Segment>
     </Form>
   );
 };
 
 export default connect(null,actions)(reduxForm({form: 'loginForm'})(LoginForm));//To make this form a redux form we had to bring in reduxForm Higher order function from redux form