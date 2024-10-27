import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Cart.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
 import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
 import {IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
   const navi=useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/cart')
      .then(response => {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0); // acc-accumulator 0 for initial acc=0;
    setTotalPrice(total);
  };
  const handleBack = () => {
         navi("/");
       };
  const handleRemoveItem = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`)
      .then(() => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        calculateTotalPrice(cartItems.filter(item => item.id !== id)); 
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 }; 
    axios.put(`http://localhost:3000/cart/${item.id}`, updatedItem)
      .then(() => {
        setCartItems(prevItems => 
          prevItems.map(prevItem => 
            prevItem.id === item.id ? updatedItem : prevItem
          )
        );
        calculateTotalPrice(cartItems); 
      })
      .catch(error => {
        console.error('Error updating item quantity:', error);
      });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 }; 
      axios.put(`http://localhost:3000/cart/${item.id}`, updatedItem)
        .then(() => {
          setCartItems(prevItems => 
            prevItems.map(prevItem => 
              prevItem.id === item.id ? updatedItem : prevItem
            )
          );
          calculateTotalPrice(cartItems); 
        })
        .catch(error => {
          console.error('Error updating item quantity:', error);
        });
    } else {
      handleRemoveItem(item.id); 
    }
  };

  return (
    <div className="cart-container">
       <IconButton onClick={handleBack}><ArrowBackIcon color='primary' className='back'></ArrowBackIcon></IconButton>
          <h1 className='Cart'>Your Cart</h1>

      {cartItems.length === 0 ? (
         <center>
          <h1 className='Cart1'>Your cart is empty.</h1>
              </center>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => {
              const {id,image,name,price,quantity}=item;
              return(

              <div key={id} className="cart-item">
                <img src={image} alt={name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{name}</p>
                  <p className="cart-item-price">₹{price} x {quantity}</p> 
                  <p className="cart-item-total">Total: ₹{price * quantity}</p> 
                  <div className="quantity-controls">
                 <AddCircleOutlineIcon color='secondary' onClick={() => handleIncrement(item)} />
                  <RemoveCircleOutlineIcon onClick={() => handleDecrement(item)} color='error' />
                  </div>
                </div>
              </div>
              )
            }
            )}
          </div>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
