import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = () => {
    return (
        <nav>
            <h2 className='title'>API Dashboard</h2>
            <ul>
                <li>Home</li>
                <Link to="/imageShop" className='custom-link'>
                    <li>Image Shop</li>
                </Link>
                <li>Settings</li>
            </ul>
        </nav>
    );
};

export default Navbar;
