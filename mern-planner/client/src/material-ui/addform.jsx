// citation: https://material-ui.com/components/text-fields/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '70ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
      id="outlined-basic" 
      label="Name" 
      variant="outlined"
    //   value={name}
    //   onChange={(e) => setName(e.target.value)} 
      />
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Add Item
        </Button>
    </form>
  );
}

// end of citation