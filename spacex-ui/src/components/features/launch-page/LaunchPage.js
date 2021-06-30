import React, { useContext } from "react";
import LoadingSpinner from "../../elem/LoadingSpinner";
import LaunchTable from "./Table/LaunchTable";
import { LaunchContext } from "../../wrappers/LaunchContext";
import Header from "./Header";

const LaunchPage = () => {
  const { launches, loading } = useContext(LaunchContext);

  return (
    <div className="section">
      <Header />
      <div className="gridWrapper section">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <LaunchTable launches={launches ? launches : []} />
        )}
      </div>
    </div>
  );
};

export default LaunchPage;
