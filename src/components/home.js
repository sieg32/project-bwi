import { useContext, useEffect, useState } from "react";
import { userContext, searchContext } from "./context";
import { useNavigate } from "react-router-dom";
import Filter from "./filter";
import ProductCard from "./productCard";

import '../stylesheets/home.css';
import axios from "axios";

export default function Home() {
    // contexts
    const { search } = useContext(searchContext);
    const { user, setUser } = useContext(userContext);

    // hooks
    const navigate = useNavigate();
    const [priceRange, setPriceRange] = useState({ lower: 0, upper: 0 });
    const [products, setProducts] = useState([]);

    // function for price range changes
    function handleChange(newValue) {
        setPriceRange(newValue);
    }

    // function to fetch product data
    const fetchData = async (searchTerm) => {
        try {
            let data = {};
            if (searchTerm) {
                data = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
            } else {
                data = await axios.get('https://dummyjson.com/products/?limit=0');
            }

            // map product data to productCard based on price range
            let productList = data.data.products.map((info) => {
                if (!priceRange.lower && !priceRange.upper) {
                    console.log('Products with 0 price range');
                    return <ProductCard data={info} />;
                } else {
                    if (info.price <= priceRange.upper && info.price >= priceRange.lower) {
                        return <ProductCard data={info} />;
                    }
                }
            });

            
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    useEffect(() => {
        // get data based on search Term and price range
        if (search.searchTerm) {
            fetchData(search.searchTerm);
        } else {
            fetchData();
        }
    }, [priceRange, search.searchTerm]);

    // to check if user is looged in 
    useEffect(() => {
        if (!user) {
            if (!localStorage.getItem('username')) {
                navigate('/login');
            } else {
                setUser({ username: localStorage.getItem('username'), token: localStorage.getItem('token') });
            }
        }
    }, [user, setUser, navigate]);

    // Render the component
    return (
        <div>
            {/*  price range */}
            <Filter data={priceRange} change={handleChange} />

            {/* Placeholder for products */}
            <div className="product-placeholder">
                {products}
            </div>
        </div>
    );
}
