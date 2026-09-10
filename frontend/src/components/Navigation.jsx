import '../App.css'
import React from 'react';

function Navigation() {
    /*
    This function returns a nav component leading to the Home Page and the Create Exercise Page.
    */
    return (
        <nav className="App-nav">
            <a href="/">Home</a>
            <div></div>
            <a href="/create">Create Exercise</a>
        </nav>
    );
  }
export default Navigation;