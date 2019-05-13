import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case PROFILE_NOT_FOUND:
      return { ...state, loading: false, profile: null };
    default:
      return state;
  }
}
