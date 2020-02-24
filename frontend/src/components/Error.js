import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { setErrors } from './store/actions/index'

const Error = ({ errors, setErrors }) => {

  const hideError = (i) => {
    let temp = errors.slice();
    temp.splice(i, 1);
    setErrors(temp);
  }

  return (
    <div className="error">
      {
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={100}>
          {
            errors.map((error, i) =>
              <div
                className='toast toast-error error-child'
                key={i}
                onClick={() => hideError(i)}>
                {error.msg}
              </div>)
          }
        </ReactCSSTransitionGroup>
      }
    </div>
  );
}

const mapStateToProps = state => {
  return { errors: state.rootReducer.errors };
};

function mapDispatchToProps(dispatch) {
  return {
    setErrors: (errors) => dispatch(setErrors(errors))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
