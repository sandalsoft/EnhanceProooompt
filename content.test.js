// Mock Chrome API
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
    }
  },
  runtime: {
    sendMessage: jest.fn()
  }
};

// Mock fetch API
global.fetch = jest.fn();

// Mock DOM elements and functions
document.querySelectorAll = jest.fn();
document.createElement = jest.fn();

// Import the content script functions (note: in a real setup, you'd use module imports)
// For this example, we'll just mock the functions

describe('Text Enhancer Content Script', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('checkIfTargetDomain returns true when current domain matches target domain', async () => {
    // Mock the storage.sync.get function to return a target domain
    chrome.storage.sync.get.mockImplementation((key, callback) => {
      callback({ targetDomain: 'example.com' });
    });

    // Mock the window.location.hostname
    Object.defineProperty(window, 'location', {
      value: { hostname: 'example.com' },
      writable: true
    });

    // Call the checkIfTargetDomain function (mock implementation)
    const result = await checkIfTargetDomain();

    // Verify the result
    expect(result).toBe(true);
    expect(chrome.storage.sync.get).toHaveBeenCalledWith('targetDomain', expect.any(Function));
  });

  test('checkIfTargetDomain returns false when current domain does not match target domain', async () => {
    // Mock the storage.sync.get function to return a target domain
    chrome.storage.sync.get.mockImplementation((key, callback) => {
      callback({ targetDomain: 'example.com' });
    });

    // Mock the window.location.hostname
    Object.defineProperty(window, 'location', {
      value: { hostname: 'different-domain.com' },
      writable: true
    });

    // Call the checkIfTargetDomain function (mock implementation)
    const result = await checkIfTargetDomain();

    // Verify the result
    expect(result).toBe(false);
  });

  test('enhanceWithLLM calls the LLM API with correct parameters', async () => {
    // Mock the storage.sync.get function to return an API key and model
    chrome.storage.sync.get.mockImplementation((keys, callback) => {
      callback({
        apiKey: 'test-api-key',
        modelSelection: 'test-model'
      });
    });

    // Mock the fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        choices: [{ text: 'Enhanced text' }]
      })
    });

    // Call the enhanceWithLLM function (mock implementation)
    const result = await enhanceWithLLM('Original text');

    // Verify the API call
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        }),
        body: expect.stringContaining('test-model')
      })
    );

    // Verify the result
    expect(result).toBe('Enhanced text');
  });
});

// Mock implementations of the functions being tested
async function checkIfTargetDomain() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('targetDomain', (result) => {
      const targetDomain = result.targetDomain;
      if (!targetDomain) return resolve(false);

      const currentDomain = window.location.hostname;
      resolve(currentDomain.includes(targetDomain));
    });
  });
}

async function enhanceWithLLM(text) {
  const API_URL = 'https://api.openai.com/v1/completions';

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['apiKey', 'modelSelection'], async (result) => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${result.apiKey}`
          },
          body: JSON.stringify({
            model: result.modelSelection,
            prompt: text,
            max_tokens: 1000,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        resolve(data.choices[0].text.trim());
      } catch (error) {
        reject(error);
      }
    });
  });
} 