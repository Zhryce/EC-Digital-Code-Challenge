/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../../context/ContextWrapper";
import { ObserverHook } from "../../../hooks/ObserverHook/ObserverHook";
import getProvinces from "../../../utils/StatesProvinces/getProvinces";
import getStates from "../../../utils/StatesProvinces/getStates";
import {
  stateValidation,
  provinceValidation,
} from "../../../utils/validations/StrictValidations";
import InputIcon from "../../InputIcon/InputIcon";
import "./CountryStateProvince.scss";

// get all provinces and states
const provinces = getProvinces();
const states = getStates();

const CountryStateProvince = () => {
  // get values and functions from the Context
  const {
    inputs,
    errors,
    setErrors,
    handleInputChange,
    currentValidation,
    setLastInput,
  } = useContext(Context);

  /* 
  remove errors from the other country input when the user changes the country.
  If the current validation is strict, validate the new country's input
  */
  const handleCountryChange = (event) => {
    if (event.target.value === "US") {
      setErrors({
        ...errors,
        province: "",
        state:
          currentValidation === "strict"
            ? stateValidation(inputs["state"], "US")
            : "",
      });
    } else if (event.target.value === "Canada") {
      setErrors({
        ...errors,
        state: "",
        province:
          currentValidation === "strict"
            ? provinceValidation(inputs["province"], "Canada")
            : "",
      });
    }
  };
  return (
    <>
      <div className="country_wrapper">
        {/* radio for country: US or Canada */}
        <span className="country_title">Country</span>
        <div className="country_row">
          <label htmlFor="us">
            US
            <input
              type="radio"
              name="country"
              id="us"
              value="US"
              onChange={(e) => {
                handleCountryChange(e);
                handleInputChange(e);
              }}
              title="Click to select US as your country"
              onFocus={() => setLastInput("us")}
            />
          </label>
          <label htmlFor="canada">
            Canada
            <input
              type="radio"
              name="country"
              id="canada"
              value="Canada"
              onChange={(e) => {
                handleCountryChange(e);
                handleInputChange(e);
              }}
              title="Click to select Canada as your country"
              onFocus={() => setLastInput("canada")}
            />
          </label>
          <InputIcon input={inputs["country"]} error={errors["country"]} />
        </div>
        <span className="error">{errors["country"]}</span>
      </div>

      {/* 
        Show the select for the state or province depending on the country selected
      */}
      {inputs["country"] === "US" ? (
        <ObserverHook fullWidth>
          <div className="input_col">
            <label htmlFor={"state"}>
              State
              <InputIcon input={inputs["state"]} error={errors["state"]} />
            </label>
            {/* select with all States */}
            <select
              required={inputs["country"] === "US"}
              name="state"
              id="state"
              value={inputs["state"]}
              onChange={handleInputChange}
              title="Select a state"
              onFocus={() => setLastInput("state")}
            >
              {/* Default, with no value */}
              <option value="">Select a state</option>
              {states.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </select>

            <span className="error">{errors["state"]}</span>
          </div>
        </ObserverHook>
      ) : inputs["country"] === "Canada" ? (
        <ObserverHook fullWidth>
          <div className="input_col">
            <label htmlFor={"province"}>
              Province
              <InputIcon
                input={inputs["province"]}
                error={errors["province"]}
              />
            </label>
            {/* select with all Provinces */}
            <select
              required={inputs["country"] === "Canada"}
              name="province"
              id="province"
              value={inputs["province"]}
              onChange={handleInputChange}
              title="Select a province"
              onFocus={() => setLastInput("province")}
            >
              {/* Default, with no value */}
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option value={province} key={province}>
                  {province}
                </option>
              ))}
            </select>

            <span className="error">{errors["province"]}</span>
          </div>
        </ObserverHook>
      ) : null}
    </>
  );
};

export default CountryStateProvince;
