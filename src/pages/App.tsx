import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import type { CartItem, Product } from "../types/data";

function App() {
    const [cartItems, setCartItems] = useState<Map<Product["id"], CartItem>>(new Map());

    function addToCart(item: CartItem) {
        if (item.count <= 0) return;
        // Продумать как еще useEffect использовать если пользователь вводит BigInt
        if (isNaN(item.count)) return;

        setCartItems((prevCartItems) => {
            prevCartItems.set(item.id, item);
            return new Map(prevCartItems);
        });
    }

    function deleteFromCart(id: Product["id"]) {
        setCartItems((prevCartItems) => {
            prevCartItems.delete(id);
            return new Map(prevCartItems);
        });
    }

    return (
        <>
            <Navbar />
            <main>
                <Outlet context={{ cartItems, addToCart, deleteFromCart }} />
            </main>
        </>
    );
}

export default App;
