import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
    this.hideError = this.hideError.bind(this);
  }

  hideError(i) {
    let temp = this.state.errors.slice();
    temp.splice(i, 1);
    this.setState({ errors: temp });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState((state, props) => {
        return { errors: props.errors };
      });
    }
  }

  render() {
    const errs = this.state.errors.map((error, i) =>
      <div
        className='toast toast-error error-child'
        key={i}
        onClick={() => this.hideError(i)}>
        {error.msg}
      </div>
    )
    return (
      <div className="error">
        {
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={100}>
            {errs}
          </ReactCSSTransitionGroup>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errors: state.rootReducer.errors };
};

export default connect(mapStateToProps)(Error);
