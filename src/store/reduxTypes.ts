/**
 * This creates action types that are namespaced; it doesn't do much, but
 * in a large application, having something distinguish between, say
 * "frequentFlyerMiles.INCREMENT" and
 * "bankBalance.INCREMENT" can be a lifesaver.
 * It also makes the redux logs easier to read.
 */

export const createActionTypes = (
  ns: string,
  ...terms: string[]
): { [key: string]: string } => {
  const aTypes: { [key: string]: string } = {};
  terms.forEach((term: string) => {
    aTypes[term] = `${ns}.${term}`;
  });
  return aTypes;
};

const actionTypes = {
  photos: createActionTypes(
    "photos",
    "LOAD_PHOTOS",
    "SET_LOADING",
  )
};

export default actionTypes;
