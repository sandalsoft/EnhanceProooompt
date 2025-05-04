// First, check if we're on the correct domain
async function checkIfTargetDomain() {
  const { targetDomain } = await chrome.storage.sync.get('targetDomain');

  // If no target domain is set, check if we're on one of our default supported domains
  if (!targetDomain) {
    const currentDomain = window.location.hostname;
    return currentDomain.includes('hasura.app') || currentDomain.includes('hasura.io');
  }

  // Check if current URL contains the target domain
  const currentDomain = window.location.hostname;
  return currentDomain.includes(targetDomain);
}

// SVG logo content
const logoSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="28px" height="28px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="promptql-logo" aria-hidden="true">
 <defs>
  <style>
    /* Base styles for all star elements */
    .pql-star {
      fill: #b5fb34;
      transform: translateZ(0); /* Hardware acceleration */
      will-change: opacity;
    }

    /* Animation patterns - will be applied via JS */
    @keyframes starBloom {
      0% { opacity: 0; }
      30% { opacity: 0.3; }
      60% { opacity: 0.7; }
      100% { opacity: 1; }
    }

    @keyframes starWave {
      0% { opacity: 0.2; }
      30% { opacity: 0.5; }
      60% { opacity: 0.8; }
      100% { opacity: 0.2; }
    }
    
    @keyframes starFlicker {
      0% { opacity: 0.1; }
      30% { opacity: 1; }
      60% { opacity: 0.4; }
      100% { opacity: 0.1; }
    }

    /* When loading, apply animations with different durations */
    .loading .star1 {
      animation-delay: 0ms;
    }
    .loading .star2 {
      animation-delay: 200ms;
    }
    .loading .star3 {
      animation-delay: 400ms;
    }

    /* Animation pattern classes that will be applied dynamically */
    .anim-bloom {
      animation: starBloom 2s infinite ease-in-out alternate;
    }
    .anim-wave {
      animation: starWave 1.5s infinite ease-in-out alternate;
    }
    .anim-flicker {
      animation: starFlicker 0.8s infinite ease-in-out alternate;
    }
  </style>
 </defs>
 <!-- Star 1 (top/large) -->
 <path class="pql-star star1" d="m8.2266 25.586c-1.1836-0.4375-2.418-0.78125-3.6875-1.0234-0.09375-0.019531-0.18359-0.035156-0.27734-0.050781-0.85156-0.15234-0.85156-1.3711 0-1.5234 0.09375-0.015625 0.18359-0.03125 0.27734-0.050781 1.2695-0.24219 2.5039-0.58594 3.6875-1.0234 0.71094-0.26562 1.4062-0.55859 2.0781-0.88672 4.6719-2.2695 8.4531-6.0508 10.723-10.723 0.32812-0.67188 0.62109-1.3672 0.88672-2.0781 0.4375-1.1836 0.78125-2.418 1.0234-3.6875 0.019531-0.09375 0.035156-0.18359 0.050781-0.27734 0.15234-0.85156 1.3711-0.85156 1.5234 0 0.015625 0.09375 0.03125 0.18359 0.050781 0.27734 0.24219 1.2695 0.58594 2.5039 1.0234 3.6875 0.26562 0.71094 0.55859 1.4062 0.88672 2.0781 2.2695 4.6719 6.0508 8.4531 10.723 10.723 0.67188 0.32812 1.3672 0.62109 2.0781 0.88672 1.1836 0.4375 2.418 0.78125 3.6875 1.0234 0.09375 0.019531 0.18359 0.035156 0.27734 0.050781 0.85156 0.15234 0.85156 1.3711 0 1.5234-0.09375 0.015625-0.18359 0.03125-0.27734 0.050781-1.2695 0.24219-2.5039 0.58594-3.6875 1.0234-0.71094 0.26562-1.4062 0.55859-2.0781 0.88672-4.6719 2.2695-8.4531 6.0508-10.723 10.723-0.32812 0.67188-0.62109 1.3672-0.88672 2.0781-0.4375 1.1836-0.78125 2.418-1.0234 3.6875-0.019531 0.09375-0.035156 0.18359-0.050781 0.27734-0.15234 0.85156-1.3711 0.85156-1.5234 0-0.015625-0.09375-0.03125-0.18359-0.050781-0.27734-0.24219-1.2695-0.58594-2.5039-1.0234-3.6875-0.26562-0.71094-0.55859-1.4062-0.88672-2.0781-2.2695-4.6719-6.0508-8.4531-10.723-10.723-0.67188-0.32812-1.3672-0.62109-2.0781-0.88672"/>
 
 <!-- Star 2 (middle) -->
 <path class="pql-star star2" d="m36.5786 55.734c-0.82812-0.22266-1.668-0.41797-2.5195-0.58594-0.13281-0.027344-0.26953-0.050782-0.40234-0.078126l-0.039062-0.003906-0.054688-0.011718c-0.085938-0.015626-0.17578-0.03125-0.36328-0.066407l-0.0625-0.011719c-1.3594-0.25391-1.3594-2.1992 0-2.4531l0.0625-0.011719c0.1875-0.035157 0.27734-0.050781 0.36328-0.066407l0.054688-0.011718 0.039062-0.003906c0.13281-0.027344 0.26953-0.050782 0.40234-0.078126 0.85156-0.16797 1.6914-0.36328 2.5195-0.58594 0.71094-0.19141 1.4102-0.40234 2.1016-0.63281 11.18-3.7266 19.977-12.523 23.703-23.703 0.23047-0.69141 0.44141-1.3906 0.63281-2.1016 0.22266-0.82812 0.41797-1.668 0.58594-2.5195 0.027344-0.13281 0.050782-0.26953 0.078126-0.40234l0.003906-0.039062 0.011718-0.054688c0.015626-0.082031 0.03125-0.17578 0.0625-0.35547l0.003907-0.007812 0.011719-0.0625c0.25391-1.3594 2.1992-1.3594 2.4531 0l0.011719 0.0625c0.035157 0.1875 0.050781 0.27734 0.066407 0.36328l0.011718 0.054688 0.003906 0.039062c0.027344 0.13281 0.050782 0.26953 0.078126 0.40234 0.16797 0.85156 0.36328 1.6914 0.58594 2.5195 0.19141 0.71094 0.40234 1.4102 0.63281 2.1016 3.7266 11.18 12.523 19.977 23.703 23.703 0.69141 0.23047 1.3906 0.44141 2.1016 0.63281 0.82812 0.22266 1.668 0.41797 2.5195 0.58594 0.13281 0.027344 0.26953 0.050782 0.40234 0.078126l0.039062 0.003906 0.054688 0.011718c0.085938 0.015626 0.17578 0.03125 0.36328 0.066407l0.0625 0.011719c1.3594 0.25391 1.3594 2.1992 0 2.4531l-0.0625 0.011719-0.19531 0.035157-0.16797 0.03125-0.054688 0.011718-0.039062 0.003906c-0.13281 0.027344-0.26953 0.050782-0.40234 0.078126-0.85156 0.16797-1.6914 0.36328-2.5195 0.58594-0.71094 0.19141-1.4102 0.40234-2.1016 0.63281-11.18 3.7266-19.977 12.523-23.703 23.703-0.23047 0.69141-0.44141 1.3906-0.63281 2.1016-0.22266 0.82812-0.41797 1.668-0.58594 2.5195-0.027344 0.13281-0.050782 0.26953-0.078126 0.40234l-0.003906 0.039062-0.011718 0.054688-0.023438 0.125-0.039062 0.23047-0.015626 0.070312c-0.25391 1.3594-2.1992 1.3594-2.4531 0l-0.011719-0.0625c-0.035157-0.1875-0.050781-0.27734-0.066407-0.36328l-0.011718-0.054688-0.003906-0.039062c-0.027344-0.13281-0.050782-0.26953-0.078126-0.40234-0.16797-0.85156-0.36328-1.6914-0.58594-2.5195-0.19141-0.71094-0.40234-1.4102-0.63281-2.1016-3.7266-11.18-12.523-19.977-23.703-23.703-0.69141-0.23047-1.3906-0.44141-2.1016-0.63281"/>
 
 <!-- Star 3 (small) -->
 <path class="pql-star star3" d="m17.8676 81.761c1.4258 0.27344 2.7773 0.75 4.0234 1.3984 0.55078 0.28906 1.0859 0.61328 1.5938 0.96875 1.418 0.98828 2.6484 2.2188 3.6367 3.6367 0.35547 0.50781 0.67969 1.043 0.96875 1.5938 0.64844 1.2461 1.125 2.5977 1.3984 4.0234 0.011719 0.058594 0.019531 0.11719 0.03125 0.17578 0.097657 0.53516 0.86328 0.53516 0.96094 0 0.011719-0.058594 0.019531-0.11719 0.03125-0.17578 0.27344-1.4258 0.75-2.7773 1.3984-4.0234 0.28906-0.55078 0.61328-1.0859 0.96875-1.5938 0.98828-1.418 2.2188-2.6484 3.6367-3.6367 0.50781-0.35547 1.043-0.67969 1.5938-0.96875 1.2461-0.64844 2.5977-1.125 4.0234-1.3984 0.058594-0.011719 0.11719-0.019531 0.17578-0.03125 0.53516-0.097657 0.53516-0.86328 0-0.96094-0.058594-0.011719-0.11719-0.019531-0.17578-0.03125-1.4258-0.27344-2.7773-0.75-4.0234-1.3984-0.55078-0.28906-1.0859-0.61328-1.5938-0.96875-1.418-0.98828-2.6484-2.2188-3.6367-3.6367-0.35547-0.50781-0.67969-1.043-0.96875-1.5938-0.64844-1.2461-1.125-2.5977-1.3984-4.0234-0.011719-0.058594-0.019531-0.11719-0.03125-0.17578-0.097657-0.53516-0.86328-0.53516-0.96094 0-0.011719 0.058594-0.019531 0.11719-0.03125 0.17578-0.27344 1.4258-0.75 2.7773-1.3984 4.0234-0.28906 0.55078-0.61328 1.0859-0.96875 1.5938-0.98828 1.418-2.2188 2.6484-3.6367 3.6367-0.50781 0.35547-1.043 0.67969-1.5938 0.96875-1.2461 0.64844-2.5977 1.125-4.0234 1.3984-0.058594 0.011719-0.11719 0.019531-0.17578 0.03125-0.53516 0.097657-0.53516 0.86328 0 0.96094 0.058594 0.011719 0.11719 0.019531 0.17578 0.03125z"/>
