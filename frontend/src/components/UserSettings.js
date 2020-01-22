import React from 'react';

function UserSettings() {
  return (
    <div className="container">
      <div className="columns">
        <div className="col-10 col-mx-auto">
          <p>Api key: {sessionStorage.api_key}</p>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
