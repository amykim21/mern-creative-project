import React, { Component, useState, useContext, useEffect } from 'react';
import { UserContext } from "../../App";
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
export default function Items() {
    // const user = useContext(UserContext);
    const { username, setUsername } = useContext(UserContext);
    const [items, setItems] = useState([]);

    // constructor() {
    //     super();
    //     this.state = {
    //         items: []
    //     }

    //     this.addItem = this.addItem.bind(this);
    // }

    // version that adds to a user document
    function addItem() {
        // todo: create popup asking for name of the item
        console.log("items_comp user: " + username);
        const newItems = items;
        newItems.push({ name: "test1" });
        const body = { username: username, newItems: newItems };
        fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }) // localhost part not necessary because of proxy in package.json
        .then(res => res.json())
        .then(item => {
            // let newItems = items;
            // newItems.push(item);
            setItems([...newItems]);
            console.log('Item added...', item);
        })
        .catch(err => {
            console.log('error: ' + err);
        });
    }

    useEffect(() => {
        console.log("inside useEffect");
        // const body = { username: username };
        fetch('http://localhost:5000/api/items', {
            method: 'GET',
            // body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                username: username
            },
        })
        .then(res => res.json())
        .then(dbItems => {
            setItems(dbItems);
            console.log("Items fetched...", dbItems);
        })
        .catch(err => console.log(err));
    }, []);
    // reference: https://stackoverflow.com/questions/53243203/react-hook-useeffect-runs-continuously-forever-infinite-loop



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
            <button onClick={addItem}>Add Item</button>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            >
                {items.map(
                    item =>
                    <Grid key={item._id} item xs={12}>
                    <Item key={item._id} item={item}></Item>
                    </Grid>
                )}

            </Grid>

            </div>
        );
  
}


// export default Items;

// end of citation