/**
 * @param {{ word: string, originText: string, isLoading: boolean }} props 
 */
function Origin({ word, originText, isLoading }) {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Where does the word <strong>{word}</strong> come from?</h5>
      </div>
      <div className="card-body">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <p>{originText}</p>
        )}
      </div>
    </div>
  );
}

export default Origin;