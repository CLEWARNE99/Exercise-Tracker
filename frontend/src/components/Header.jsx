import '../App.css'
import React from 'react';

function Header(){
    /*
    This function returns the Header component used on each page.
    */
    return(
        <header>
            <div className="page-heading">
                <h1>Exercise Tracking</h1>
                <p>Add exercises to the table to track which exercises you've done! 
                    You can also edit/delete anything in the table.</p>
            </div>
        </header>
    )
}

export default Header;