import { useState, useEffect } from 'react';

import './LookupTerm.css';

/**
 * @param {{initTerm: string, onLookup: (term: string) => void}} props 
 * @returns 
 */
function LookupTerm({ initTerm, onLookup }) {
  const [term, setTerm] = useState('');

  const handleLookup = (e) => {
    e.preventDefault();
    if (onLookup) {
      onLookup(term);
    }
  }

  const clearTerm = () => {
    setTerm('');
    if (onLookup) {
      onLookup('');
    }
  };

  useEffect(() => {
    setTerm(initTerm);
  }, [initTerm]);

  return (
    <form onSubmit={handleLookup} className="form-inline d-flex justify-content-center">
      <div className="position-relative w-100 me-2">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="form-control me-2"
          placeholder="Enter term"
        />
        {term && (
          <span className="clear-icon" onClick={clearTerm}>&times;</span>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Lookup</button>
    </form>
  );
}

export default LookupTerm;
