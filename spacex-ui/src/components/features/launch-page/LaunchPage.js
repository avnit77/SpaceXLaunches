import React, { useContext } from "react";
import LoadingSpinner from "../../elem/LoadingSpinner";
import LaunchTable from "./LaunchTable";
import { LaunchContext } from "../../wrappers/LaunchContext";

const LaunchPage = () => {
  const { launches, loading } = useContext(LaunchContext);

  return (
      <div className="section">
        <h1 className="title is-size-2">SpaceX</h1>
        <div className="grid section">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <LaunchTable
              launches={launches ? launches : []}
            />
          )}
        </div>
      </div>
  );
};

export default LaunchPage;
