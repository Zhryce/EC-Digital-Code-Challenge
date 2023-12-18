/* eslint-disable no-useless-escape */
// each validation returns a string, either with the error message or empty string if the validation is passed

export const nameValidation = (name) => {
  if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }
  return "";
};
export const emailValidation = (email) => {
  if (email.length < 1) {
    return "Email is required";
  }
  // allows all characters, and requires an email prefix, @, and domain with at least 2 characters
  if (!email.match(/^.+@.+\..{2,}$/)) {
    return "Invalid email";
  }
  return "";
};
export const telephoneValidation = (telephone) => {
  if (telephone.length < 1) {
    return "Telephone number is required";
  }
  if (telephone.length < 10) {
    return "Telephone must be at least 10 digits long";
  }
  return "";
};
const countryValidation = (country) => {
  if (!country) {
    return "Country is required";
  }
  return "";
};
export const stateValidation = (state, country) => {
  if (!state && country === "US") {
    return "State is required";
  }
  return "";
};
export const provinceValidation = (province, country) => {
  if (!province && country === "Canada") {
    return "Province is required";
  }
  return "";
};
export const additionalValidation = (additional) => {
  if (additional.length < 1) {
    return "Additional information required";
  }
  return "";
};

/**
 * @param {string} input the name/id of the input that was changed
 * @param {string} value the value of the input that was changed
 * @param {React.Dispatch<React.SetStateAction<{}>>} setErrors  the state setter for the errors state
 * @param {string} country the value of the country input
 * @returns {void}
 * @description calls the appropriate validation function based on the input that was changed
 */
export const validateStrict = (input, value, setErrors, country) => {
  switch (input) {
    case "name":
      setErrors((prev) => ({
        ...prev,
        name: nameValidation(value),
      }));
      break;
    case "email":
      setErrors((prev) => ({
        ...prev,
        email: emailValidation(value),
      }));
      break;
    case "telephone":
      setErrors((prev) => ({
        ...prev,
        telephone: telephoneValidation(value),
      }));
      break;
    case "additional":
      setErrors((prev) => ({
        ...prev,
        additional: additionalValidation(value),
      }));
      break;
    case "country":
      setErrors((prev) => ({
        ...prev,
        country: countryValidation(value),
      }));
      break;
    case "state":
      setErrors((prev) => ({
        ...prev,
        state: stateValidation(value, country),
      }));
      break;
    case "province":
      setErrors((prev) => ({
        ...prev,
        province: provinceValidation(value, country),
      }));
      break;
    default:
      break;
  }
};

// on submit, validate all fields by calling each validation function. If any of the functions return an error message, set the error state to that message and return true. If all validations pass, return false
export const validateAllStrict = (values, setErrors) => {
  const { name, email, telephone, country, state, province, additional } =
    values;
  let isError = false;
  const nameError = nameValidation(name);
  const emailError = emailValidation(email);
  const telephoneError = telephoneValidation(telephone);
  const countryError = countryValidation(country);
  const stateError = stateValidation(state, country);
  const provinceError = provinceValidation(province, country);
  const additionalError = additionalValidation(additional);
  setErrors((prev) => ({
    ...prev,
    name: nameError,
    email: emailError,
    telephone: telephoneError,
    country: countryError,
    state: stateError,
    province: provinceError,
    additional: additionalError,
  }));

  if (
    nameError ||
    emailError ||
    telephoneError ||
    additionalError ||
    countryError ||
    stateError ||
    provinceError
  ) {
    isError = true;
  }
  return isError;
};
