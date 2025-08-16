import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(() => localStorage.getItem('isAuthenticated') == "true");
  const [ authToken, setAuthToken ] = useState(() => localStorage.getItem('authToken'));
  const [ currentUser, setCurrentUser ] = useState(() => JSON.parse(localStorage.getItem('currentUser')));
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, setIsAuthenticated,
      authToken, setAuthToken,
      currentUser, setCurrentUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;