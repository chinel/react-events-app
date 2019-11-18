import React from 'react'
import {  Form, Label} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import  'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; 

const DateInput = ({input, width, placeholder, meta: {touched, error}, ...rest}) => { //the ...rest is used to add everyother props not added including the ones from the Datepicker component, it mustn't be called rest it can be anyother name
    return (
        <Form.Field width={width} error={touched && !!error}>
            <DatePicker
             {...rest}
             placeholderText={placeholder} // for the Date picker component the placeholder attribute is called placeholderText
             selected={input.value? moment(input.value) : null} //Here we formatted the date input value to a moment object
             onChange={input.onChange}
            />
            {touched && error && <Label basic color="red">{error}</Label>}
        </Form.Field>
    )
}

export default DateInput
