import {
  GET_ERRORS,
  GET_TEAMS,
  CREATE_TEAM,
  GET_TEAMS_NAMES,
  GET_MEMBERS,
  DELETE_TEAM,
  CLEAR_TEAM_LOADING,
  SET_TEAM_LOADING,
  GET_TEAM_ASSIGNMENTS
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";
// @route         CREATE /api/v1/team
// @desc          create team
// @access        Private
export const createTeam = team => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/team", team)
    .then(res => {
      if (res) {
        dispatch({
          type: CREATE_TEAM,
          payload: res.data.data.team
        });
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team//teamnames
// @desc          get teams names
// @access        Private
export const getTeamsNames = () => dispatch => {
  axiosInstance
    .get("/api/v1/team/teamnames")
    .then(res => {
      if (res) {
        dispatch({
          type: GET_TEAMS_NAMES,
          payload: res.data.data.names
        });
      }
    })
    .catch(err => {
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team
// @desc          get teams
// @access        Private
export const getTeams = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/team")
    .then(res => {
      if (res) {
        dispatch({
          type: GET_TEAMS,
          payload: res.data.data.teams
        });
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         DELETE /api/v1/team/:id
// @desc          delete team
// @access        Private
export const deleteTeam = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/team/${id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_TEAM,
          payload: res.data.data.team
        });
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team/members/:teamName/:batch
// @desc          get members
// @access        Private
export const getMember = team => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get(`/api/v1/team/members/${team.teamName}/${team.batch}`)
    .then(res => {
      if (res) {
        dispatch({
          type: GET_MEMBERS,
          payload: res.data.data.members
        });
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// @route         CREATE /api/v1/team/member
// @desc          add member to existed team
// @access        Private
export const addMember = (member, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post(`/api/v1/team/member`, member)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        clearState();
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team/assignment
// @desc          get assignments
// @access        Private
export const getTeamAssignments = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/team/assignment")
    .then(res => {
      if (res) {
        dispatch({
          type: GET_TEAM_ASSIGNMENTS,
          payload: res.data.data.assignments
        });
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         CREATE /api/v1/team/assignment
// @desc          add assignment to existed team
// @access        Private
export const createTeamAssignment = (
  assignment,
  file,
  clearState
) => dispatch => {
  const formData = new FormData();

  formData.append("fileUpload", file);
  formData.append("assignment", JSON.stringify(assignment));

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/team/assignment", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch(getTeamAssignments());
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team/assignment/:teamID/:assignmentID
// @desc          delete assignments
// @access        Private
export const deleteAssignment = assignment => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(
      `/api/v1/team/assignment/${assignment.teamID}/${assignment.assignmentID}`
    )
    .then(res => {
      if (res) {
        dispatch(getTeamAssignments());
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         GET /api/v1/team/deletemember/:teamID/:memberID
// @desc          delete member
// @access        Private
export const deleteMember = member => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/team/deletemember/${member.teamID}/${member.memberID}`)
    .then(res => {
      if (res) {
        dispatch(getMember(member));
      }
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

const setLoading = () => {
  return {
    type: SET_TEAM_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_TEAM_LOADING
  };
};
