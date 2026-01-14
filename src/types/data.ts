export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    wood_type: string;
    finish: string;
    dimensions: {
        depth: number;
        width: number;
        height: number;
    };
    price: number;
    weight: number;
    image_path: string;
    stock: number;
    sku: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    featured: boolean;
    discount_price?: number;
    tags?: string[] | null;
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

export interface CartItem extends Pick<Product, "name" | "image_path" | "price" | "id"> {
    count: number;
}

export type CartContext = {
    cartItems: Map<Product["id"], CartItem>;
    addToCart: (item: CartItem) => void;
    deleteFromCart: (id: Product["id"]) => void;
};
