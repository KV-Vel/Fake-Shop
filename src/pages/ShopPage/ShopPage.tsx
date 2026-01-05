import { Await, useLoaderData, useNavigation } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ShopPage.module.css";
import { Suspense, type ComponentProps } from "react";
import React from "react";
import type { Product, Response } from "../../types/data";

export default function ShopPage() {
    const { products } = useLoaderData();
    console.log(products);
    if (!products) {
        return <div>No available data for now. Please come back later :)</div>;
    }

    return (
        <section className={styles.shopPageWrapper}>
            <h2>Explore latest collection</h2>
            <Suspense fallback={<div>Loading</div>}>
                <Await resolve={products}>
                    {({ data }) => (
                        <div className={styles.productsList}>
                            {data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.name}
                                    price={product.price}
                                    imageSource={product.image_path}
                                />
                            ))}
                        </div>
                    )}
                </Await>
            </Suspense>
        </section>
    );
}
