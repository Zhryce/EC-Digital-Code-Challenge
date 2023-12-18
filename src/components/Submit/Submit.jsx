/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../context/ContextWrapper";
import { ObserverHook } from "../../hooks/ObserverHook/ObserverHook";
import { Spinner } from "../Spinner/Spinner";
import "./Submit.scss";

const Submit = () => {
  const { handleSubmit, isLoading, isError } = useContext(Context);
  return (
    <ObserverHook>
      <div className="submit_col">
        <div className="button_wrapper_row">
          <button
            className={`submit_button`}
            onClick={handleSubmit}
            // disable the button if the form is loading or if there's an error
            disabled={isLoading || isError}
            // disable the cursor if the form is loading or if there's an error
            style={isError || isLoading ? { cursor: "not-allowed" } : {}}
          >
            SEND MESSAGE
          </button>
          {isLoading ? <Spinner /> : null}
          {/* <Spinner /> */}
        </div>
        <span style={isError ? { color: "red" } : {}}>
          {isError ? "Please fix errors" : null}
        </span>
      </div>
    </ObserverHook>
  );
};

export default Submit;
