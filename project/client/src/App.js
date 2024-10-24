import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Dictionary from './components/Dictionary.js';

function App() {
  const [baseUrl, setBaseUrl] = useState('');
  loadConfig().then(config => setBaseUrl(config.API_BASE_URL));

  return baseUrl === '' ? (
    <></>
  ) : (
    <Dictionary baseUrl={baseUrl} />
  );
}

async function loadConfig() {
  const response = await fetch('/config.json');
  const config = await response.json();
  return config;
}

export default App;
