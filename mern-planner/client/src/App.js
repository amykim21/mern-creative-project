import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Items from './components/items/items_comp';
import LoginSignup from './material-ui/loginsignup.jsx'

import { withStyles } from '@material-ui/core/styles';


// import { makeStyles } from '@material-ui/core/styles';
import Header from './material-ui/appbar.jsx';
// import Item from './material-ui/card.jsx';
// import Grid from '@material-ui/core/Grid';

// changed from function App() to class App extends Component
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello</h1>
//     </div>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   item: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// function App() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//     <Header></Header>
//     <Grid
//       container
//       direction="column"
//       justify="center"
//       alignItems="center"
//       spacing={2}
//       >
//         <Grid item xs={12}>
//         <Item className={classes.item}></Item>
//         </Grid>
//         <Grid item xs={12}>
//         <Item></Item>
//         </Grid>
//       {/* <Item></Item>
//       <Item></Item> */}
//     </Grid>
//     </div>
//   );
// }

const styles = theme => ({
  root: {
    // backgroundColor: "red"
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = {
       
    }
  }

  componentDidMount() {
    // LoginSignup
  }
  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <Header></Header>
          <h1>Planner</h1>
          <Route exact path="/login_signup">
            <LoginSignup></LoginSignup>
          </Route>
          <Route exact path="/">
            <Items></Items>
          </Route>
          {/* <Items user_id="Amy"></Items> */}
        </Router>
      </div>
    );
  }
}

// export default App;
// citation: https://stackoverflow.com/questions/56554586/how-to-use-usestyle-to-style-class-component-in-material-ui
export default withStyles(styles)(App);
// end of citation