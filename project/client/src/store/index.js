import '../type.js';
import React, { createContext, useContext, useReducer } from 'react';

import { initialState, rootReducer } from './rootReducer.js';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

/**
 * @template T
 * @param {(state: RootState) => T} [selector]
 * @returns {{ state: T, dispatch: Function }}
 */
export function useStateContext(selector) {
  let result = useContext(StateContext);
  if (selector) {
    result = {...result, state: selector(result.state)};
  }
  return result;
}
