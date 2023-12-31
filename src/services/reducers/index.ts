import { useReducer } from "react";
import {
  getUserStore,
  setUserStore,
  getLinkStore,
  setLinkStore,
} from "../localstore";

export interface NavLinksState {
  id: string | null;
  previousId: string | undefined;
}

interface Action {
  type: string;
}

export interface NavAction extends Action {
  id: string;
}

const NAVINITIALVALUE: NavLinksState = getLinkStore();

export interface UserState {
  id: string | null;
}

export interface UserAction extends Action {
  id: string;
}

const USERINITIALVALUE: UserState = getUserStore();

function navLinksReducer(state: NavLinksState, action: NavAction) {
  switch (action.type) {
    case "update-link":
      setLinkStore(action.id, state.id as string);
      return {
        ...state,
        id: action.id,
        previousId: state.id as string,
      };
    default:
      return state;
  }
}

function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "update-user":
      setUserStore(action.id);
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
}

function useDispatchNavLink() {
  const [state, dispatch] = useReducer(navLinksReducer, NAVINITIALVALUE);

  function dispatchNavLink(id: string) {
    dispatch({
      type: "update-link",
      id: id,
    });
  }

  return {
    dispatchNavLink,
    state,
  };
}

function useDispatchUser() {
  const [state, dispatch] = useReducer(userReducer, USERINITIALVALUE);

  function dispatchUser(id: string) {
    dispatch({
      type: "update-user",
      id: id,
    });
  }

  return {
    dispatchUser,
    state,
  };
}

export { useDispatchNavLink, useDispatchUser };
