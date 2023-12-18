// each validation returns a string, either with the error message or empty string if the validation is passed

/*
  @param {string} name - user's name
  @param {boolean} passedMin - true if the user reached the minimum number of characters at least once
*/
const nameValidation = (name, passedMin) => {
  if (name.length < 1) {
    return "Name is required";
  }
  if (passedMin && name.length < 3) {
    return "Name must be at least 3 characters long";
  }
  return "";
};
const emailValidation = (email) => {
  if (email.length < 1) {
    return "Email is required";
  }
  return "";
};
/*
  only show error if the user reached the minimum number of characters, but then deleted characters to be less than the minimum
  @param {string} telephone - the telephone number
  @param {boolean} passedMin - true if the user reached the minimum number of characters at least once
 */
const telephoneValidation = (telephone, passedMin) => {
  if (telephone.length < 1) {
    return "Telephone number is required";
  }
  if (passedMin && telephone.length < 10) {
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
const stateValidation = (state, country) => {
  if (!state && country === "United States") {
    return "State is required";
  }
  return "";
};
const provinceValidation = (province, country) => {
  if (!province && country === "Canada") {
    return "Province is required";
  }
  return "";
};
const additionalValidation = (additional) => {
  if (additional.length < 1) {
    return "Additional information required";
  }
  return "";
};

/*
  @param {string} input - the input field that is being validated
  @param {string} value - the value of the input field
  @param {function} setErrors - function to set the errors in the state
  @param {boolean} passedMin - true if the user reached the minimum number of characters at least once
*/
export const validateLoose = (input, value, setErrors, passedMin = true) => {
  switch (input) {
    case "name":
      setErrors((prev) => ({
        ...prev,
        name: nameValidation(value, passedMin),
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
        telephone: telephoneValidation(value, passedMin),
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
        state: stateValidation(value),
      }));
      break;
    case "province":
      setErrors((prev) => ({
        ...prev,
        province: provinceValidation(value),
      }));
      break;
    default:
      break;
  }
};
