import { Link, useOutletContext } from "react-router";
import type { CartContext } from "../../types/data";
import styles from "./CartPage.module.css";
import CartItem from "../../components/CartItem/CartItem";
import shoppers from "../../assets/online-shopping.png";

export default function CartPage() {
    const { cartItems } = useOutletContext<CartContext>();

    const cartValues = [...cartItems.values()];
    const subTotal = Number(cartValues.reduce((acc, curr) => (acc += curr.price * curr.count), 0));
    const tax = subTotal * 0.05;
    const total = subTotal + tax;

    if (!cartValues.length) {
        return (
            <div className={styles.emptyMsgWrapper}>
                <div className={styles.emptyMsgInnerWrapper}>
                    <img src={shoppers} alt="shoppers" />
                    <p className={styles.emptyMsg}>Your shopping cart is empty</p>
                    <Link to="/shop">
                        <button type="button" className={styles.backToShopBtn}>
                            Back to shop
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className={styles.wrapper}>
            <div>
                <h2 className={styles.cartHeader}>Shopping cart</h2>
            </div>
            <div className={styles.cartInfoWrapper}>
                <section className={styles.cartList}>
                    {cartValues.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </section>

                <aside className={styles.orderWrapper} aria-live="polite" aria-atomic="true">
                    <div className={styles.orderInfo}>
                        <h3 className={styles.header}>Order summary</h3>
                        <ul className={styles.orderRows}>
                            <li>
                                Subtotal:
                                <span aria-hidden="true" className={styles.dashedLine}></span>
                                <span>${subTotal.toFixed(2)}</span>
                            </li>
                            <li>
                                Tax(5%):
                                <span aria-hidden="true" className={styles.dashedLine}></span>
                                <span>${tax.toFixed(2)}</span>
                            </li>
                            <li>
                                Total:<span aria-hidden="true" className={styles.dashedLine}></span>
                                <span>${total.toFixed(2)}</span>
                            </li>
                        </ul>
                        <button type="button" className={styles.checkoutBtn}>
                            Proceed to checkout
                        </button>
                    </div>
                </aside>
            </div>
        </article>
    );
}
