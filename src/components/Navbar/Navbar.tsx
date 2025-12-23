import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav>
            <div className={styles.navigationBar}>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                    </ul>
                </div>

                <ul>
                    <li>Cart</li>
                </ul>
            </div>
        </nav>
    );
}
