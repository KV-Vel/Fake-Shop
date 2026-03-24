import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import type { CartItem } from "../types/data";

function App() {
    const [cartItems, setCartItems] = useState<Map<string, CartItem>>(new Map());

    function addToCart(item: CartItem) {
        if (item.count <= 0) return;

        if (isNaN(item.count)) return;

        setCartItems((prevCartItems) => {
            prevCartItems.set(item.id, item);
            return new Map(prevCartItems);
        });
    }

    function deleteFromCart(id: string) {
        setCartItems((prevCartItems) => {
            prevCartItems.delete(id);
            return new Map(prevCartItems);
        });
    }

    return (
        <>
            <Navbar cartItemsSize={cartItems.size} />
            <main>
                <Outlet context={{ cartItems, addToCart, deleteFromCart }} />
            </main>
        </>
    );
}

export default App;
