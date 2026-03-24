import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { useState } from "react";

interface NavBarProps {
    cartItemsSize: number;
}

export default function Navbar({ cartItemsSize }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartItemsComponent = (
        <>
            {cartItemsSize > 0 && (
                <span className={styles.itemsInCart} aria-label={`${cartItemsSize} items in cart`}>
                    ×{cartItemsSize}
                </span>
            )}
        </>
    );

    return (
        <>
            <header>
                <div>
                    <button
                        type="button"
                        aria-label="Open navigation"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile navigation"
                        className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.active : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                        <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                        <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                    </button>
                    <div className={styles.headerTextWrapper}>
                        <h1 className={styles.headerText}>furniture</h1>
                    </div>
                    <nav aria-label="Mobile navigation">
                        <ul
                            id="mobile navigation"
                            className={`${styles.navigationLinksListMobile} ${isMenuOpen ? styles.active : ""}`}
                        >
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="shop"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="cart"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Cart
                                </NavLink>
                                {cartItemsComponent}
                            </li>
                        </ul>
                    </nav>
                    <nav aria-label="Desktop navigation">
                        <ul
                            className={`${styles.navigationLinksList} ${isMenuOpen ? styles.active : ""}`}
                        >
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="shop"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="cart"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : styles.navLink
                                    }
                                >
                                    Cart
                                </NavLink>
                                {cartItemsComponent}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
