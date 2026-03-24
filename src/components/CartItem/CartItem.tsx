import type { CartItem } from "../../types/data";

import styles from "./CartItem.module.css";
import type { CartContext } from "../../types/data";
import { useOutletContext } from "react-router";
import { RxCross1 } from "react-icons/rx";

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
        <article className={styles.cartItem} aria-label="Cart item">
            <div className={styles.upperInfo}>
                <h3>{props.title}</h3>
                <button
                    type="button"
                    aria-label="Delete cart item"
                    className={styles.deleteBtn}
                    onClick={() => {
                        deleteFromCart(props.id);
                    }}
                >
                    <RxCross1 size={16} aria-hidden="true" />
                </button>
            </div>

            <div className={styles.cartItemInfo}>
                <img src={props.images[0]} alt="product" className={styles.cartImg} />
                <div className={styles.cartItemRowsWrapper}>
                    <div className={styles.row}>
                        <p className={styles.price}>${overallPrice}</p>
                        <p className={styles.price}>
                            ${props.price.toFixed(2)} <span>each</span>
                        </p>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputWrapper}>
                            <button
                                type="button"
                                onClick={() => handleIncrease()}
                                className={styles.inputBtn}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                            <label
                                aria-label={`Number of buying items for ${props.title}`}
                                htmlFor={props.title}
                            >
                                <input
                                    type="number"
                                    value={props.count}
                                    onChange={(event) => handleChange(event)}
                                    id={props.title}
                                />
                            </label>

                            <button
                                type="button"
                                onClick={() => handleDecrease()}
                                className={styles.inputBtn}
                                aria-label="Descrease quantity"
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
