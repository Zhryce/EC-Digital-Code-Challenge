/* Function to format the telephone number as XXX-XXX-XXXX
    could be used by different components
 */
export const formatTelephone = (value) => {
  //
  return value.replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, (match, p1, p2, p3) => {
    let result = p1; // first 3 digits
    if (p2) result += `-${p2}`; // add dash if there are more digits
    if (p3) result += `-${p3}`; // add dash if there are more digits
    return result;
  });
};
