import '../type.js';
import { useStateContext } from '../store/index.js';
import { UPDATE_TERM, REFRESH } from '../store/actions/dictionaryAction.js';
import { useDictionaryEffect } from '../store/effects/dictionaryEffect.js';
import LookupTerm from './LookupTerm.js';
import Popular from './Popular.js'
import TermDefinition from './TermDefinition.js';
import Pronunciation from './Pronunciation.js';
import Origin from './Origin.js';

function Dictionary() {
  useDictionaryEffect();
  const { state, dispatch } = useStateContext(s => s.dictionary);
  /** @param {string} term */
  const handleLookup = (term) => {
    dispatch({ type: UPDATE_TERM, payload: term });
  }

  const handleRefresh = () => {
    dispatch({ type: REFRESH });
  }

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
