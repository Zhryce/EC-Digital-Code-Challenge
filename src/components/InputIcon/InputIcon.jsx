/* eslint-disable react/prop-types */
import "./InputIcon.scss";
import { emailValidation } from "../../utils/validations/StrictValidations";

/*
  Mainly for accessibility, because not everyone can easily distinguish colors,
  this component will display an icon to the right of the input's label.
  If the input is valid, a check will be displayed.
  If the input is invalid, an x will be displayed.
  If validation is loose, and the input is less than the minimum required,
  no icon will be displayed, unless the min is reached, and the user deletes characters, going below the min. 
  High reusability, because it can be used for any input field.
*/
const InputIcon = ({ input, error, min = 0, validation, email = false }) => {
  return (
    <>
      {error ? (
        <img
          src="/x-mark.png"
          alt="x mark, signifying incorrect input data"
          className={`input_icon error_icon`}
        />
      ) : // If input is less than the minimum, and validation is loose, don't show icon, unless submitted
      min && validation === "loose" && input.length < min ? null : email && // if email is true, validation is loose, and email is invalid, don't show icon, unless submitted
        validation === "loose" &&
        emailValidation(input) ? null : input ? (
        <img
          src="/checked.png"
          alt="check signifying correct input data"
          className={`input_icon`}
        />
      ) : null}
    </>
  );
};

export default InputIcon;
