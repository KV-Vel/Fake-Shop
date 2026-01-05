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
    data: Product[];
}

export interface CartItem extends Partial<Product> {
    itemNumber: number;
}
