import { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state
interface AppContextProps {
  userMe: string;
  setUserMe: (user: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userMe, setUserMe] = useState<string>('');

  return (
    <AppContext.Provider value={{ userMe, setUserMe }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
