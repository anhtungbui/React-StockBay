import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FaSearch } from 'react-icons/fa';
import Logo from '../assets/images/stockbay_logo.png';

export default function NavBar({ query, handleFormSubmit, handleInputChange }) {
    return (
        <Navbar className="shadow navbar-light bg-white" expand="lg">
            <div className="col-2 offset-md-2 text-center">
                <div className="navbar__logo">
                    <img className="mr-2 " src={Logo} alt="stockbay logo" />
                    <a className="" href="index.html">
                        StockBay
                    </a>
                </div>
            </div>
            <div className="col-6">
                <form
                    className="form-inline"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    <div className="form-group w-100">
                        <input
                            type="search"
                            className="form-control navbar__input"
                            placeholder="Search symbol or company..."
                            value={query}
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <button
                            type="submit"
                            className="btn btn-primary navbar__button"
                        >
                            <FaSearch size="17px" />
                        </button>
                    </div>
                </form>
            </div>
        </Navbar>
    );
}
