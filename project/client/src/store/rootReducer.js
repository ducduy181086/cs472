import { dictionaryReducer, initialDictionaryState } from './reducers/dictionaryReducer.js';

const initialState = {
    dictionary: initialDictionaryState
};

function rootReducer(state = initialState, action) {
    return {
        dictionary: dictionaryReducer(state.dictionary, action)
    };
}

export { initialState, rootReducer };
