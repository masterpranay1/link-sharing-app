import { useReducer } from "react";

interface NavLinksState {
  id: string | null;
}

interface Action {
  type: string;
}

interface NavAction extends Action {
  id: string;
}

const NAVINITIALVALUE: { id: string | null } = {
  id: 'links',
};

function navLinksReducer(state: NavLinksState, action: NavAction) {
  switch (action.type) {
    case "update-link":
      return {
        ...state,
        id: action.id,
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
