import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../stylesheets/product.css";
import { userContext } from "./context";

export default function Product() {
  //product ID from route parameters
  let { id } = useParams();

  // State variables
  const [productInfo, setInfo] = useState({});
  const [mainImg, setMainImg] = useState("");

  // Context and navigation 
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    if (!user) {
      if (!localStorage.getItem("username")) {
        navigate("/login");
      } else {
        setUser({
          id: localStorage.getItem("id"),
          username: localStorage.getItem("username"),
          token: localStorage.getItem("token"),
        });
      }
    }
  }, [user, setUser, navigate]);

  // getting product data based on the product ID
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setInfo(response.data);
        // Set the main image initially to the thumbnail
        setMainImg(response.data.thumbnail);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [id]);

  // image change on thumbnail click
  function changeImg(event) {
    //  update mainImg state
    setMainImg(productInfo.images[event.target.id]);
  }

  // Generate image based on product images
  const imageArr = Array.isArray(productInfo.images)
    ? productInfo.images.map((image, index) => (
        <img
          id={index}
          key={index}
          src={image}
          onClick={changeImg}
          alt={`Image ${index}`}
        />
      ))
    : null;

  // Add product to cart
  async function addCart(event) {
    try {
      const response = await axios.put(`https://dummyjson.com/carts/${user.id}`, {
        merge: true,
        products: [{ id: id, quantity: 1 }],
      });
      if (response.status === 200) {
        window.alert("Added to cart");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //  too add class based on rating 
  function getRatingClass(rating) {
    if (rating >= 4) {
      return 'high-rating';
    } else if (rating >= 2) {
      return 'medium-rating';
    } else {
      return 'low-rating';
    }
  }

  // Render the component
  return (
    <div className="product-page">
      <div className="containerImgPrice">
        <div className="images">
          <div className="mainImgDiv">
            <img id="thumbnail" src={mainImg} alt={productInfo.title} />
          </div>
          <div className="imageArr">{imageArr}</div>
        </div>
        <div className="BuyCart">
          {/* Button to add product to cart */}
          <button onClick={addCart}>Add to cart</button>
          <button>Buy</button>
        </div>
      </div>
      <div className="text-info">
        <div className="name">
          {/* Product title */}
          <h2>{productInfo.title}</h2>
          {/* rating whose class changes with rating value */}
          <div className={`rating ${getRatingClass(productInfo.rating)}`}>
            <h3>{productInfo.rating}</h3>
            <img src="/star.png?v=1" alt="Star" />
          </div>
        </div>
        {/* Product price, discount, brand, description, and stock */}
        <h3 className="price">${productInfo.price}</h3>
        <h2 className="discount">{productInfo.discountPercentage}% off</h2>
        <h3 className="brand">Brand: {productInfo.brand}</h3>
        <h3 className="description">{productInfo.description}</h3>
        <h3 className="stock">
          {productInfo.stock < 20
            ? `${productInfo.stock} left`
            : "    "}{" "}
        </h3>
      </div>
    </div>
  );
}
