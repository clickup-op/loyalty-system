import { useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface CartItem extends Product {
    quantity: number;
}

export default function EcommerceTemplate() {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState < CartItem[] > ([]);
    const [showCart, setShowCart] = useState(false);

    const products: Product[] = [
        {
            id: 1,
            name: "Classic White Sneakers",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
            description: "Comfortable and stylish sneakers for everyday wear"
        },
        {
            id: 2,
            name: "Leather Backpack",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            description: "Durable leather backpack perfect for daily use"
        },
        {
            id: 3,
            name: "Wireless Headphones",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            description: "Premium sound quality with noise cancellation"
        },
    ];

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">ShopName</div>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="px-4 py-2 border rounded-lg w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                                onClick={() => setShowCart(!showCart)}
                            >
                                <span>Cart ({totalItems})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {showCart ? (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between border-b py-4">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6">
                                    <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-600 mt-1">{product.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xl font-bold">${product.price}</span>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}