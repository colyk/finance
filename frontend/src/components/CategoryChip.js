import React from 'react';
import { connect } from 'react-redux';
import { contrastTextColor } from './utils';

function CategoryChip({ categories, id, onSpanClick, onButtonClick }) {
  const item = categories.find(category => category._id === id);
  if (!item) return null;
  const style = {
    backgroundColor: item.color,
    color: contrastTextColor(item.color),
  };

  return (
    <span
      className="chip"
      style={style}
      onClick={onSpanClick ? e => onSpanClick(e.target.textContent) : null}
    >
      {item.type}
      {onButtonClick ? (
        <button className="btn btn-clear" aria-label="Close" onClick={onButtonClick}></button>
      ) : null}
    </span>
  );
}

function mapStateToProps(state) {
  return { categories: state.rootReducer.categories };
}

export default connect(mapStateToProps)(CategoryChip);
