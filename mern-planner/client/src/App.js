import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Items from './components/items/items_comp';
import LoginSignup from './material-ui/loginsignup.jsx';
import { withStyles } from '@material-ui/core/styles';


import Header from './material-ui/appbar.jsx';

export const UserContext = React.createContext({
  username: "default",
  setUsername: () => {}
}); // for passing user information throughout pages




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
       allItems: [],
       date: new Date(),
    }
    this.setUsername = this.setUsername.bind(this);
    this.setItems = this.setItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.setPlannerDate = this.setPlannerDate.bind(this);
  }

  setUsername(username) {
    console.log("setusername");
    fetch('/api/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                username: username
            },
        })
        .then(res => res.json())
        .then(dbItems => {
          this.setState({ 
            username: username, 
            allItems: dbItems,
            items: dbItems.filter(i => {
              const iDate = new Date(i.date);
              return (
                iDate.getFullYear() === this.state.date.getFullYear() &&
                iDate.getMonth() === this.state.date.getMonth() &&
                iDate.getDate() === this.state.date.getDate()
              );
            })
          });
          console.log("Items fetched...", dbItems);
        })
        .catch(err => console.log(err));
      
  }



  setItems(items) {
    this.setState({username: this.state.username, items: items});
  }

    addItem(name, y, m, d, repeatNum, repeatDays) {
        const body = {
          username: this.state.username,
          newItem: { name: name, date: new Date(y, m, d) },
          repeatNum: repeatNum, 
          repeatDays: repeatDays 
        };

        fetch('/api/items/insert', { // http://localhost:5000/api/items/insert
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }) // localhost part not necessary because of proxy in package.json
        .then(res => res.json())
        .then(items => {   
            this.setState({ 
              allItems: items,
              items: items.filter(i => {
                const iDate = new Date(i.date);
                return (
                  iDate.getFullYear() === this.state.date.getFullYear() &&
                  iDate.getMonth() === this.state.date.getMonth() &&
                  iDate.getDate() === this.state.date.getDate()
                );
              })
            });
            console.log('Item added...', items);
        })
        .catch(err => {
            console.log('error: ' + err);
        });


    }

  updateItem(id, name, answer) {
    console.log("ID NAME ANS: " + id + " " + name + " " + answer);
    const body = { username: this.state.username, _id: id, name: name, answer: answer };

    fetch('/api/items/update', { // http://localhost:5000/api/items/update
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }) // localhost part not necessary because of proxy in package.json
    .then(res => res.json())
    .then(items => {
        this.setState({
          allItems: items,
          items: items.filter(i => {
            const iDate = new Date(i.date);
            
            return (
              iDate.getFullYear() === this.state.date.getFullYear() &&
              iDate.getMonth() === this.state.date.getMonth() &&
              iDate.getDate() === this.state.date.getDate()
            );
          })
        });
        console.log('Item edited...', items);
    })
    .catch(err => {
        console.log('error: ' + err);
    });
  }

  deleteItem(id) {
    const body = { username: this.state.username, _id: id };

    fetch('/api/items/delete', { // http://localhost:5000/api/items/delete
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }) // localhost part not necessary because of proxy in package.json
    .then(res => res.json())
    .then(items => {
        this.setState({ 
          allItems: items,
          items: items.filter(i => {
            const iDate = new Date(i.date);
            
            return (
              iDate.getFullYear() === this.state.date.getFullYear() &&
              iDate.getMonth() === this.state.date.getMonth() &&
              iDate.getDate() === this.state.date.getDate()
            );
          })
        });
        console.log('Item deleted...', items);
    })
    .catch(err => {
        console.log('error: ' + err);
    });
  }

  completeItem(id) {
    const body = { username: this.state.username, _id: id};

    fetch('/api/items/complete', { // http://localhost:5000/api/items/complete
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }) // localhost part not necessary because of proxy in package.json
    .then(res => res.json())
    .then(items => {
        this.setState({
          allItems: items,
          items: items.filter(i => {
            const iDate = new Date(i.date);
            return (
              iDate.getFullYear() === this.state.date.getFullYear() &&
              iDate.getMonth() === this.state.date.getMonth() &&
              iDate.getDate() === this.state.date.getDate()
            );
          })
        });
        console.log('Item completed...', items);
    })
    .catch(err => {
        console.log('error: ' + err);
    });
  }

  setPlannerDate(date) {
    this.setState({
      date: date,
      items: this.state.allItems.filter(i => {
        const iDate = new Date(i.date);
        return (
          iDate.getFullYear() === date.getFullYear() &&
          iDate.getMonth() === date.getMonth() &&
          iDate.getDate() === date.getDate()
        );
      })
    });
  }



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <Header
            setPlannerDate={(date) => 
              this.setPlannerDate(date)
            }
          ></Header>
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
            addItem={(name, y, m, d, repeatNum, repeatDays) => {
              this.addItem(name, parseInt(y), parseInt(m)-1, parseInt(d), parseInt(repeatNum), parseInt(repeatDays));
            }}
            updateItem={(id, name, answer) => this.updateItem(id, name, answer)}
            deleteItem={(id) => this.deleteItem(id)}
            completeItem={(id) => this.completeItem(id)}
            >
              </Items> 
          </Route>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);

