import React from 'react';
import requests from '../requests';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            categories: []
        };
        this.allCategories();
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const category = {
            name: this.state.name,
            number: this.state.number

        };
        requests
            .post('categories', { category })
            .then(console.log)
            .catch(console.error);
    };

    allCategories() {
      requests
          .post('allcategories', {})
          .then(res => {
            this.setState({
              categories: res.data.result
            });
          })
          .catch(console.error);
    };

    render() {
        return (
          <div>
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <p>category</p>
                    <input type="text" name="name" placeholder="name" onChange={this.handleChange} />
                    <input type="text" name="number" placeholder="number" onChange={this.handleChange} />
                    <button type="submit">Add category</button>
                </form>
            </div>
          </div>
        );
    }
}

export default Category;
