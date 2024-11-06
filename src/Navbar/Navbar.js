import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../HomePage/HomePage.css' // Custom styles

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid" id='nav_home'>
                <a className="navbar-brand" href="/">Grievance Redressal System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <img src="/Home.png" alt="Home icon" className="nav-icon" /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-up">
                                <img src="/login.png" alt="sighup icon" className="nav-icon" /> Signup
                            </Link>
                        </li>
                        {['Login', 'About Us'].map((item, index) => {
                            if (item === 'Login') {
                                return (
                                    <li className="nav-item dropdown" key={index}>
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/login.png" alt="Login icon" className="nav-icon" /> {item}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {/* <li><a className="dropdown-item" href="/user-login">Citizen Login</a></li> */}
                                            <li><a className="dropdown-item" href="/employee-login">Employee Login</a></li>
                                            <li><a className="dropdown-item" href="/ceo-login">CEO Login</a></li>
                                            <li><a className="dropdown-item" href="/user-login">user Login</a></li>
                                        </ul>
                                    </li>
                                );
                            } else {
                                let iconPath;
                                switch (item) {

                                    case 'Sign-Up':
                                        iconPath = '/signup.png'; // Adjust the path as necessary
                                        break;
                                    case 'About Us':
                                        iconPath = '/info.png'; // Add an icon for About Us if desired
                                        break;
                                    default:
                                        iconPath = '';
                                }
                                return (
                                    <li className="nav-item" key={index}>
                                        {item === 'About Us' ? (
                                            <Link className="nav-link" to="/about-us">
                                                <img src={iconPath} alt={`${item} icon`} className="nav-icon" /> {item}
                                            </Link>
                                        ) : (
                                            <Link className="nav-link" to={`/${item.toLowerCase().replace(/ /g, '-')}`}>
                                                <img src={iconPath} alt={`${item} icon`} className="nav-icon" /> {item}
                                            </Link>
                                        )}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;