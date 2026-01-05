import { Outlet, useLoaderData, useNavigation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import type { CartItem, Product } from "../types/data";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet context={{ cartItems, setCartItems, addToCart }} />
            </main>
        </>
    );
}

export default App;
