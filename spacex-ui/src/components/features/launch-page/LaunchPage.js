import React, { useContext } from "react";
import LoadingSpinner from "../../elem/LoadingSpinner";
import LaunchTable from "./LaunchTable";
import { LaunchContext } from "../../wrappers/LaunchContext";

const LaunchPage = () => {
  const { launches, loading } = useContext(LaunchContext);

  return (
    <div className="section">
      <header className="header">
        <h1 className="title is-size-2">SpaceX</h1>
        <h3 className="title is-size-5">launches</h3>
      </header>
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
