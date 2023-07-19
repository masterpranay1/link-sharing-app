import { createContext, useContext } from "react";
import { useDispatchNavLink } from "../reducers";

const GlobalContext = createContext<any>({});

export const useGlobal = () => {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children } : { children : any }) {
  const { state: navState, dispatchNavLink } = useDispatchNavLink();

  const value = {
    navState,
    dispatchNavLink,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
