import React from 'react'
import { Form, Label } from 'semantic-ui-react';

const TextArea = ({input, type, rows, placeholder, meta:{error, touched} }) => {
    return (
        <Form.Field error={touched && !!error}>
            <textarea {...input} rows={rows} placeholder={placeholder}></textarea>
            {touched &&  error && <Label basic color="red">{error}</Label>}
        </Form.Field>
    )
}

export default TextArea
