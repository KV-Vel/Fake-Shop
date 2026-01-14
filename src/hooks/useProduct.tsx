import { useOutletContext } from "react-router";
import type { CartContext, Product } from "../types/data";
import { useState } from "react";

export default function useProduct(id: Product["id"]) {
    const { cartItems, addToCart } = useOutletContext<CartContext>();
    const current = cartItems.get(id);
    const [count, setCount] = useState<number | "">(current?.count || 1);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (Number(event.target.value) <= 0) {
            setCount("");
        } else {
            setCount(Number(event.target.value));
        }
    }

    function onDecreaseCount() {
        if ((count as number) - 1 <= 0) return;
        setCount((prevAddNumb) => (prevAddNumb as number) - 1);
    }

    function onIncreaseCount() {
        setCount((prevAddNumb) => (prevAddNumb as number) + 1);
    }

    function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
        const isEmpty = event.target.value === "";
        if (isEmpty) {
            setCount(1);
        }
    }

    return { addToCart, onChange, onDecreaseCount, onIncreaseCount, handleBlur, count } as const;
}