</svg>
`;

// Function to create and insert enhance button next to textareas
function addEnhanceButtons() {
  console.log("ProomptQL Enhancer: Checking for existing button and target elements");

  // Use a more specific selector for our custom button to avoid conflicts with native UI buttons
  if (document.querySelector('.promptql-enhancer-btn')) {
    console.log("ProomptQL Enhancer: Button already exists.");
    return;
  }

  // Find the primary chat input element (adjust selector if needed)
  const targetInput = document.querySelector('[role="textbox"], textarea[data-testid="promptql-chat-box:chat-input"]');
  if (!targetInput) {
    console.log("!!! ERROR ProomptQL Enhancer: Target chat input not found.");
    return;
  }
  console.log("ProomptQL Enhancer: Found target input:", targetInput);

  // Ensure the input has an id to reference from the button
  if (!targetInput.id) {
    targetInput.id = `promptql-input-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    console.log("ProomptQL Enhancer: Assigned ID to target input:", targetInput.id);
  }

  // Find the Mantine container based on the snippet
  // Be more specific to target only the chat input container, not all Mantine groups
  const inputContainer = targetInput.closest('.mantine-Stack-root') || targetInput.parentElement;
  if (!inputContainer) {
    console.log("ERROR!!!!   ProomptQL Enhancer: Could not find parent container for input.");
    return;
  }

  // Find the button container within the input container
  const buttonContainer = inputContainer.querySelector('.mantine-Group-root');
  if (!buttonContainer) {
    console.log("ERROR!!!!   ProomptQL Enhancer: Button container not found near the input.");
    return;
  }

  console.log("ProomptQL Enhancer: Found button container:", buttonContainer);

  // Check again if our button already exists in this specific container
  if (buttonContainer.querySelector('.promptql-enhancer-btn')) {
    console.log("ProomptQL Enhancer: Button already exists in this container.");
    return;
  }

  // Create the enhance button based on the snippet
  const enhancerBtn = document.createElement('button');
  enhancerBtn.className = 'enhancer-btn mantine-focus-auto mantine-ActionIcon-root mantine-UnstyledButton-root promptql-enhancer-btn';
  enhancerBtn.setAttribute('data-variant', 'transparent');
  enhancerBtn.setAttribute('data-size', 'lg');
  enhancerBtn.setAttribute('type', 'button');
  enhancerBtn.style = '--ai-size: var(--ai-size-lg); --ai-radius: var(--mantine-radius-xl); --ai-bg: transparent; --ai-hover: transparent; --ai-color: var(--mantine-color-indigo-light-color); --ai-bd: calc(0.0625rem * var(--mantine-scale)) solid transparent; background: transparent;';
  enhancerBtn.innerHTML = logoSvgContent; // Use the updated logoSvgContent
  enhancerBtn.dataset.targetId = targetInput.id; // Link button to the input
  enhancerBtn.title = "Enhance prompt with AI";

  // Create a unique ID for the tooltip
  const tooltipId = `tooltip-${targetInput.id}`;

  // Add aria-describedby to link to the tooltip
  enhancerBtn.setAttribute('aria-describedby', tooltipId);

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = tooltipId;
  tooltip.className = 'promptql-tooltip';
  tooltip.textContent = 'Enhance your prompt with an LLM';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = false;

  // Add global styles for animations if not already added
  if (!document.getElementById('promptql-enhancer-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'promptql-enhancer-styles';
    styleEl.textContent = `
      /* Global animation styles for ProomptQL Enhancer */
      .promptql-enhancer-btn:hover svg {
        filter: brightness(1.2);
        transition: filter 0.2s ease-in-out;
      }
      
      .promptql-enhancer-btn:active svg {
        transform: scale(0.95);
        transition: transform 0.1s ease-in-out;
      }
      
      /* Ensure our green stars are visually distinct */
      .promptql-enhancer-btn .pql-star {
        fill: #b5fb34 !important;
      }
      
      /* Remove any styles that might affect the native UI buttons */
      .promptql-logo {
        background: transparent !important;
      }
      
      /* Tooltip styles */
      .promptql-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        max-width: 250px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-5px);
        margin-bottom: 8px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .promptql-enhancer-btn:hover + .promptql-tooltip,
      .promptql-enhancer-btn:focus + .promptql-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Insert the button into the container
  buttonContainer.insertBefore(enhancerBtn, buttonContainer.firstChild);
  // Insert tooltip after button
  buttonContainer.insertBefore(tooltip, enhancerBtn.nextSibling);
  console.log("ProomptQL Enhancer: Enhancer button inserted into button container.");
}

// Function to call the LLM API
async function enhanceWithLLM(text) {
  // OpenAI API endpoint
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  try {
    // Get API key and model from storage
    const { apiKey, modelSelection } = await chrome.storage.sync.get(['apiKey', 'modelSelection']);

    if (!apiKey) {
      throw new Error('API key not configured. Click the extension icon to set up.');
    }

    // Use the selected model or default to GPT-3.5
    const model = modelSelection || 'gpt-3.5-turbo';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: `Rewrite the following request into a precise PromptQL instruction that:
• specifies relevant data sources/tables, metrics/calculations, filters (dates, entities, thresholds), and expected output format;
• replaces vague terms with concrete definitions or, if essential details are missing, inserts a concise clarifying question in [brackets];
• is concise, declarative, and ready for PromptQL execution.
Return only this rewritten instruction—no lead‑ins, explanations, or extra formatting: 
            
            ${text}
            
            `
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw error;
  }
}

let enhancerDelegatedListenerAttached = false;

// Helper function to apply random animation pattern to stars
function applyRandomAnimationPattern(svgElement) {
  const patterns = ['anim-bloom', 'anim-wave', 'anim-flicker'];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

  // Add the loading class to the SVG
  svgElement.classList.add('loading');

  // Apply the random animation pattern to all stars
  const stars = svgElement.querySelectorAll('.pql-star');
  stars.forEach(star => {
    // Remove any existing animation patterns
    star.classList.remove('anim-bloom', 'anim-wave', 'anim-flicker');
    // Add the new random pattern
    star.classList.add(randomPattern);
  });

  // Set aria-live attribute for accessibility
  svgElement.setAttribute('aria-live', 'polite');
  svgElement.setAttribute('aria-label', 'Processing your request');
}

// Helper function to remove animations
function removeAnimations(svgElement) {
  svgElement.classList.remove('loading');
  const stars = svgElement.querySelectorAll('.pql-star');
  stars.forEach(star => {
    star.classList.remove('anim-bloom', 'anim-wave', 'anim-flicker');
  });
  svgElement.removeAttribute('aria-live');
  svgElement.setAttribute('aria-hidden', 'true');
}

function attachDelegatedEnhanceListener() {
  if (enhancerDelegatedListenerAttached) return;
  document.addEventListener('click', async (event) => {
    // Use the more specific class name to avoid affecting native UI buttons
    const btn = event.target.closest('.promptql-enhancer-btn');
    if (!btn) {
      // Also support clicking on our enhancer button via the old class if it has our SVG
      const oldBtn = event.target.closest('.enhancer-btn');
      if (oldBtn && oldBtn.querySelector('.promptql-logo')) {
        // It's our button, proceed
      } else {
        // Not our button, exit
        return;
      }
    }

    // Get the button regardless of how we found it
    const enhancerBtn = btn || oldBtn;

    // If the click was on the SVG but not on its container, find the container
    if (enhancerBtn.nodeName && (enhancerBtn.nodeName.toLowerCase() === 'path' || enhancerBtn.nodeName.toLowerCase() === 'svg')) {
      const svgContainer = enhancerBtn.closest('svg.promptql-logo');
      if (svgContainer) {
        // Use the container instead
        enhancerBtn = svgContainer;
      }
    }

    const targetId = enhancerBtn.dataset.targetId;
    const inputEl = targetId ? document.getElementById(targetId) : null;
    if (!inputEl) {
      console.warn('ProomptQL Enhancer: Could not locate target input for clicked button');
      return;
    }

    let originalText = inputEl.value || inputEl.textContent || '';
    if (!originalText.trim()) return;

    console.log('ProomptQL Enhancer: Delegated click handler triggered. Original text:', originalText);

    enhancerBtn.disabled = true;
    const previousHtml = enhancerBtn.innerHTML; // Store original SVG content

    // Find the SVG element and apply animations
    const svgElement = enhancerBtn.querySelector('svg.promptql-logo');
    if (svgElement) {
      applyRandomAnimationPattern(svgElement);
    } else {
      // Fallback if SVG not found
      enhancerBtn.textContent = 'Processing...';
    }

    try {
      console.log('ProomptQL Enhancer: Calling LLM API (delegated)...');
      const enhancedText = await enhanceWithLLM(originalText);
      console.log('ProomptQL Enhancer: LLM API returned (delegated). Enhanced text:', enhancedText);

      if (inputEl.value !== undefined) {
        inputEl.value = enhancedText;
      } else {
        inputEl.textContent = enhancedText;
      }
      // Trigger input event to notify framework/listeners of the change
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));

      // Restore icon state (success case)
      if (svgElement) {
        removeAnimations(svgElement);
      }
      enhancerBtn.style.opacity = '';
      enhancerBtn.style.pointerEvents = '';
    } catch (err) {
      console.error('ProomptQL Enhancer: Delegated enhancement failed:', err);

      if (svgElement) {
        removeAnimations(svgElement);
        // Apply error state to SVG (could customize this further)
        svgElement.style.filter = 'grayscale(1) brightness(0.7)';
        setTimeout(() => {
          svgElement.style.filter = '';
          enhancerBtn.disabled = false;
        }, 2000);
      } else {
        enhancerBtn.textContent = 'Error!'; // Fallback if SVG not found
        setTimeout(() => {
          enhancerBtn.innerHTML = previousHtml;
          enhancerBtn.disabled = false;
        }, 2000);
      }
      return; // Don't proceed to restore button in success case
    }

    // Successful: Restore original state and enable button
    enhancerBtn.innerHTML = previousHtml;
    enhancerBtn.disabled = false;
  });
  enhancerDelegatedListenerAttached = true;

  // Direct global fallback for Mantine UI - place an enhancer icon at page level 
  // for any Mantine Group-root divs that we find when the page loads
  setTimeout(() => {
    console.log("ProomptQL Enhancer: Running global fallback for Mantine UI");

    // Remove any existing buttons with blue backgrounds that might be native UI
    // We're targeting only certain patterns that could conflict with our buttons
    const potentialConflictingButtons = document.querySelectorAll('button svg:not(.promptql-logo) path[fill="#b5fb34"]');
    console.log(`ProomptQL Enhancer: Found ${potentialConflictingButtons.length} potential native UI star buttons`);

    // Don't remove native UI elements, just log them for debugging
    potentialConflictingButtons.forEach(path => {
      const svg = path.closest('svg');
      const btn = svg?.closest('button');
      if (btn && !btn.classList.contains('promptql-enhancer-btn')) {
        console.log("ProomptQL Enhancer: Identified native UI star button", btn);
        // Ensure our class doesn't affect native buttons
        if (btn.classList.contains('enhancer-btn')) {
          btn.classList.remove('enhancer-btn');
        }
      }
    });

    // Be more selective in finding inputs that don't already have our enhancer
    const chatInputs = document.querySelectorAll('textarea[placeholder], [role="textbox"]');
    if (chatInputs.length > 0) {
      console.log(`ProomptQL Enhancer: Found ${chatInputs.length} potential chat inputs via global fallback`);

      chatInputs.forEach((input, index) => {
        // Skip if this input already has our enhancer nearby
        const nearbyEnhancer = input.closest('.mantine-Stack-root')?.querySelector('.promptql-enhancer-btn');
        if (nearbyEnhancer) {
          return;
        }

        // Find a button container we can add to
        const buttonContainer = input.closest('.mantine-Stack-root')?.querySelector('.mantine-Group-root');
        if (!buttonContainer) {
          return;
        }

        // Skip if the button container already has our enhancer
        if (buttonContainer.querySelector('.promptql-enhancer-btn')) {
          return;
        }

        console.log(`ProomptQL Enhancer: Inserting button for input ${index} via global fallback`);

        // Ensure input has ID
        if (!input.id) {
          input.id = `promptql-input-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        }

        // Create a button with our animated SVG
        const button = document.createElement('button');
        button.className = 'enhancer-btn mantine-focus-auto mantine-ActionIcon-root mantine-UnstyledButton-root promptql-enhancer-btn';
        button.setAttribute('data-variant', 'transparent');
        button.setAttribute('data-size', 'lg');
        button.setAttribute('type', 'button');
        button.innerHTML = logoSvgContent; // Use our animated SVG
        button.title = 'Enhance prompt with AI';
        button.dataset.targetId = input.id;

        // Create a unique ID for the tooltip
        const tooltipId = `tooltip-fallback-${input.id}`;

        // Add aria-describedby to link to the tooltip
        button.setAttribute('aria-describedby', tooltipId);

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = tooltipId;
        tooltip.className = 'promptql-tooltip';
        tooltip.textContent = 'AI-powered prompt enhancement. Transform your simple prompts into detailed, effective instructions.';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.hidden = false;

        // Insert at the beginning of the button container
        buttonContainer.insertBefore(button, buttonContainer.firstChild);
        // Insert tooltip after button
        buttonContainer.insertBefore(tooltip, button.nextSibling);
        console.log("ProomptQL Enhancer: Global fallback inserted enhancer button successfully");
      });
    }
  }, 2000); // Give page time to load and render dynamic components
}

// Initialize extension after checking domain
async function initialize() {
  const isTargetDomain = await checkIfTargetDomain();

  if (isTargetDomain) {
    console.log("ProomptQL Enhancer: Running on supported domain");
    attachDelegatedEnhanceListener();
    // Run when the page loads
    addEnhanceButtons();

    // Watch for DOM changes to handle dynamically added textareas
    const observer = new MutationObserver(mutations => {
      let shouldAddButtons = false;

      mutations.forEach(mutation => {
        if (mutation.addedNodes.length ||
          (mutation.type === 'attributes' &&
            mutation.attributeName === 'class')) {
          shouldAddButtons = true;
        }
      });

      if (shouldAddButtons) {
        addEnhanceButtons();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  } else {
    console.log("ProomptQL Enhancer: Not running on this domain");
  }
}

// Start the extension
initialize();

// Also run when the page has been loaded
window.addEventListener('load', () => {
  console.log("ProomptQL Enhancer: Page fully loaded, adding buttons after delay");
  setTimeout(addEnhanceButtons, 1000); // Slight delay to ensure the page is fully rendered
}); 