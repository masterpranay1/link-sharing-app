import { useReducer } from "react";

export interface NavLinksState {
  id: string | null;
  previousId : string | undefined
}

interface Action {
  type: string;
}

export interface NavAction extends Action {
  id: string;
}

const NAVINITIALVALUE: NavLinksState = {
  id: 'links',
  previousId : undefined
};

function navLinksReducer(state: NavLinksState, action: NavAction) {
  switch (action.type) {
    case "update-link":
      return {
        ...state,
        id: action.id,
        previousId : state.id as string
      };
    default : 
      return state;
  }
}

function useDispatchNavLink() {
  const [state, dispatch] = useReducer(navLinksReducer, NAVINITIALVALUE);

  function dispatchNavLink(id : string) {
    dispatch({
      type: "update-link",
      id : id
    })
  } 

  return {
    dispatchNavLink,
    state
  };
}

export {
  useDispatchNavLink
}
