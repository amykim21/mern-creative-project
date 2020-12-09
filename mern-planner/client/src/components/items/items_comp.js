import React, { Component } from 'react';
import './items_comp.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from '../../material-ui/card.jsx';


const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  });

// citation: https://www.youtube.com/watch?v=v0t42xBIYIs&t=1159s
class Items extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
    }

    // version that adds to a user document
    addItem() {
        // todo: create popup asking for name of the item
    
        console.log(this.props.username);
        const newItems = [...this.state.items];
        newItems.push({ name: "test1" });
        const body = { username: 'q', newItems: newItems };
        fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
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

    // version with onSubmit
    // addItem(e) {
    //     e.preventDefault();
    //     // todo: create popup asking for name of the item
    
    //     const body = { name: 'new item4' };
    //     fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
    //       method: 'POST',
    //       body: JSON.stringify(body),
    //       headers: { 'Content-Type': 'application/json' },
    //     }) // localhost part not necessary because of proxy in package.json
    //     .then(res => res.json())
    //     .then(item => {
    //         let newItems = [...this.state.items];
    //         newItems.push(item);
    //         this.setState({items: newItems});
    //         console.log('Items fetched...', item);
    //     });
    // }

    // addItem() {
    //     // todo: create popup asking for name of the item
    
    //     const body = { name: 'new item4' };
    //     fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
    //       method: 'POST',
    //       body: JSON.stringify(body),
    //       headers: { 'Content-Type': 'application/json' },
    //     }) // localhost part not necessary because of proxy in package.json
    //     .then(res => res.json())
    //     .then(item => {
    //         let newItems = [...this.state.items];
    //         newItems.push(item);
    //         this.setState({items: newItems});
    //         console.log('Items fetched...', item);
    //     });
    // }

    componentDidMount() {
        // fetch('/api/items') // localhost part not necessary because of proxy in package.json
        // .then(res => res.json())
        // .then(items => this.setState({items: items}, () => console.log('Items fetched...', items)));
    }

    render() {
        // const { classes } = this.props;

        return (
            <div>
            <h2>Items</h2>
            {/* <form onSubmit={this.addItem}>
                <input
                // value={todoText}
                // onChange={(e) => setTodoText(e.target.value)}
                type="text"
                ></input>
                <button type="submit">Add</button>
            </form> */}
            <button onClick={this.addItem}>Add Item</button>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            >
                {this.state.items.map(
                    item =>
                    <Grid key={item._id} item xs={12}>
                    <Item key={item._id} item={item}></Item>
                    {/* <Item className={classes.item} key={item._id} item={item}>{item.name} {item.date}</Item> */}
                    </Grid>
                    // <li key={item._id}>{item.name} {item.date}</li>
                )}
                {/* <Grid item xs={12}>
                <Item className={classes.item}></Item>
                </Grid>
                <Grid item xs={12}>
                <Item></Item>
                </Grid> */}
            {/* <Item></Item>
            <Item></Item> */}
            </Grid>
            {/* <ul>
                {this.state.items.map(
                    item => 
                    <li key={item._id}>{item.name} {item.date}</li>
                )}
            </ul> */}
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //         <h2>Items</h2>
    //         <button onClick={this.addItem}>Add Item</button>
    //         <ul>
    //             {this.state.items.map(
    //                 item => 
    //                 <li key={item._id}>{item.name} {item.date}</li>
    //             )}
    //         </ul>
    //         </div>
    //     );
    // }
  
}

export default Items;

// end of citation