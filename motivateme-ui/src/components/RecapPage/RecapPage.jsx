import React from "react";
import "./RecapPage.css";

import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

// for different graph ordering every time
const randomizeAndReturnItemsInArray = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function RecapPage({ user, setCurrPage }) {
  const [facts, setFacts] = React.useState(null);
  // get the stats every time the component mounts
  React.useEffect(() => {
    const getFacts = async () => {
      let tempFacts = await apiClient.getSummary();
      if (tempFacts?.data) {
        setFacts(tempFacts.data.summary);
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
              <div className="chart-grid">
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
                    {randomizeAndReturnItemsInArray(facts, facts.length).map(
                      (fact, idx) => (
                        <div className="graph-area" key={idx}>
                          <GraphCard chartInformation={fact} />
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
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
