interface Entity {
    id: number;
    slug: string;
    creationAt: string;
    updatedAt: string;
}

export interface Category extends Entity {
    name: string;
    image: string;
}

export interface Product extends Entity {
    category: Category;
    description: string;
    images: string[];
    price: number;
    title: string;
}

export interface Response {
    success: boolean;
    count: number;
}

export interface CategoryResponse extends Response {
    data: Product[];
}

export interface SkuResponse extends Response {
    data: Product;
}

export interface CartItem extends Pick<Product, "title" | "images" | "price"> {
    id: string;
    count: number;
}

export type CartContext = {
    cartItems: Map<string, CartItem>;
    addToCart: (item: CartItem) => void;
    deleteFromCart: (id: string) => void;
};
