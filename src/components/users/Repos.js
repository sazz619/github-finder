import React from 'react';

function Repos({ repos }) {
  if (!repos) return null;
  return repos.map((repo) => {
    return (
      <div key={repo.id} className='card'>
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
      </div>
    );
  });
}

export default Repos;
