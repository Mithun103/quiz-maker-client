const API_URL = import.meta.env.VITE_API_URL;

// Update your fetch calls to use API_URL
fetch(`${API_URL}/api/login`, {
  // ... rest of your fetch config
}) 