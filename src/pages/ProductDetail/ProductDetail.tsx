import styles from "./ProductDetail.module.css";
import { useLoaderData } from "react-router";
import type { SkuResponse } from "../../types/data";
import useProduct from "../../hooks/useProduct";

export default function ProductDetail() {
    const { data }: SkuResponse = useLoaderData();
    const { addToCart, onChange, onDecreaseCount, onIncreaseCount, handleBlur, count } = useProduct(
        data.id,
    );
    return (
        <article className={styles.productDetailWrapper}>
            <div>
                <img src={data.image_path} alt="product" />
            </div>
            <section>
                <h2>{data.name}</h2>
            </section>
            <div>
                <button type="button" onClick={onIncreaseCount} className={styles.inputBtn}>
                    +
                </button>
                <div className={styles.inputWrapper}>
                    <label aria-label="Number of buying items" htmlFor="items-count"></label>
                    <input
                        type="number"
                        value={count}
                        onChange={(event) => onChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        className={styles.countInput}
                        id="items-count"
                        inputMode="numeric"
                    />
                </div>
                <button type="button" onClick={onDecreaseCount} className={styles.inputBtn}>
                    -
                </button>
            </div>
            <button
                type="button"
                className={styles.addToCardBtn}
                onClick={() =>
                    addToCart({
                        count: count as number,
                        price: data.price,
                        name: data.name,
                        image_path: data.image_path,
                        id: data.id,
                    })
                }
            >
                {/**Change to update or smth */}
                Add to cart
            </button>
        </article>
    );
}
