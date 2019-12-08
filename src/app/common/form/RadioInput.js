import React from 'react'
import { Form } from 'semantic-ui-react';

const RadioInput = ({input, type, label,width}) => {
    return (
        <Form.Field>
            <div className="ui radio">
               <input {...input} type={type}/>{' '}{/*The first curly brackets with string that has an empty space is used to add a space in react */}
            <label>{label}</label>
            </div>
        </Form.Field>
    )
}

export default RadioInput
