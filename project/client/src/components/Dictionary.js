import { useState, useEffect } from 'react';

import LookupTerm from './LookupTerm.js';
import TermDefinition from './TermDefinition.js';
import Pronunciation from './Pronunciation.js';
import Origin from './Origin.js';

const initState = {
  definitions: [],
  definitionsIsLoading: false,
  example: "",
  exampleIsLoading: false,
  term: ""
}

/**
 * @param {{ baseUrl: string }} props
 */
function Dictionary({ baseUrl }) {
  const [state, setState] = useState(initState);
  /**
   * @param {string} term 
   */
  const handleLookup = (term) => {
    setState({...state, term: term});
  }

  useEffect(() => {
    if (!state.term) return;
    (async () => {
      setState(s => ({...s, definitionsIsLoading: true }));
      try {
        let resDefs = fetch(`${baseUrl}/api/v1/words/${state.term}/definitions`);
        const definitions = (await (await resDefs).json());
        setState(s => ({...s, definitions: definitions }));
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setState(s => ({...s, definitionsIsLoading: false }));
      }
    })();
    (async () => {
      setState(s => ({...s, exampleIsLoading: true }));
      try {
        let resEx = fetch(`${baseUrl}/api/v1/words/${state.term}/example`);
        const example = (await (await resEx).json());
        setState(s => ({...s, example: example.example }));
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setState(s => ({...s, exampleIsLoading: false }));
      }
    })();
  }, [state.term]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">WAP Online Dictionary</h1>

      <div className="text-center mt-4">
        <LookupTerm onLookup={handleLookup} />
      </div>

      <div className="mt-4">
        <TermDefinition isLoading={state.definitionsIsLoading} word={state.term} definitions={state.definitions} />
      </div>

      <div className="mt-5">
        <Pronunciation word={state.term} />
      </div>

      <div className="mt-5">
        <Origin isLoading={state.exampleIsLoading} word={state.term} originText={state.example} />
      </div>
    </div>
  );
}

export default Dictionary;
