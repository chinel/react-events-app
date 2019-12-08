import React from 'react'
import { Form, Label } from 'semantic-ui-react';

const TextInput = ({input, type, placeholder, width, meta : {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error} width={width}> {/*this shows the error if the field was touched and there is an error*/}
            <input 
            {...input} type={type} placeholder={placeholder}  /> {/* the spead operator with the input props takes the value of the input from the form*/}
            {touched && error && <Label basic color="red">{error}</Label>} {/* this shows the label if there is an error and the field was touched*/}
            
        </Form.Field>
    )
}

export default TextInput
