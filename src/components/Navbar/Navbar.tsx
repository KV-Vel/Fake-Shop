import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header>
                <button
                    type="button"
                    aria-label="Open navigation"
                    className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.active : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                    <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                    <div className={styles.mobileMenuLine} aria-hidden="true"></div>
                </button>
                {/* Убрать баг с тем что при ресайзе меню в состоянии выкл не отобразит навигацию */}
                <nav aria-hidden={!isMenuOpen}>
                    <ul
                        className={`${styles.navigationLinksList} ${isMenuOpen ? styles.active : ""}`}
                    >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
