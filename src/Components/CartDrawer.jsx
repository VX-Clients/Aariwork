import React, { useRef, useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import "../Components/CSS/Cart.css";
import toast from 'react-hot-toast';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useProducts();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);

        // Format message for WhatsApp
        const itemsList = cart.map(item =>
            `- ${item.name} (${item.quantity} x ₹${item.price})`
        ).join('%0A');

        const total = cartTotal.toLocaleString();

        const message = `Hello Aari Design Kalai,%0A%0AI would like to place an order:%0A%0A${itemsList}%0A%0ATotal Amount: ₹${total}%0A%0APlease confirm availability and payment details.`;

        // Open WhatsApp
        window.open(`https://wa.me/919445738281?text=${message}`, '_blank');

        toast.success("Redirecting to WhatsApp for order confirmation...");
        setIsCheckingOut(false);
        // Optional: clearCart(); // Keep cart until they confirm? Better to keep it.
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Bag ({cart.length})</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={48} opacity={0.3} />
                            <p>Your bag is empty.</p>
                            <button className="cta-button" onClick={onClose} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h4 className="item-name">{item.name}</h4>
                                    <div className="item-price">₹{item.price.toLocaleString()}</div>

                                    <div className="item-controls">
                                        <div className="qty-control">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="total-row">
                            <span>Total</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout} disabled={isCheckingOut}>
                            Checkout via WhatsApp <ArrowRight size={18} />
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                            No payment required yet. Order details will be sent to our team.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
