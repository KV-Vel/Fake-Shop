import { useState } from "react";
import styles from "./ProductCard.module.css";
import { Link, useOutletContext } from "react-router";
import type { CartContext } from "../../types/data";
import type { Product } from "../../types/data";
import useProduct from "../../hooks/useProduct";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, onChange, onDecreaseCount, onIncreaseCount, handleBlur, count } = useProduct(
        product.id,
    );

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
                    <button type="button" onClick={onIncreaseCount}>
                        +
                    </button>
                    <label aria-label="Number of buying items">
                        <input
                            type="number"
                            value={count}
                            onChange={(event) => onChange(event)}
                            onBlur={(event) => handleBlur(event)}
                        />
                    </label>
                    <button type="button" onClick={onDecreaseCount}>
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
