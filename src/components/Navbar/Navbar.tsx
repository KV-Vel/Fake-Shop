import { Link } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav>
            <div className={styles.navigationBar}>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="shop">Shop</Link>
                        </li>
                    </ul>
                </div>

                <ul>
                    <li>
                        <Link to="cart">Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
