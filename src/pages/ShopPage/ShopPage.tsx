import { Await, useLoaderData } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ShopPage.module.css";
import { Suspense } from "react";
import type { Product } from "../../types/data";

export default function ShopPage() {
    const { products } = useLoaderData();

    if (!products) {
        return <p>No available data for now. Please come back later</p>;
    }

    return (
        <section className={styles.shopPageWrapper}>
            <h2>Explore latest collection</h2>
            <Suspense fallback={<div>Loading</div>}>
                <Await resolve={products}>
                    {({ data }) => (
                        <div className={styles.productsList}>
                            {data.map((product: Product) => (
                                <ProductCard key={product.name} product={product} />
                            ))}
                        </div>
                    )}
                </Await>
            </Suspense>
        </section>
    );
}
