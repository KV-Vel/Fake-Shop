import styles from "./ProductCard.module.css";
import { Link } from "react-router";
import type { Product } from "../../types/data";
import useProduct from "../../hooks/useProduct";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

interface ProductCardProps {
    product: Product;
    inCart: boolean;
}

export default function ProductCard({ product, inCart }: ProductCardProps) {
    const { addToCart, onChange, onDecreaseCount, onIncreaseCount, onBlur, count } = useProduct(
        product.id,
    );

    return (
        <article className={styles.card}>
            <div className={styles.imgOuterWrapper}>
                <div className={styles.imgInnerWrapper}>
                    <Link to={String(product.id)} viewTransition>
                        <img src={product.images[0]} alt="product item" />
                        <IoArrowForwardOutline className={styles.arrow} aria-hidden="true" />
                    </Link>
                </div>
            </div>
            <section className={styles.cardDescription}>
                <h3 className={styles.cardHeader}>{product.title}</h3>
                <div>
                    <span className={styles.price}>${product.price}</span>
                </div>
                <div className={styles.itemsCountWrapper}>
                    <button
                        type="button"
                        onClick={onIncreaseCount}
                        className={styles.inputBtn}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                    <div className={styles.inputWrapper}>
                        <label
                            aria-label={`Number of buying items for ${product.title}`}
                            htmlFor={product.title}
                        ></label>
                        <input
                            type="number"
                            value={count}
                            onChange={(event) => onChange(event)}
                            onBlur={(event) => onBlur(event)}
                            className={styles.countInput}
                            id={product.title}
                            inputMode="numeric"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onDecreaseCount}
                        className={styles.inputBtn}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                </div>
                {inCart ? (
                    <button
                        type="button"
                        className={`${styles.addToCartBtn} ${styles.added}`}
                        onClick={() =>
                            addToCart({
                                count: count as number,
                                price: product.price,
                                title: product.title,
                                images: [product.images[0]],
                                id: String(product.id),
                            })
                        }
                    >
                        Update
                        <MdOutlineDone className={styles.cartIcon} size={20} aria-hidden="true" />
                    </button>
                ) : (
                    <button
                        type="button"
                        className={`${styles.notAdded} ${styles.addToCartBtn}`}
                        onClick={() =>
                            addToCart({
                                count: count as number,
                                price: product.price,
                                title: product.title,
                                images: [product.images[0]],
                                id: String(product.id),
                            })
                        }
                    >
                        Add to cart
                        <IoCartOutline className={styles.cartIcon} size={20} aria-hidden="true" />
                    </button>
                )}
            </section>
        </article>
    );
}
