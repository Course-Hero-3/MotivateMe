import React from "react";
import "./RecapPage.css";

import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

// perhaps use a different variable which keeps track
// of which index you left off on if we want to
// implement a "load more" feature
// Think about: what happens to the variable if we refresh?

// right now we are always showing 4 no matter what (hard coded in function call)
const randomizeAndReturnItemsInArray = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function RecapPage({ user, setCurrPage }) {
  const [facts, setFacts] = React.useState(null);
  React.useEffect(() => {
    const getFacts = async () => {
      let tempFacts = await apiClient.getSummary();
      if (tempFacts?.data) {
        setFacts(tempFacts.data.summary);
      }
      // if error when fetching user from token (happens if use refreshes)
    };

    // otherwise get the summary and set curr page to recap
    getFacts();
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
                {facts
                  ? // change "facts.length" to another variable if we implement a load more function
                    // might need to change some other variables as well actually
                    randomizeAndReturnItemsInArray(facts, facts.length).map(
                      (fact, idx) => (
                        <div className="graph-area">
                        <GraphCard key={idx} chartInformation={fact} />
                        </div>
                      )
                    )
                  : null}
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
