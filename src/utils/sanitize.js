/**
 *
 * @param {React.Dispatch<React.SetStateAction<{}>>} setInputs the state setter for the inputs state
 * @param {React.Dispatch<React.SetStateAction<<{}>>} setErrors the state setter for the errors state
 * @returns {void}
 * @description sets the inputs and errors state to empty strings, effectively clearing the form
 */
export const sanitize = (setInputs, setErrors) => {
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
};
