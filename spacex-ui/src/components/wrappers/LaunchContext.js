import React, { createContext, useState, useEffect } from "react";
import withConfig from "./withConfig";

const LaunchContext = createContext(null);

const LaunchContextProvider = ({ config, children }) => {
  const { API_URL } = config;
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [pagination, setPagination] = useState({});
  // const [pageControls, setPageControls] = useState({sort: 'date_utc asc', page: 1});

  const query = {
    options: {
      select: "date_utc flight_number rocket details links",
      // page: pageControls.page,
      // sort: pageControls.sort,
      pagination: false, //originally used API pagination, see commented code
      sort: "date_utc asc",
      populate: [
        {
          path: "rocket",
          select: "name",
        },
      ],
    },
  };

  const POST = (query) => {
    return {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    };
  };
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/launches/query`, POST(query))
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const error = await response.text();
          throw new Error(error);
        }
      })
      .then((response) => {
        setLaunches(
          response.docs.map((launch) => ({
            ...launch,
            rocket: launch.rocket.name,
            links: launch.links.presskit,
          }))
        );
        // const { docs, ...pagination } = response;
        // setPagination(pagination);
      })
      .catch((e) => {
        console.log(
          "Workflow Landing Page:" +
            (e.message ? e.message : "Unable to connect to the server")
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <LaunchContext.Provider
      value={{
        loading,
        launches,
        // pagination,
        // setPage,
      }}
    >
      {children}
    </LaunchContext.Provider>
  );
};

export { LaunchContext };
export default withConfig(LaunchContextProvider);
