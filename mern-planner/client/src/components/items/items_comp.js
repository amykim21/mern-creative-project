import React, { Component } from 'react';
import './items_comp.css';

// citation: https://www.youtube.com/watch?v=v0t42xBIYIs&t=1159s
class Items extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('/api/items')
        .then(res => res.json())
        .then(items => this.setState({items: items}, () => console.log('Items fetched...', items)));
    }

    render() {
        return (
            <div>
            <h2>Items</h2>
            <ul>
                {this.state.items.map(
                    item => 
                    <li key={item._id}>{item.name} {item.date}</li>
                )}
            </ul>
            </div>
        );
    }
  
}

export default Items;

// end of citation