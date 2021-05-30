import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from './Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { loading, getUserRepos, getUser, repos } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []); // blank array to mimick componentDidMount

  const {
    login,
    avatar_url,
    html_url,
    bio,
    followers,
    following,
    public_repos,
    hireable,
    company,
    website,
    location,
    public_gists,
  } = githubContext.user;

  if (loading) return <Spinner></Spinner>;
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable : {''}
      {hireable ? (
        <i alt='success' className='fas fa-check text-success'></i>
      ) : (
        <i alt='failure' className='fas fa-times-circle text-danger'></i>
      )}
      <div className='grid-2 card'>
        <div className='all-center'>
          <img
            alt='profile'
            src={avatar_url}
            className='round-img'
            style={{ width: '150px' }}
          ></img>
          <h3>{login}</h3>
          <h4>{location}</h4>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <h4>{bio}</h4>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark m-1'>
            {' '}
            visit gitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Login:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {website && (
                <Fragment>
                  <strong>Website:</strong> {website}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-danger'>Public repos: {public_repos}</div>
        <div className='badge badge-dark'>Public gist: {public_gists}</div>
      </div>
      <Repos repos={repos}></Repos>
    </Fragment>
  );
};

export default User;
