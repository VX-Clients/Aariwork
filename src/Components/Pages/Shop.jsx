import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import "../CSS/Shop.css";

const Shop = () => {
    const { products, loading, addToCart } = useProducts();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="text-center">
                    <div className="loading-text text-gradient">Loading Collection...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container section-padding">
            <div className="shop-header">
                <h1 className="text-gradient animate-fade-in">Aari Work Products</h1>
                <p className="shop-subtitle animate-fade-in">
                    Premium tools, materials, and handcrafted designs for your art
                </p>
            </div>

            <div className="grid-products">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="glass-panel animate-fade-in product-card"
                        style={{
                            animationDelay: `${index * 0.1 + 0.2}s`
                        }}
                    >
                        <div className="product-image-container">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="wishlist-btn">
                                <Heart size={20} color="white" />
                            </div>
                        </div>

                        <div className="product-details">
                            <div className="product-category">
                                {product.category}
                            </div>

                            <h3 className="product-name">{product.name}</h3>

                            {/* Rating Mock */}
                            <div className="product-rating">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <div className="product-footer">
                                <span className="product-price">₹{product.price.toLocaleString()}</span>
                                <button onClick={() => addToCart(product)} className="add-btn">
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
