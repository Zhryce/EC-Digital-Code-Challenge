/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { sanitize } from "../utils/sanitize";
import { validateLoose } from "../utils/validations/looseValidations";
import {
  validateAllStrict,
  validateStrict,
} from "../utils/validations/StrictValidations";

export const Context = createContext(null);
/**
 * Global state wrapper for the entire application, so that we can access the state * from any component
 */
export const ContextWrapper = ({ children }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    telephone: "",
    country: "",
    state: "",
    province: "",
    additional: "",
  });

  const [currentValidation, setCurrentValidation] = useState("strict");
  const [isLoading, setIsLoading] = useState(false);
  const [nameMinReached, setNameMinReached] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finalInputs, setFinalInputs] = useState({});
  const [lastInput, setLastInput] = useState("name");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    telephone: "",
    country: "",
    state: "",
    province: "",
    additional: "",
  });

  const isError =
    errors.name ||
    errors.email ||
    errors.message ||
    errors.telephone ||
    errors.country ||
    errors.state ||
    errors.province ||
    errors.additional;

  // update the state with the input value, and validate it
  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    if (currentValidation === "strict") {
      validateStrict(
        event.target.name,
        event.target.value,
        setErrors,
        event.target.name === "country" ? event.target.value : inputs["country"]
      );
      return;
    }
    console.log(`loose validation for ${event.target.name}`);
    if (event.target.name === "name") {
      if (event.target.value.length >= 3) setNameMinReached(true);
      validateLoose(
        event.target.name,
        event.target.value,
        setErrors,
        nameMinReached
      );
    } else {
      validateLoose(event.target.name, event.target.value, setErrors, false);
    }
  };

  // change the validation type, and reset the errors
  const changeValidation = (e) => {
    setCurrentValidation(e.target.name);
    setErrors({
      name: "",
      email: "",
      telephone: "",
      country: "",
      state: "",
      province: "",
      additional: "",
    });
  };

  // submit the form, and show the loading spinner
  const handleSubmit = (event) => {
    event.preventDefault();
    // validate all inputs -> show errors if any
    const error = validateAllStrict(inputs, setErrors);
    if (error || isError) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFinalInputs({ ...inputs });
      setSubmitted(true);
      sanitize(setInputs, setErrors);
    }, 1000);
  };

  // reset the form, after submission
  const handleReset = () => {
    setSubmitted(false);
    setFinalInputs({});
    setInputs({
      name: "",
      email: "",
      telephone: "",
      country: "",
      state: "",
      province: "",
      additional: "",
    });
    setErrors({
      name: "",
      email: "",
      telephone: "",
      country: "",
      state: "",
      province: "",
      additional: "",
    });
    setLastInput("name");
  };

  return (
    <Context.Provider
      value={{
        inputs,
        setInputs,
        currentValidation, // loose or strict
        setCurrentValidation, // set to loose or strict
        isLoading, // for the loading spinner
        setIsLoading, // set to true or false
        nameMinReached,
        setNameMinReached,
        submitted,
        setSubmitted,
        finalInputs,
        setFinalInputs,
        errors,
        isError,
        setErrors,
        handleInputChange,
        handleSubmit,
        changeValidation,
        lastInput, // for the last input that was focused
        setLastInput,
        handleReset,
      }}
    >
      {children}
    </Context.Provider>
  );
};
