import { useState } from "react";
import styles from "./ProductCard.module.css";
import { Link, useOutletContext } from "react-router";
import type { CartContext } from "../../types/data";
import type { Product } from "../../types/data";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { cartItems, addToCart } = useOutletContext<CartContext>();
    const current = cartItems.get(product.id);
    const [count, setCount] = useState<number | "">(current?.count || 1); // убрать и работать через cart

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (Number(event.target.value) <= 0) {
            setCount("");
        } else {
            setCount(Number(event.target.value));
        }
    }

    function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
        const isEmpty = event.target.value === "";
        if (isEmpty) {
            setCount(1);
        }
    }

    return (
        <article className={styles.card}>
            <div>
                <Link to={product.sku}>
                    <img src={product.image_path} alt="product item" />
                </Link>
            </div>
            <div className={styles.cardDescription}>
                <h3 className={styles.cardHeader}>{product.name}</h3>
                <div>
                    <span className={styles.price}>${product.price}</span>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => setCount((prevAddNumb) => (prevAddNumb as number) + 1)}
                    >
                        +
                    </button>
                    <label aria-label="Number of buying items">
                        <input
                            type="number"
                            value={count}
                            onChange={(event) => handleChange(event)}
                            onBlur={(event) => handleBlur(event)}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            if ((count as number) - 1 <= 0) return;
                            setCount((prevAddNumb) => (prevAddNumb as number) - 1);
                        }}
                    >
                        -
                    </button>
                    <button
                        type="button"
                        className={styles.addToCardBtn}
                        onClick={() =>
                            addToCart({
                                count: count as number,
                                price: product.price,
                                name: product.name,
                                image_path: product.image_path,
                                id: product.id,
                            })
                        }
                    >
                        {/**Change to update or smth */}
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}
