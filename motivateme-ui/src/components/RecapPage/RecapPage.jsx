import React from "react";
import "./RecapPage.css";

import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

// for different graph ordering every time

export default function RecapPage({ user, setCurrPage, colorModeState }) {
  const [facts, setFacts] = React.useState(null);
  const [limitItems, setLimitItems] = React.useState(2);
  // get the stats every time the component mounts
  React.useEffect(() => {
    const getFacts = async () => {
      let tempFacts = await apiClient.getSummary();
      if (tempFacts?.data) {
        setFacts(tempFacts.data.summary);
      }
    };

    getFacts();
  }, []);

  return (
    <>
      {user !== undefined && user !== null ? (
        <>
          {/* If the user is logged in, set the page to "recap" */}
          {setCurrPage("recap")}
          <div className="recap-page">
            <h2 className="recap-title">Recap</h2>
            <div className="chart-area">
              {facts === undefined ||
              facts === null ||
              (facts.length === 1 && facts[0] === null) ? (
                <>
                  <h3 className="no-graphs">
                    Add and complete tasks for personalized statistics!
                  </h3>
                </>
              ) : (
                <>
                  <div className="chart-grid">
                    {facts.slice(0, limitItems).map((fact, idx) => (
                      <div className="graph-area" key={idx}>
                        <GraphCard
                          chartInformation={fact}
                          colorModeState={colorModeState}
                        />
                      </div>
                    ))}
                  </div>
                  {limitItems >= facts?.length ? (
                    <></>
                  ) : (
                    <button
                      className="load-more"
                      type="button"
                      onClick={() => setLimitItems(limitItems + 2)}
                    >
                      Load More
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <AccessForbidden setCurrPage={setCurrPage} />
        </>
      )}
    </>
  );
}
