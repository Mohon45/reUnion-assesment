import React, { CSSProperties } from "react";
import { HashLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <div style={{ height: "80vh" }}>
      <HashLoader
        color="blue"
        loading={true}
        cssOverride={override}
        size={50}
      />
    </div>
  );
};

export default Loader;
