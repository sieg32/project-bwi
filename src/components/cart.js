import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./context";
import '../stylesheets/cart.css';

export default function Cart() {
  // Context and navigation 
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  // Check user authentication on start
  useEffect(() => {
    if (!user) {
      if (!localStorage.getItem('username')) {
        
        navigate('/login');
      } else {
        
        setUser({
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username'),
          token: localStorage.getItem('token')
        });
      }
    }
  }, [user, setUser, navigate]);

  // State for cart information
  const [cart, setCart] = useState({ products: [] });

  // get cart data for the user
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from server
        const response = await axios.get(`https://dummyjson.com/carts/user/${user.id}`);
        console.log(response.data.carts[0]);
        // setting the cart state with the fetched data
        setCart(response.data.carts[0]);
      } catch (error) {
        console.log('Error while fetching data:', error);
      }
    }

    // data is only fetched if user is logged in
    if (user) {
      fetchData();
    }
  }, [user]);

  // Rendering
  return (
    <div>
      <div className="total">
        {/*total and discounted total */}
        <h1>TOTAL: ${cart.discountedTotal}</h1>
        <h2>${cart.total}</h2>
      </div>

      <div>
        <div className="heading">
          {/* headings product details */}
          <p className="productHeading">product</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
        </div>

        {/* Map through each product in the cart and display details */}
        {cart.products.map((product) => (
          <div key={product.id} className="products">
            <div className="titleDiv">
              {/* Display product title */}
              <p className="title">{product.title}</p>
            </div>

            {/* product price quantity total */}
            <p className="price">${product.price}</p>
            <p className="quantity">{product.quantity}</p>
            <p className="productTotal">${product.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
