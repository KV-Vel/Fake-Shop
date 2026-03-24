import styles from "./ProductDetail.module.css";
import { useLoaderData } from "react-router";
import type { SkuResponse } from "../../types/data";
import useProduct from "../../hooks/useProduct";
import { MdOutlineDone } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

export default function ProductDetail() {
    const { data }: SkuResponse = useLoaderData();

    const { addToCart, onChange, onDecreaseCount, onIncreaseCount, onBlur, count, inCart } =
        useProduct(data.id);

    return (
        <article className={styles.productDetailWrapper}>
            <div className={styles.mainInfo}>
                <h2>{data.title}</h2>
                <span className={styles.price}>${data.price}</span>
            </div>
            <div>
                <img src={data.images[0]} alt="product" />
            </div>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.itemsCountWrapper}>
                <div className={styles.inputWrapper}>
                    <button
                        type="button"
                        onClick={() => onIncreaseCount()}
                        className={styles.inputBtn}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                    <label
                        aria-label={`Number of buying items for ${data.title}`}
                        htmlFor={data.title}
                    >
                        <input
                            type="number"
                            value={count}
                            onChange={(event) => onChange(event)}
                            onBlur={(event) => onBlur(event)}
                            id={data.title}
                        />
                    </label>

                    <button
                        type="button"
                        onClick={() => onDecreaseCount()}
                        className={styles.inputBtn}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                </div>
            </div>

            {inCart ? (
                <button
                    type="button"
                    className={`${styles.addToCartBtn} ${styles.added}`}
                    onClick={() =>
                        addToCart({
                            count: count as number,
                            price: data.price,
                            title: data.title,
                            images: [data.images[0]],
                            id: String(data.id),
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
                            price: data.price,
                            title: data.title,
                            images: [data.images[0]],
                            id: String(data.id),
                        })
                    }
                >
                    Add to cart
                    <IoCartOutline className={styles.cartIcon} size={20} aria-hidden="true" />
                </button>
            )}
        </article>
    );
}
