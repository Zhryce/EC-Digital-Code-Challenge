import { useContext } from "react";
import { Context } from "../../../context/ContextWrapper";
import { validateStrict } from "../../../utils/validations/StrictValidations";
import { validateLoose } from "../../../utils/validations/looseValidations";
import InputIcon from "../../InputIcon/InputIcon";
import "./TextArea.scss";

/* eslint-disable react/prop-types */
const TextArea = () => {
  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    currentValidation,
    setLastInput,
  } = useContext(Context);

  // Make the textarea grow as the user types, to fit the content
  const setInputHeight = (event, defaultHeight) => {
    const target = event.target;
    if (target) {
      target.style.height = defaultHeight;
      target.style.height = `${target.scrollHeight + 10}px`;
    }
  };

  // update the state with the input value, and validate it
  const handleChange = (event) => {
    setInputs({ ...inputs, additional: event.target.value });
    if (currentValidation === "strict") {
      validateStrict(event.target.name, event.target.value, setErrors);
      return;
    }
    validateLoose(event.target.name, event.target.value, setErrors);
  };
  return (
    <div className="text_area_wrapper">
      <label htmlFor="additional" className="form_label">
        Additional Details
        <InputIcon input={inputs["additional"]} error={errors["additional"]} />
      </label>
      <textarea
        required
        className={`form_input text_area ${
          errors["additional"] ? "input_error" : ""
        }`}
        name="additional"
        id="additional"
        placeholder="Enter your message"
        value={inputs["additional"]}
        onChange={(event) => {
          setInputHeight(event, "100px");
          handleChange(event);
        }}
        title="Please enter a message"
        onFocus={() => setLastInput("additional")}
      />

      {errors["additional"] && (
        <span className="error">{errors["additional"]}</span>
      )}
    </div>
  );
};

export default TextArea;
