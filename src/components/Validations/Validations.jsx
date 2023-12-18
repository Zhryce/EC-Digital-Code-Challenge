/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../context/ContextWrapper";
import { ObserverHook } from "../../hooks/ObserverHook/ObserverHook";
import "./Validations.scss";

// Change the validation type
const Validations = () => {
  const { currentValidation, changeValidation } = useContext(Context);
  return (
    <ObserverHook instantShow isColumn>
      <span>Validations Types: </span>
      <div className="validations_buttons_row">
        <button
          className={`validation_type
    ${currentValidation === "strict" ? "current_validation" : ""}
    `}
          name="strict"
          onClick={changeValidation}
        >
          Strict
        </button>
        <button
          className={`validation_type
    ${currentValidation === "loose" ? "current_validation" : ""}
    `}
          name="loose"
          onClick={changeValidation}
        >
          Loose
        </button>
      </div>
    </ObserverHook>
  );
};

export default Validations;
