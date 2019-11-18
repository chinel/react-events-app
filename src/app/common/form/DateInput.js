import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateInput = ({
  input: { value, onChange, ...restInput },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  //the ...rest is used to add everyother props not added including the ones from the Datepicker component, it mustn't be called rest it can be anyother name
  return (
    <Form.Field width={width} error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder} // for the Date picker component the placeholder attribute is called placeholderText
        selected={value ? moment(value) : null} //Here we formatted the date input value to a moment object
        onChange={
          onChange /* we no longer need to use input.onChange since it is destructured*/
        }
        {...restInput/*use the spread operator to get the rest of the input props allows revalidation to properly work*/}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
