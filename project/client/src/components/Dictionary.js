import { useState, useEffect } from 'react';

import * as service from '../services/WordsService.js';
import LookupTerm from './LookupTerm.js';
import Popular from './Popular.js'
import TermDefinition from './TermDefinition.js';
import Pronunciation from './Pronunciation.js';
import Origin from './Origin.js';

const initState = {
  needRefresh: {},
  searches: [],
  searchesIsLoading: false,
  definitions: [],
  definitionsIsLoading: false,
  example: "",
  exampleIsLoading: false,
  term: ""
}

function Dictionary() {
  const [state, setState] = useState(initState);
  /**
   * @param {string} term 
   */
  const handleLookup = (term) => {
    setState(s => ({ ...s, term: term }));
  }

  const handleRefresh = () => {
    setState(s => ({ ...s, needRefresh: {} }));
  }

  useEffect(() => {
    if (!state.term) return;
    (async () => {
      setState(s => ({ ...s, definitionsIsLoading: true }));
      const definitions = await service.getDefinitions(state.term);
      setState(s => ({ ...s, definitions: definitions, definitionsIsLoading: false }));
    })();

    (async () => {
      setState(s => ({ ...s, exampleIsLoading: true }));
      const example = await service.getExample(state.term);
      setState(s => ({ ...s, example: example, exampleIsLoading: false }));
    })();
  }, [state.term]);

  useEffect(() => {
    if (state.term !== "") return;
    (async () => {
      setState(s => ({ ...s, searchesIsLoading: true }));
      const items = await service.getPopular();
      setState(s => ({ ...s, searches: items, searchesIsLoading: false }));
    })();
  }, [state.term, state.needRefresh]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">WAP Online Dictionary</h1>

      <div className="text-center mt-4">
        <LookupTerm initTerm={state.term} onLookup={handleLookup} />
      </div>

      {state.term !== "" ? <>
        <div className="mt-4">
          <TermDefinition isLoading={state.definitionsIsLoading} word={state.term} definitions={state.definitions} />
        </div>

        <div className="mt-4">
          <Pronunciation word={state.term} />
        </div>

        <div className="mt-4 mb-4">
          <Origin isLoading={state.exampleIsLoading} word={state.term} originText={state.example} />
        </div>
      </> :
        <div className="mt-4 mb-4">
          <Popular isLoading={state.searchesIsLoading} searches={state.searches} onRefresh={handleRefresh} onChangeTerm={handleLookup} />
        </div>}
    </div>
  );
}

export default Dictionary;
