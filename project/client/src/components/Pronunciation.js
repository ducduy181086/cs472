import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * @param {{word: string}} props
 */
function Pronunciation({word}) {
  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>How is the word <strong><i>{word}</i></strong> pronounced?</h5>
      </div>
      <div className="card-body d-flex align-items-center">
        <p className="me-3"><strong>{word}</strong></p>
        <button className="btn btn-primary" onClick={handleSpeech}>
          <i className="bi bi-volume-up-fill"></i> Listen
        </button>
      </div>
    </div>
  );
}

export default Pronunciation;
