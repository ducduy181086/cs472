/**
 * @param {{ word: string, definitions: Definition[], isLoading: boolean }} props
 */
function TermDefinition({ word, definitions, isLoading }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{word}</h2>
      </div>
      <div className="card-body">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {definitions.map((definition) => (
              <li key={definition.number} className="list-group-item">
                {definition.number} ({definition.wordtype}) :: {definition.definition}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export class Definition {
  /**
   * @param {number} [number]
   * @param {string} [wordtype]
   * @param {string} [definition]
   */
  constructor(number, wordtype, definition) {
    this.number = number;
    this.wordtype = wordtype;
    this.definition = definition;
  }
}

export default TermDefinition;
