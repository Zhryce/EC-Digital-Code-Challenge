/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../../context/ContextWrapper";
import { validateStrict } from "../../../utils/validations/StrictValidations";
import { validateLoose } from "../../../utils/validations/looseValidations";
import { formatTelephone } from "../../../utils/formatTelephone";
import { useState } from "react";
import InputIcon from "../../InputIcon/InputIcon";

const Telephone = () => {
  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    currentValidation,
    setLastInput,
  } = useContext(Context);
  const [phoneMinReached, setPhoneMinReached] = useState(false);
  const handleChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    // 414-777-5555 will be change to 4147775555 (numeric values only)
    // Update the state with the numeric value
    // setTelephone(numericValue);
    setInputs({ ...inputs, telephone: numericValue });

    if (currentValidation === "strict") {
      validateStrict(event.target.name, numericValue, setErrors);
      return;
    }
    // loose validation
    if (numericValue.length >= 10) setPhoneMinReached(true);
    validateLoose(event.target.name, numericValue, setErrors, phoneMinReached);
  };

  return (
    <div className="input_col">
      <label htmlFor={"telephone"}>
        Telephone
        <InputIcon
          input={
            currentValidation === "loose" && inputs["telephone"].length < 10
              ? ""
              : inputs["telephone"]
          }
          error={errors["telephone"]}
          min={10}
          validation={currentValidation}
        />
      </label>
      <input
        required
        type="text"
        value={formatTelephone(inputs["telephone"])}
        onChange={handleChange}
        className={`form_input ${errors["telephone"] ? "input_error" : ""}`}
        name="telephone"
        id="telephone"
        title="Please enter a valid telephone number (at least 10 digits)"
        onFocus={() => setLastInput("telephone")}
        inputMode="tel"
      />
      {/* Display an error message if the telephone number is invalid */}
      {errors["telephone"] && (
        <span className="error">{errors["telephone"]}</span>
      )}
    </div>
  );
};

export default Telephone;
