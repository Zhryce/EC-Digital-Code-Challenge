import { useContext, useEffect } from "react";
import { Context } from "./context/ContextWrapper";
import "./App.scss";
import { ObserverHook } from "./hooks/ObserverHook/ObserverHook";
import Telephone from "./components/Inputs/Telephone/Telephone";
import TextArea from "./components/Inputs/TextArea/TextArea";
import Success from "./components/Success/Success";
import CountryStateProvince from "./components/Inputs/CountryStateProvince/CountryStateProvince";
import Validations from "./components/Validations/Validations";
import Submit from "./components/Submit/Submit";
import Name from "./components/Inputs/Name/Name";
import Email from "./components/Inputs/Email/Email";

function App() {
  const { currentValidation, submitted, lastInput } = useContext(Context);

  useEffect(() => {
    /* 
      Focus on name input when page loads,
      then focus on the last input that was focused on when validation changes.
    */
    if (lastInput) {
      const el = document.getElementById(lastInput);
      el?.focus();
    }
  }, [currentValidation, lastInput]);

  return (
    <div className="wrapper">
      {submitted ? null : (
        <header className="validations_types">
          <Validations />
        </header>
      )}
      {submitted ? (
        <Success />
      ) : (
        <ObserverHook
          instantShow
          fullWidth
          inheritedClassName={"form_container"}
        >
          <form action="" className="form_container">
            <Name />
            <Email />
            <Telephone />
            <CountryStateProvince />
            <TextArea />
            <Submit />
          </form>
        </ObserverHook>
      )}
    </div>
  );
}
export default App;
