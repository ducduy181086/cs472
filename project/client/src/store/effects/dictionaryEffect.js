import { useEffect } from 'react';

import { useStateContext } from '../index.js';
import {
    FETCH_DEFINITIONS, FETCH_DEFINITIONS_SUCCESS,
    FETCH_EXAMPLE, FETCH_EXAMPLE_SUCCESS,
    FETCH_POPULAR, FETCH_POPULAR_SUCCESS
} from '../actions/dictionaryAction.js';
import * as service from '../../services/WordsService.js';

export function useDictionaryEffect() {
    const { state, dispatch } = useStateContext(s => s.dictionary);
    useEffect(() => {
        if (!state.term) return;
        (async () => {
            dispatch({ type: FETCH_DEFINITIONS });
            const definitions = await service.getDefinitions(state.term);
            dispatch({ type: FETCH_DEFINITIONS_SUCCESS, payload: definitions });
        })();

        (async () => {
            dispatch({ type: FETCH_EXAMPLE });
            const example = await service.getExample(state.term);
            dispatch({ type: FETCH_EXAMPLE_SUCCESS, payload: example });
        })();
    }, [state.term, dispatch]);

    useEffect(() => {
        if (state.term !== "") return;
        (async () => {
            dispatch({ type: FETCH_POPULAR });
            const items = await service.getPopular();
            dispatch({ type: FETCH_POPULAR_SUCCESS, payload: items });
        })();
    }, [state.term, state.needRefresh, dispatch]);
}
