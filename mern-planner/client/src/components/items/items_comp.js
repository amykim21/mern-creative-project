import React, { Component } from 'react';
import './items_comp.css';

// citation: https://www.youtube.com/watch?v=v0t42xBIYIs&t=1159s
class Items extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        // todo: create popup asking for name of the item
    
        const body = { name: 'new item4' };
        fetch('http://localhost:5000/api/items/insert', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }) // localhost part not necessary because of proxy in package.json
        .then(res => res.json())
        .then(item => {
            let newItems = [...this.state.items];
            newItems.push(item);
            this.setState({items: newItems});
            console.log('Items fetched...', item);
        });
      }

    componentDidMount() {
        fetch('/api/items') // localhost part not necessary because of proxy in package.json
        .then(res => res.json())
        .then(items => this.setState({items: items}, () => console.log('Items fetched...', items)));
    }

    render() {
        return (
            <div>
            <h2>Items</h2>
            <button onClick={this.addItem}>Add Item</button>
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