import { createContext, useContext } from "react";
import { useDispatchNavLink, useDispatchUser } from "../reducers";

const GlobalContext = createContext<any>({});

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export function GlobalProvider({ children }: { children: any }) {
  const { state: navState, dispatchNavLink } = useDispatchNavLink();
  const { state: userState, dispatchUser } = useDispatchUser();

  const value = {
    navState,
    dispatchNavLink,
    userState,
    dispatchUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
