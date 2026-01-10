import type { CartItem } from "../../types/data";

import styles from "./CartItem.module.css";
import type { CartContext } from "../../types/data";
import { useOutletContext } from "react-router";

export default function CartItem(props: CartItem) {
    const { addToCart, deleteFromCart } = useOutletContext<CartContext>();
    const overallPrice = Number(props.count * props.price).toFixed(2);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const isEmpty = event.target.value === "";
        if (isEmpty) {
            addToCart({ ...props, count: 1 });
        } else {
            addToCart({ ...props, count: Number(event.target.value) });
        }
    }

    function handleIncrease() {
        addToCart({ ...props, count: props.count + 1 });
    }

    function handleDecrease() {
        addToCart({ ...props, count: props.count - 1 });
    }

    return (
        <article className={styles.cartItem}>
            <img src={props.image_path} alt="product" className={styles.cartImg} />
            <div className={styles.cartItemInfo}>
                <div className={styles.cartInfoMain}>
                    <h2>{props.name}</h2>
                    <div className={styles.inputWrapper}>
                        <button type="button" onClick={() => handleIncrease()}>
                            +
                        </button>
                        <label aria-label="Number of buying items">
                            <input
                                type="number"
                                value={props.count}
                                onChange={(event) => handleChange(event)}
                            />
                        </label>

                        <button type="button" onClick={() => handleDecrease()}>
                            -
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => deleteFromCart(props.id)}
                        aria-label="delete"
                    >
                        Delete
                    </button>
                </div>
                <div>
                    <p>${props.price}</p>
                    <p>${overallPrice}</p>
                </div>
            </div>
        </article>
    );
}
