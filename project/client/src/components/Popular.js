import { useEffect, useState, memo } from 'react';

import "./Popular.css";

import Timer from './Timer.js';

/**
 * @param {{isLoading: boolean, searches: string[], onRefresh: () => void, onChangeTerm: (term: string) => void}} props
 */
function Popular({ isLoading, searches, onRefresh, onChangeTerm }) {
  const [nextRefresh, setNextRefresh] = useState(25);

  const changeTerm = (e, term) => {
    e.preventDefault();
    if (onChangeTerm) onChangeTerm(term);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextRefresh > 0) {
        setNextRefresh(nextRefresh - 1);
      } else {
        if (onRefresh) onRefresh();
        setNextRefresh(25);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefresh, nextRefresh]);

  return <>
    <h4>Popular searches <span className="text-muted">(Next refresh: <Timer nextRefresh={nextRefresh} /> seconds)</span></h4>
    <div className="row mt-4">
      {isLoading ? <>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </> : <>
        <div className="col-md-6">
          <ol className="ps-3">
            {searches.slice(0, 5).map((term, index) => (
              <li key={index}>
                <button onClick={(e) => changeTerm(e, term)} className="anchor text-decoration-none">{term}</button>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-md-6">
          <ol start="6" className="ps-3">
            {searches.slice(5).map((term, index) => (
              <li key={index + 5}>
                <button onClick={(e) => changeTerm(e, term)} className="anchor text-decoration-none">{term}</button>
              </li>
            ))}
          </ol>
        </div>
      </>}
    </div>
  </>;
}

export default memo(Popular);
