import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_USERS,
  STUDENT_DATA,
  SET_USER_LOADING,
  CLEAR_USER_LOADING,
  APPROVED_USER,
  GET_PROGRAMS,
  DELETE_USER,
  UPDATE_PERMISSION,
  CLEAR_ERRORS,
  GET_USER_DESIGNATIONS
} from "./types";

// @route   POST /api/v1/users/signup
// @desc    create new user
// @access  Public

export const createMultipleUsers = (users, clearState) => dispatch => {
  dispatch(setLoading());
  dispatch({
    type: CLEAR_ERRORS
  });
  axios
    .post("/api/v1/users/create-multiple-users", { users: users })
    .then(res => {
      dispatch(clearLoading());
      clearState();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(clearLoading());
    });
};

// @route   POST /api/v1/users/signup
// @desc    create new user
// @access  Public
export const registerUser = (userData, file, clearState) => dispatch => {
  const formData = new FormData();
  formData.append("fileUpload", file);
  formData.append("user", JSON.stringify(userData));
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  dispatch(setLoading());
  axios
    .post("/api/v1/users/signup", formData, config)
    .then(res => {
      clearState();
      dispatch({
        type: CLEAR_USER_LOADING
      });
    })
    .catch(err => {
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: CLEAR_USER_LOADING
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route   POST /api/v1/users/login
// @desc    Login in to get token
// @access  Public
export const loginUser = (userData, history) => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch(setLoading());
  axios
    .post("/api/v1/users/login", userData)
    .then(res => {
      // Save to localStorage

      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(clearLoading());
      history();
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
      // }
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch(setLoading());
  axios
    .get("/api/v1/users/current")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.data.user
      });
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

// @route       GET /api/v1/users
// @desc        get users
// @access      Private
export const getUsers = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch(setLoading());
  axios
    .get("/api/v1/users")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data.data.users
      });
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

// @route       GET /api/v1/users/findUser
// @desc        get user
// @access      Private
export const studentData = data => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch(setLoading());
  axios
    .post(`/api/v1/users/findUser`, data)
    .then(res => {
      dispatch({
        type: STUDENT_DATA,
        payload: res.data.data.user
      });
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

// @route       GET /api/v1/users/:role
// @desc        get users
// @access      Private
export const getAllUser = data => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/v1/users/${data}`)
    .then(res => {
      dispatch({
        type: STUDENT_DATA,
        payload: res.data.data.users
      });
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

// @route       POST /api/v1/users/approve
// @desc        approve user
// @access      Private
export const approveUser = user => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch(setLoading());
  axios
    .post("/api/v1/users/approve", user)
    .then(res => {
      dispatch({
        type: APPROVED_USER,
        payload: res.data.data.user
      });
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

// @route       PATCH /api/v1/users/updatePassword
// @desc        update password
// @access      Private
export const updatePassword = (data, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .patch("/api/v1/users/updatePassword", data)
    .then(res => {
      if (res) {
        clearState();

        dispatch(logoutUser());
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

// @route       GET /api/v1/users/getprograms
// @desc        get program and batch
// @access      Private
export const getPrograms = () => dispatch => {
  axios.get("/api/v1/users/getprograms").then(res => {
    if (res) {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data.data.programs
      });
    }
  });
};

// @route       GET /api/v1/users/designations
// @desc        get designation
// @access      Private
export const getDesignations = () => dispatch => {
  axios.get("/api/v1/users/designations").then(res => {
    if (res) {
      dispatch({
        type: GET_USER_DESIGNATIONS,
        payload: res.data.data.designations
      });
    }
  });
};

// @route       GET /api/v1/users/permission
// @desc        assign permissions
// @access      Private
export const assignPermission = (permission, clearState) => dispatch => {
  dispatch(clearLoading());
  axios
    .patch("/api/v1/users/permission", {
      id: permission.id,
      permissions: permission.permissions
    })
    .then(res => {
      dispatch({
        type: UPDATE_PERMISSION,
        payload: res.data.data.user
      });
      clearState();
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

// @route       GET /api/v1/users/changeuserrole
// @desc        assign permissions
// @access      Private
export const changeUserRole = data => dispatch => {
  dispatch(clearLoading());
  axios
    .patch("/api/v1/users/changeuserrole", {
      id: data.id,
      role: data.role
    })
    .then(res => {
      dispatch({
        type: UPDATE_PERMISSION,
        payload: res.data.data.user
      });
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

// @route       DELETE /api/v1/users/:id
// @desc        delete User
// @access      Private
export const deleteUser = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/users/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: res.data.data.user
      });
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
    type: SET_USER_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_USER_LOADING
  };
};
