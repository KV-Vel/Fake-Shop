import { useOutletContext } from "react-router";
import type { CartContext } from "../../types/data";
import styles from "./CartPage.module.css";
import CartItem from "../../components/CartItem/CartItem";

export default function CartPage() {
    const { cartItems } = useOutletContext<CartContext>();

    const cartValues = [...cartItems.values()];

    if (!cartValues.length) {
        return <p>No items in cart</p>;
    }

    return (
        <div className={styles.wrapper}>
            {cartValues.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
        </div>
    );
}
