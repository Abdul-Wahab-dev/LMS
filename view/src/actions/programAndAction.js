import {
  GET_PROGRAMS_,
  GET_BATCHS,
  CREATE_PROGRAM,
  CREATE_BATCH,
  DELETE_PROGRAMS,
  DELETE_BATCH,
  GET_ERRORS,
  CLEAR_PROGRAM_LOADING,
  SET_PROGRAM_LOADING
} from "./types";

import axios from "axios";

export const createProgram = (program, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/v1/programandbatch/program", program)
    .then(res => {
      dispatch({
        type: CREATE_PROGRAM,
        payload: res.data.data.program
      });
      clearState();
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPrograms = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/v1/programandbatch/program")
    .then(res => {
      dispatch({
        type: GET_PROGRAMS_,
        payload: res.data.data.programs
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteProgram = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/programandbatch/program/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PROGRAMS,
        payload: res.data.data.program
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createBatch = (batch, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/v1/programandbatch/batch", batch)
    .then(res => {
      dispatch({
        type: CREATE_BATCH,
        payload: res.data.data.batch
      });
      clearState();
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getBatchs = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/v1/programandbatch/batch")
    .then(res => {
      dispatch({
        type: GET_BATCHS,
        payload: res.data.data.batchs
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteBatch = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/programandbatch/batch/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_BATCH,
        payload: res.data.data.batch
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

const setLoading = () => {
  return {
    type: SET_PROGRAM_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_PROGRAM_LOADING
  };
};
