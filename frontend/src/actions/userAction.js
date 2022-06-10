import axios from 'axios';
import {
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });

    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.message,
    });
  }
};
