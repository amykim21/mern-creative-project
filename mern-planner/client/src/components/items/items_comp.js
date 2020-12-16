import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from '../../material-ui/card.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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


export default function Items(props) {

    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
    const [repeatNum, setRepeatNum] = useState(0);
    const [repeatDays, setRepeatDays] = useState(0);

   // citation: https://material-ui.com/components/text-fields/
    return (
        <div>
        <h2>Items</h2>
        <form name="formname" onSubmit={e => {
            e.preventDefault();
            props.addItem(name, year, month, date, repeatNum, repeatDays);    
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
         <TextField 
        id="outlined-basic" 
        label="Repeat x Times" 
        variant="outlined"
        value={repeatNum}
        onChange={(e) => setRepeatNum(e.target.value)} 
        />
        <TextField 
        id="outlined-basic" 
        label="Every y Days" 
        variant="outlined"
        value={repeatDays}
        onChange={(e) => setRepeatDays(e.target.value)} 
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
                completeItem={props.completeItem}
                ></Item>
                </Grid>
            )}

        </Grid>

        </div>
    );
  
}

