/**
 * @typedef {Object} RootState
 * @property {DictionaryState} dictionary
 */

/**
 * @typedef {Object} DictionaryState
 * @property {Object} needRefresh
 * @property {string[]} searches
 * @property {boolean} searchesIsLoading
 * @property {Definition[]} definitions
 * @property {boolean} definitionsIsLoading
 * @property {string} example
 * @property {boolean} exampleIsLoading
 * @property {string} term
 */

/**
 * @typedef {Object} Definition
 * @property {number} [number]
 * @property {string} [wordtype]
 * @property {string} [definition]
 */
