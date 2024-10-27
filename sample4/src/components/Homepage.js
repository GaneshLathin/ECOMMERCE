import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Homepage.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/item')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:3000/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const ToCart = () => {
    navi("/cart");
  }

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    if (existingCartItem) {
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
      axios.put(`http://localhost:3000/cart/${existingCartItem.id}`, updatedItem)
        .then(() => {
          setCartItems(prev=>
            prev.map(it=>
              it.id===product.id?updatedItem :product
            )
          )
        })
        .catch(error => {
          console.error('Error updating cart item:', error);
        });
    } else {
      const newItem = { ...product, quantity: 1 };
      axios.post('http://localhost:3000/cart', newItem)
        .then(() => {
          setCartItems(prevItems => [...prevItems, newItem]);
        })
        .catch(error => {
          console.error('Error adding cart item:', error);
        });
    }
  };

  const categories = {
    Mobiles: products.filter(product => product.category === 'Mobile'),
    TVs: products.filter(product => product.category === 'TV'),
    Watches: products.filter(product => product.category === 'Watch'),
    Shoes: products.filter(product => product.category === 'Shoe'),
    Laptops: products.filter(product => product.category === 'Laptop')

  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <h1 className="homepage-title" style={{fontFamily:"Georgia"}}>LG Store</h1>
        </div>
        <nav className="homepage-nav">
          <Link to="/About" className="nav-link">About</Link>
          <Link to="/Contact" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link signup-button">Sign Up</Link>
          <IconButton onClick={ToCart}>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </IconButton>
        </nav>
      </header>
      <main className="homepage-main">
        <section className="homepage-search">
          <form className="search-form">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </section>
        <section className="homepage-products">
          {Object.entries(categories).map(([categoryName, items]) => (
            <div key={categoryName} className="product-category">
              <h2>{categoryName}</h2>
              <div className="product-list">
                {items.map((product) => {
                  const { id, image, name, price } = product;
                  return (
                    <div key={id} className="product-item">
                      <img src={image} alt={name} />
                      <p className="product-name">{name}</p>
                      <p className="product-price">₹{price}</p>
                      <button className='but' type='button' onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="homepage-footer">
        <div className="footer-content">
          <p>&copy; 2024 LG STORE. All rights reserved.</p>
          <div className="contact-info">
            <p>Contact Number: <a href="tel:6381414205">638-141-4205</a></p>
            <p>Email: <a href="mailto:GKstore@gk.ac.in">GKstore@gk.ac.in</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
