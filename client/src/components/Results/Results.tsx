import React, { useEffect, useState } from "react";
import "./Results.scss";

import { getResults } from "../../api/resultAPI";
import IResults from "../../../typings/IResults";

const Results = () => {
  const [results, setResults] = useState<IResults[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults();
      if (data) setResults(data);
    };
    let isCancel = false;
    if (!isCancel) {
      fetchData();
    }
    return () => {
      isCancel = true;
    };
  }, []);

  return (
    <div className="results">
      <h1>Results</h1>
      {results.map(({ _id, username, scores }) => (
        <div key={_id} className="results__item">
          <h3>Name: {username}</h3>
          <p>
            <strong>Scores:</strong> {scores}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
