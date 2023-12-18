/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import "./ObserverHook.scss";

/*
  This hook is used to smoothly show an element when it's visible on the screen,
  elements wrapped with this hook will have such behavior. It uses the Intersection Observer API to detect when the element is visible. and how much of it is visible. It has multiple options to customize the behavior of the element.
*/
export const ObserverHook = ({
  children,
  instantShow, // Show the element on page load
  reHide, // Hide the element when it's not visible, so it can be shown again
  fullWidth, // Set the width of the element to 100%
  isColumn, // Set the flex-direction to column
  isRow, // Set the flex-direction to row
  inheritedClassName, // Add a class to the element
  centerRow,
  centerColumn,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // if the element is visible or instantShow is true, add the class to show the element
          if (entry.isIntersecting || instantShow) {
            if (entry.intersectionRatio >= 0.35 || instantShow)
              entry.target.classList.add("observer_show");
          } else if (reHide) {
            // if the element is not visible and reHide is true, remove the class to hide the element
            if (entry.intersectionRatio <= 0)
              entry.target.classList.remove("observer_show");
          }
        });
      },
      {
        // this is the percentages of the element that needs to be visible to trigger the observer, running the callback function above.
        threshold: [0, 0.35],
      }
    );
    observer.observe(currentRef);
    return () => {
      observer.unobserve(currentRef);
    };
  }, []);
  return (
    <div
      ref={ref}
      // classes are added depending on the options passed to the hook
      className={`observer_hide ${isColumn ? "observer_column" : ""} ${
        isRow ? "observer_row" : ""
      } ${inheritedClassName ? inheritedClassName : ""}
      ${centerRow ? "observer_center_row" : ""}
      ${centerColumn ? "observer_center_column" : ""}
      `}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      {/* Element(s) we are wrapping/observing */}
      {children}
    </div>
  );
};
