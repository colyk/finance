import React from 'react';

function UserSettings() {
  return (
    <div className="container mt-2" style={{ height: '630px' }}>
      <div className="modal-overlay"></div>
      <div className="columns">
        <div className="col-8 col-mx-auto">
          <div className="panel p-2">
            <div className="panel-header text-center">
              <div className="panel-title h3">User settings</div>
            </div>
            <Field label={'Api key'} Component={() => <span>{sessionStorage.api_key}</span>} />
            <Field
              label={'Account'}
              Component={() => (
                <button className="btn btn-error" style={{ width: '100%' }}>
                  Delete account
                </button>
              )}
            />
            <Field
              label={'Backup data'}
              Component={() => (
                <div style={{ textAlign: 'center' }}>
                  <button className="btn btn-primary mx-2" style={{ width: '45%' }}>
                    Load data
                  </button>
                  <button className="btn btn-primary mx-2" style={{ width: '45%' }}>
                    Save data
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Field = React.memo(({ Component, label }) => {
  return (
    <div className="tile tile-centered mt-2">
      <div className="tile-content">
        <div className="tile-title text-bold mb-1">{label}</div>
        <div className="tile-subtitle mb-2">
          <Component />
        </div>
      </div>
    </div>
  );
});

export default UserSettings;
