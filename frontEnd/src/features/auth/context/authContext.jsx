import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  return(

   <AuthContext.Provider value={{username,setUsername,loading,setLoading}}>
    {children}
   </AuthContext.Provider>

    
  )
};
