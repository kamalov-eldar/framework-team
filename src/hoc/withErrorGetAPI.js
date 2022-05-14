import { useState } from "react";

//export default function MyComponent() {

/* const HOC = (WC) => {
  const MyComp = (props) => {
    return <WC {...props} />;
  };
  MyComp.displayName = "test";
  return MyComp;
}; */

export const withErrorGetAPI = (View) => {
  const MyComp = (props) => {
    const [errorGetAPI, setErrorGetAPI] = useState(false);
    return (
      <>
        {errorGetAPI ? <h2>Error getting data from server </h2> : <View setErrorGetAPI={setErrorGetAPI} {...props} />}
      </>
    );
  };
  MyComp.displayName = "withErrorGetAPI";
  return MyComp;
};
