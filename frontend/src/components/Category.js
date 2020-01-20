import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from './store/actions/index';

import { TwitterPicker } from 'react-color';

import requests from '../requests';

import '../styles/category.css';

const Category = ({ categories, fetchCategories }) => {
  const [selectedCategory, setCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onCategoryCreate = () => {
    fetchCategories();
    setCategory(null);
  };

  return (
    <div className="container c--category">
      <div className="columns m-2">
        <div className="column my-2 col-5 col-mx-auto col-md-10">
          {selectedCategory ? (
            <CategoryEditForm
              category={categories.find(({ type }) => type === selectedCategory)}
              onCategoryCreate={onCategoryCreate}
            />
          ) : (
            <CategoryCreateForm onCategoryCreate={onCategoryCreate} />
          )}
        </div>
        <div className="column my-2 col-5 col-mx-auto col-md-10">
          {categories.map(category => (
            <Chip
              title={category.type}
              color={category.color}
              key={category._id}
              onCategorySelect={setCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryCreateForm = ({ onCategoryCreate }) => {
  const [type, setType] = useState('');
  // https://mokole.com/palette.html
  const [color, setColor] = useState('#FF6900');
  const [loading, setLoading] = useState(false);

  const onCreateClick = () => {
    setLoading(true);
    const upperType = type.toUpperCase();
    requests
      .post('/category', { type: upperType, color })
      .then(() => {
        onCategoryCreate();
        setType('');
        setColor('#FF6900');
        setLoading(false);
      })
      .catch(console.log);
  };

  return (
    <div
      className={`panel ${loading ? 'loading' : ''}`}
      style={{ boxShadow: `inset 0px 8px 0px 0px ${color}` }}
    >
      <div className="panel-body mt-2">
        <div className="tile tile-centered mt-2">
          <div className="tile-content">
            <div className="tile-title text-bold">Category type</div>
            <div className="tile-subtitle my-2">
              <input
                className="form-input"
                type="text"
                value={type}
                placeholder={'restaurant'}
                onChange={e => setType(e.target.value)}
              />
            </div>
            <div className="tile-title text-bold">Color</div>
            <div className="tile-subtitle my-2">
              <TwitterPicker
                width={'100%'}
                triangle={'hide'}
                color={color}
                onChange={color => setColor(color.hex)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="float-right">
          <button className="btn btn-primary" onClick={onCreateClick}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryEditForm = ({ category, onCategoryCreate }) => {
  const [newType, setNewType] = useState(category.type);
  const [newColor, setNewColor] = useState(category.color);

  useEffect(() => {
    setNewType(category.type);
    setNewColor(category.color);
  }, [category]);

  const [loading, setLoading] = useState(false);

  const onUpdateClick = () => {
    setLoading(true);
    const upperType = newType.toUpperCase();
    requests
      .put('/category', { oldType: category.type, type: upperType, color: newColor })
      .then(() => {
        setLoading(false);
        onCategoryCreate();
      })
      .catch(console.log);
  };

  const onRemoveClick = () => {
    setLoading(true);
    requests
      .delete('/category', { params: { type: category.type } })
      .then(() => {
        setLoading(false);
        onCategoryCreate();
      })
      .catch(console.log);
  };

  return (
    <div
      className={`panel ${loading ? 'loading' : ''}`}
      style={{ boxShadow: `inset 0px 8px 0px 0px ${newColor}` }}
    >
      <div className="panel-body mt-2">
        <div className="tile tile-centered mt-2">
          <div className="tile-content">
            <div className="tile-title text-bold">Category type</div>
            <div className="tile-subtitle my-2">
              <input
                className="form-input"
                type="text"
                value={newType}
                placeholder={'restaurant'}
                onChange={e => setNewType(e.target.value)}
              />
            </div>
            <div className="tile-title text-bold">Color</div>
            <div className="tile-subtitle my-2">
              <TwitterPicker
                width={'100%'}
                triangle={'hide'}
                color={newColor}
                onChange={color => setNewColor(color.hex)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="float-right">
          <button className="btn btn-primary mr-2" onClick={onUpdateClick}>
            Update
          </button>
          <button className="btn btn-error btn-error-secondary" onClick={onRemoveClick}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Chip = ({ title, color, onCategorySelect }) => {
  const style = { backgroundColor: color, color: contrastTextColor(color) };

  return (
    <span className="chip m-2" style={style} onClick={e => onCategorySelect(e.target.textContent)}>
      {title}
    </span>
  );
};

function contrastTextColor(bgColor) {
  var nThreshold = 105;
  var components = getRGBComponents(bgColor);
  var bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
}

function getRGBComponents(color) {
  var r = color.substring(1, 3);
  var g = color.substring(3, 5);
  var b = color.substring(5, 7);

  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16),
  };
}

const mapStateToProps = state => {
  return {
    categories: state.rootReducer.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
