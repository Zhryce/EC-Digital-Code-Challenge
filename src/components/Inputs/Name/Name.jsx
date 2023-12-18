import { useContext } from "react";
import { Context } from "../../../context/ContextWrapper";
import InputIcon from "../../InputIcon/InputIcon";

const Name = () => {
  const { handleInputChange, inputs, errors, currentValidation, setLastInput } =
    useContext(Context);
  return (
    <div className="input_col">
      <label htmlFor={"name"}>Name</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={inputs["name"]}
        onChange={handleInputChange}
        className={`form_input ${errors["name"] ? "input_error" : ""}`}
        title="Please enter a name with at least 3 characters"
        onFocus={() => setLastInput("name")}
      />
      <InputIcon
        input={inputs["name"]}
        error={errors["name"]}
        validation={currentValidation}
        min={3}
      />
      <span className="error">{errors["name"]}</span>
    </div>
  );
};

export default Name;
