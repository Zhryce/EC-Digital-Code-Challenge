/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../../context/ContextWrapper";
import "./Success.scss";
import { ObserverHook } from "../../hooks/ObserverHook/ObserverHook";

// import { formatTelephone } from "../../utils/formatTelephone";

const Success = () => {
  const { handleReset, finalInputs } = useContext(Context);
  return (
    <ObserverHook instantShow fullWidth centerRow>
      <div className="form_submitted">
        <div>
          <h1>Form Submitted</h1>
          <p>
            Thank you for filling out the form, we will contact you as soon as
            possible.
          </p>
          <div className="form_data_wrapper">
            <div>
              <strong>Name:</strong> {finalInputs?.name}
            </div>
            <div>
              <strong>Email:</strong> {finalInputs?.email}
            </div>
            <div>
              <strong>Telephone:</strong> {finalInputs?.telephone}
              {/* unsure if the displayed telephone should be decorated or not so I left the line below in case it should be decorated */}
              {/* {formatTelephone(finalInputs?.telephone)} */}
            </div>
            <div>
              <strong>Country:</strong> {finalInputs?.country}
            </div>
            {/* only show State data if US was chosen */}
            {finalInputs?.country === "US" ? (
              <div>
                <strong>State:</strong> {finalInputs?.state || "N/A"}
              </div>
            ) : null}
            {/* only show Province data if Canada was chosen */}
            {finalInputs?.country === "Canada" ? (
              <div>
                <strong>Province:</strong> {finalInputs?.province || "N/A"}
              </div>
            ) : null}
            <strong>Additional Details:</strong>
            <div>{finalInputs?.additional}</div>
          </div>
        </div>
        <button className="form_reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </ObserverHook>
  );
};

export default Success;
