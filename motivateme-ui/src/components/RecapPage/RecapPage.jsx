import React from "react";
import "./RecapPage.css";

import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

// for different graph ordering every time
const randomizeArray = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled;
};

export default function RecapPage({ user, setCurrPage }) {
  const [facts, setFacts] = React.useState(null);
  const [limitItems, setLimitItems] = React.useState(3);
  // get the stats every time the component mounts
  React.useEffect(() => {
    const getFacts = async () => {
      let tempFacts = await apiClient.getSummary();
      if (tempFacts?.data) {
        setFacts(
          randomizeArray(tempFacts.data.summary, tempFacts.data.summary.length)
        );
      }
    };

    getFacts();

    // if user is logged in, then set it to recap
    if (user !== null && user !== undefined) {
      setCurrPage("recap");
    }
  }, []);

  return (
    <>
      {user !== undefined && user !== null ? (
        <>
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
                        <GraphCard chartInformation={fact} />
                      </div>
                    ))}
                  </div>
                  <button
                    className="load-more"
                    type="button"
                    onClick={() => setLimitItems(limitItems + 3)}
                  >
                    Load More
                  </button>
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
