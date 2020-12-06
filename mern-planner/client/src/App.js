import React, { Component } from 'react';
import './App.css';
import Items from './components/items/items_comp';

// changed from function App() to class App extends Component
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello</h1>
//     </div>
//   );
// }

class App extends Component {
  render() {
      return (
    <div className="App">
      <h1>Hello</h1>
      <Items></Items>
    </div>
  );
  }
}

export default App;
