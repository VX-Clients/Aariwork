import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Initialize from LocalStorage
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('adk_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('adk_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('adk_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('adk_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setProducts(PRODUCTS);
            } catch (error) {
                console.error("Failed to load products:", error);
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Cart Actions
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                toast.success(`Updated ${product.name} quantity`);
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success(`${product.name} added to cart`);
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
        toast.success("Item removed from cart");
    };

    const clearCart = () => {
        setCart([]);
    };

    // Wishlist Actions
    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                toast("Removed from Wishlist", { icon: '💔' });
                return prev.filter(item => item.id !== product.id);
            }
            toast("Added to Wishlist", { icon: '❤️' });
            return [...prev, product];
        });
    };

    const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

    // Derived State
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const value = {
        products,
        loading,
        cart,
        wishlist,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
