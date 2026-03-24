import { Await, useLoaderData, useOutletContext } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ShopPage.module.css";
import { Suspense } from "react";
import { type CartContext, type Product } from "../../types/data";

export default function ShopPage() {
    const { products } = useLoaderData();
    const { cartItems } = useOutletContext<CartContext>();

    return (
        <section className={styles.shopPageWrapper}>
            <h2 className={styles.shopHeader}>explore latest collection</h2>
            <Suspense fallback={<div>Loading</div>}>
                <Await
                    resolve={products}
                    errorElement={
                        <div className={styles.emptyMsgWrapper}>
                            <p>Unexpected error!</p>
                        </div>
                    }
                >
                    {(data) =>
                        data.length ? (
                            <div className={styles.productsList}>
                                {data.map((product: Product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        inCart={cartItems.has(String(product.id))}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyMsgWrapper}>
                                <p>No available data for now. Please come back later</p>
                            </div>
                        )
                    }
                </Await>
            </Suspense>
        </section>
    );
}
