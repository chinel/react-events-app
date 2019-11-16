import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({input, type, placeholder, multiple, options,meta:{touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <Select
            onChange={(e, data) => (input.onChange(data.value))}
            placeholder={placeholder}
            value={input.value || null}
            options={options}
            multiple={multiple}
            />
            {touched && error && <Label basic color="red">{error}</Label>}
        </Form.Field>
    )
}

export default SelectInput
