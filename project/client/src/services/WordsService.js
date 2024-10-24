let baseUrl = '';

async function loadConfig() {
    const response = await fetch('/config.json');
    const config = await response.json();
    return config;
}

/**
 * @returns {Promise<string>}
 */
async function getBaseUrl() {
    if (baseUrl !== '') return baseUrl;
    const config = await loadConfig();
    return baseUrl = config.API_BASE_URL;
}

/**
 * @param {string} term
 * @returns {Promise<Definition[]>}
 */
export async function getDefinitions(term) {
    const baseUrl = await getBaseUrl();
    const result = [];
    try {
        let res = await fetch(`${baseUrl}/api/v1/words/${term}/definitions`);
        (await res.json()).forEach(m => result.push(m));
    }
    catch (err) {
        console.error(err);
    }
    
    return result;
}

/**
 * @param {string} term
 * @returns {Promise<string>}
 */
export async function getExample(term) {
    const baseUrl = await getBaseUrl();
    let result = "";
    try {
        let res = await fetch(`${baseUrl}/api/v1/words/${term}/example`);
        const data = await res.json();
        result = data.example;
    }
    catch (err) {
        console.error(err);
    }
    
    return result;
}

/**
 * @returns {Promise<string[]>}
 */
export async function getPopular() {
    const baseUrl = await getBaseUrl();
    const result = [];
    try {
        let res = await fetch(`${baseUrl}/api/v1/words/popular`);
        const data = await res.json();
        data.forEach(m => result.push(m));
    }
    catch (err) {
        console.error(err);
    }

    return result;
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
