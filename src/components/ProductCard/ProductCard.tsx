import { useState } from "react";
import styles from "./ProductCard.module.css";
import { useOutletContext } from "react-router";

interface ProductCardProps {
    // id: number;
    title: string;
    price: number;
    imageSource: string;
}

export default function ProductCard({ title, price, imageSource }: ProductCardProps) {
    const [addNumber, setAddNumber] = useState(0); // убрать и работать через cart
    // const { addToCart } = useOutletContext();

    return (
        <article className={styles.card}>
            <div>
                <img src={imageSource} alt="product item" />
            </div>
            <div className={styles.cardDescription}>
                <h3 className={styles.cardHeader}>{title}</h3>
                <div>
                    <span className={styles.price}>${price}</span>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => setAddNumber((prevAddNumb) => prevAddNumb + 1)}
                    >
                        +
                    </button>
                    <label aria-label="Number of buying items">
                        <input type="number" value={addNumber} />
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            if (addNumber <= 0) return;
                            setAddNumber((prevAddNumb) => prevAddNumb - 1);
                        }}
                    >
                        -
                    </button>
                    <button
                        type="button"
                        className={styles.addToCardBtn}
                        onClick={() => addToCart(addNumber)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}
