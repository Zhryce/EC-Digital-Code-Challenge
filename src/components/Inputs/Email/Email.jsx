import { useContext } from "react";
import { Context } from "../../../context/ContextWrapper";
import InputIcon from "../../InputIcon/InputIcon";

const Email = () => {
  const { handleInputChange, inputs, errors, currentValidation, setLastInput } =
    useContext(Context);
  return (
    <div className="input_col">
      <label htmlFor={"email"}>Email</label>
      <input
        required
        type="text"
        name="email"
        id="email"
        value={inputs["email"]}
        onChange={handleInputChange}
        className={`form_input ${errors["email"] ? "input_error" : ""}`}
        title="Please enter a valid email address"
        onFocus={() => setLastInput("email")}
        inputMode="email"
      />
      <InputIcon
        input={inputs["email"]}
        error={errors["email"]}
        email={true}
        validation={currentValidation}
      />
      <span className="error">{errors["email"]}</span>
    </div>
  );
};

export default Email;
