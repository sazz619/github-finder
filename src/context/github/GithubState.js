import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  GET_USER,
  SEARCH_USERS,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
} from '../types/types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers = async (text) => {
    //setLoading(true);
    setLoading();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&&client_secret=${githubClientSecret}`
    );
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
    // setUsers(response.data.items);
    // setShowClear(response.data.items.length > 0);
  };

  //get users
  const getUser = async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&&client_secret=${githubClientSecret}`
    );
    dispatch({ type: GET_USER, payload: response.data });
  };

  //get repos
  const getUserRepos = async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&&client_secret=${githubClientSecret}`
    );
    dispatch({ type: GET_REPOS, payload: response.data });
  };

  //clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
