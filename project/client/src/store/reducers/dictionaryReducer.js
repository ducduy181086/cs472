import '../../type.js';
import {
    FETCH_DEFINITIONS, FETCH_DEFINITIONS_SUCCESS,
    FETCH_EXAMPLE, FETCH_EXAMPLE_SUCCESS,
    FETCH_POPULAR, FETCH_POPULAR_SUCCESS,
    UPDATE_TERM, REFRESH
} from '../actions/dictionaryAction.js';

/** @type {DictionaryState} */
export const initialDictionaryState = {
    needRefresh: {},
    searches: [],
    searchesIsLoading: false,
    definitions: [],
    definitionsIsLoading: false,
    example: "",
    exampleIsLoading: false,
    term: ""
};

/**
 * @param {{type: string, payload: any}} action
 */
export function dictionaryReducer(state = initialDictionaryState, action) {
    switch (action.type) {
        case FETCH_DEFINITIONS: return { ...state, definitionsIsLoading: true };
        case FETCH_DEFINITIONS_SUCCESS: return { ...state, definitionsIsLoading: false, definitions: action.payload };
        case FETCH_EXAMPLE: return { ...state, exampleIsLoading: true };
        case FETCH_EXAMPLE_SUCCESS: return { ...state, exampleIsLoading: false, example: action.payload };
        case FETCH_POPULAR: return { ...state, searchesIsLoading: true };
        case FETCH_POPULAR_SUCCESS: return { ...state, searchesIsLoading: false, searches: action.payload };
        case UPDATE_TERM: return { ...state, term: action.payload };
        case REFRESH: return { ...state, needRefresh: {} };
        default: return state;
    }
}
