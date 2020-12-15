import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    minWidth: 200,
    backgroundColor: "#90ee90",
    width: "90%",
    // display: "flex",
    // flexDirection: "column",
    // alignSelf: "center",
    // justifyContent: "center"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newAns, setNewAns] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
          {props.item.name}
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
          {props.item.date.toString().substring(0, 10)}
        </Typography>
        <Typography variant="body1" component="p">
          {props.item.answer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" 
          onClick={() => 
            handleClickOpen()
          }
        >Edit</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              // autoFocus
              margin="dense"
              id="answer"
              label="Answer"
              type="text"
              fullWidth
              value={newAns}
              onChange={(e) => setNewAns(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button 
                onClick={() => {
                  console.log('inside onClick: ' + props.item._id + " " + newName + " " + newAns);
                  props.updateItem(props.item._id, newName, newAns);
                  handleClose()
                }} 
                color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>

        <Button 
          size="small"
          onClick={() => {
            console.log('inside delete: ' + props.item._id);
            props.deleteItem(props.item._id);
          }}
        >Delete</Button>
      </CardActions>
    </Card>
  );
}
