import { useState } from 'react';

/**
 * @param { onLookup: (term: string) => void } props 
 * @returns 
 */
function LookupTerm({ onLookup }) {
  const [term, setTerm] = useState('');

  const handleLookup = (e) => {
    e.preventDefault();
    if (onLookup) {
      onLookup(term);
    }
  }

  return (
    <form onSubmit={handleLookup} className="form-inline d-flex justify-content-center">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control me-2"
        placeholder="Enter term"
      />
      <button type="submit" className="btn btn-primary">Lookup</button>
    </form>
  );
}

export default LookupTerm;
