import {
  GET_TEAMS,
  CREATE_TEAM,
  GET_TEAMS_NAMES,
  GET_MEMBERS,
  DELETE_TEAM,
  CLEAR_TEAM_LOADING,
  SET_TEAM_LOADING,
  GET_TEAM_ASSIGNMENTS
} from "../actions/types";

const initialState = {
  teams: [],
  teamsNames: [],
  loading: false,
  members: [],
  assignments: []
};

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_TEAM_LOADING:
      return {
        ...state,
        loading: false
      };
    case CREATE_TEAM:
      return {
        ...state,
        loading: false,
        teams: [...state.teams, action.payload]
      };
    case GET_TEAMS:
      return {
        ...state,
        loading: false,
        teams: action.payload
      };
    case GET_MEMBERS:
      return {
        ...state,
        loading: false,
        members: action.payload
      };
    case DELETE_TEAM:
      return {
        ...state,
        loading: false,
        teams: state.teams.filter(team => team._id !== action.payload._id)
      };
    case GET_TEAMS_NAMES:
      return {
        ...state,
        loading: false,
        teamsNames: action.payload
      };
    case GET_TEAM_ASSIGNMENTS:
      return {
        ...state,
        loading: false,
        assignments: action.payload
      };

    default:
      return state;
  }
}
