 import React from 'react';
 import { connect } from 'react-redux';
 import { Form, Segment, Button } from 'semantic-ui-react';
 import { Field, reduxForm} from 'redux-form';
 import TextInput from '../../../app/common/form/TextInput';
 import {login} from '../authActions';
 



 const actions = {
   login
 }

 const LoginForm = ({login, handleSubmit/*The login is from the actions and since we are using reduxForm the we have access to the handleSubmit method from redux form so we will be using it as well */}) => {
   return (
     <Form error size="large" onSubmit={handleSubmit(login)}>
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
         <Button fluid size="large" color="teal">
           Login
         </Button>
       </Segment>
     </Form>
   );
 };
 
 export default connect(null,actions)(reduxForm({form: 'loginForm'})(LoginForm));//To make this form a redux form we had to bring in reduxForm Higher order function from redux form