import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Items from './components/items/items_comp';
import LoginSignup from './material-ui/loginsignup.jsx';
import FormDialog from './material-ui/formdialog';

import { withStyles } from '@material-ui/core/styles';


// import { makeStyles } from '@material-ui/core/styles';
import Header from './material-ui/appbar.jsx';

export const UserContext = React.createContext({
  username: "default",
  setUsername: () => {}
}); // for passing user information throughout pages

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
       username: "",
       items: [],
      //  setUsername: (username) => {
      //   console.log("inside setUsername"); 
      //   this.setState({/*...this.state, */username: username, setUsername: this.state.setUsername})
      // }
    }
    this.setUsername = this.setUsername.bind(this);
    this.setItems = this.setItems.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  // componentWillMount

  // componentDidMount, call setUsername

  // or stop page from refreshing

  setUsername(username) {
    console.log("setusername");
    // this.setState({username: username, items: this.state.items});
    fetch('/api/items', {
            method: 'GET',
            // body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                username: username
            },
        })
        .then(res => res.json())
        .then(dbItems => {
          this.setState({ username: username, items: dbItems });
          console.log("Items fetched...", dbItems);
        })
        .catch(err => console.log(err));
      
  }

  setItems(items) {
    this.setState({username: this.state.username, items: items});
  }

  // componentDidMount() {
  //   console.log("compdidmount");
    // if(this.state.username !== "") {
    //   console.log("inside if");
    // GET request
    // fetch('http://localhost:5000/api/items', {
    //         method: 'GET',
    //         // body: JSON.stringify(body),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             username: this.state.username
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(dbItems => {
    //       this.setState({ username: this.state.username, items: dbItems });
    //       console.log("Items fetched...", dbItems);
    //     })
    //     .catch(err => console.log(err));
    //   }
  // }

  // ?? all fetches done in App.js

      // version that adds to a user document
    addItem(name) {
        // todo: create popup asking for name of the item
        // let newItems = this.state.items;
        // newItems.push({ name: name });
        // const body = { username: this.state.username, newItems: newItems };
        console.log("addItem username: " + this.state.username);
        const body = { username: this.state.username, newItem: { name: name } };

        fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }) // localhost part not necessary because of proxy in package.json
        .then(res => res.json())
        .then(items => {
            // let newItems = items;
            // newItems.push(item);
            // let copy = [...this.state.items, item];
            // this.setState({ username: this.state.username, items: copy });
            this.setState({ username: this.state.username, items: items });

            console.log('Item added...', items);
        })
        .catch(err => {
            console.log('error: ' + err);
        });


    }

  updateItem(id, name, answer) {
    // console.log("updateItem: " + this.state.username);
    console.log("ID NAME ANS: " + id + " " + name + " " + answer);
    const body = { username: this.state.username, _id: id, name: name, answer: answer };

    fetch('/api/items/update', { // http://localhost:5000/api/items/update
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }) // localhost part not necessary because of proxy in package.json
    .then(res => res.json())
    .then(items => {
        this.setState({ username: this.state.username, items: items });
        console.log('Item edited...', items);
    })
    .catch(err => {
        console.log('error: ' + err);
    });
  }



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <Header></Header>
          <h1>Planner</h1>
          <UserContext.Provider
          value={this.state}>
          <Route exact path="/login_signup">
            <LoginSignup setUsername={(username) => 
                this.setUsername(username)
            }></LoginSignup>
          </Route>
          <Route exact path="/">
            <Items username={this.state.username} 
            items={this.state.items} 
            addItem={(name) => this.addItem(name)}
            updateItem={(id, name, answer) => this.updateItem(id, name, answer)}
            >
              </Items> 
          </Route>
          </UserContext.Provider>
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

