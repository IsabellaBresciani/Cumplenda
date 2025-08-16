import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Helper function to decode JWT without a library
const parseJwt = (token) => {
  if (!token) { return null; }
  try {
    // Get the payload part of the token
    const base64Url = token.split('.')[1]; 
    // Replace characters for correct Base64 decoding
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    // Decode, parse as JSON, and return the payload object
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    // Return null if parsing fails
    return null;
  }
};


const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') == "true");
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    if (authToken) {
      const decodedToken = parseJwt(authToken);

      // Check if token is valid and not expired
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        console.warn("Auth token expired. Logging out.");
        logout();
      } else if (!decodedToken) {
        console.error("Invalid auth token. Logging out.");
        logout();
      }
    }
  }, [authToken]);
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, setIsAuthenticated,
      authToken, setAuthToken,
      currentUser, setCurrentUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;