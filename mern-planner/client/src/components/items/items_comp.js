import React, { Component, useState, useContext, useEffect } from 'react';
import { UserContext } from "../../App";
import './items_comp.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from '../../material-ui/card.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import AddForm from '../../material-ui/addform.jsx';


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
export default function Items(props) {

    // wah
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");

    // version that adds to a user document
    // function addItem() {
    //     const username = props.username;
    //     // todo: create popup asking for name of the item
    //     console.log("items_comp user: " + username);
    //     const newItems = items;
    //     console.log("item name: " + name);
    //     newItems.push({ name: name });
    //     const body = { username: username, newItems: newItems };
    //     fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
    //       method: 'POST',
    //       body: JSON.stringify(body),
    //       headers: { 'Content-Type': 'application/json' },
    //     }) // localhost part not necessary because of proxy in package.json
    //     .then(res => res.json())
    //     .then(item => {
    //         // let newItems = items;
    //         // newItems.push(item);
    //         setItems([...newItems]);
    //         console.log('Item added...', item);
    //     })
    //     .catch(err => {
    //         console.log('error: ' + err);
    //     });


    // }

    // useEffect(() => {
    // componentDidMount() {
        // const username = props.username;
        // console.log("inside useEffect: " + username);
        // !! username is "" here
        // const body = { username: username };
        // fetch(`http://localhost:5000/api/items?username=${username}`, {
        // fetch('http://localhost:5000/api/items', {
        //     method: 'GET',
        //     // body: JSON.stringify(body),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         username: username
        //     },
        // })
        // .then(res => res.json())
        // .then(dbItems => {
        //     setItems([...dbItems]);
        //     console.log("HERE: " + items);
        //     console.log("Items fetched...", dbItems);
        // })
        // .catch(err => console.log(err));
        // console.log("HERE: " + items);
    // }
    // }, []);
    // reference: https://stackoverflow.com/questions/53243203/react-hook-useeffect-runs-continuously-forever-infinite-loop


    // render() {
        // console.log("items comp: ", props.items);
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
            {/* <button onClick={addItem}>Add Item</button> */}
            {/* <AddForm 
            // onChange={(e) => console.log(e.target.value)}
            onClick={addItem}></AddForm> */}
            {/* <form onSubmit={() => props.addItem(name)} noValidate autoComplete="off"> */}
            <form name="formname" onSubmit={e => {
                e.preventDefault();
                props.addItem(name, year, month, date);    
            }}>
            <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
            <TextField 
            id="outlined-basic" 
            label="Year" 
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)} 
            />
            <TextField 
            id="outlined-basic" 
            label="Month" 
            variant="outlined"
            value={month}
            onChange={(e) => setMonth(e.target.value)} 
            />
            <TextField 
            id="outlined-basic" 
            label="Date" 
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            />
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    >
                    Add Item
                </Button>
            </form>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            >
                {props.items.map(
                    item =>
                    <Grid key={item._id} item xs={12}>
                    <Item key={item._id}
                    item={item}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                    ></Item>
                    </Grid>
                )}

            </Grid>

            </div>
        );
    // }
  
}



// export default Items;

// end of citation