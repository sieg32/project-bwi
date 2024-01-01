import { Outlet, useLocation, useNavigate } from "react-router-dom";
import '../stylesheets/header.css';
import {userContext, searchContext }from './context';
import { useContext, useState } from "react";
export default function Header(){

    // hooks
    const {search, setSearch} = useContext(searchContext);
    const {setUser} = useContext(userContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [userDiv, setDiv] = useState(false);

    // the header is not rendered if it is login page
    if(location.pathname ==='/login'){
        return <Outlet/>;
    }
    // function to handle cart click and redirects to cart page
    function goToCart(){
        setDiv(false)
        navigate('/cart');
    }

    // function to logout user 
   function logOut(){
    try{
        // clears local storage
        localStorage.clear();
        // clears user state
        setUser(undefined);
    }catch(error){
        console.log('error while clearing local storage', error);
    }
    

   }

//    search div
    const div = (<div className="card">
        <div onClick={goToCart}>
        <img src="shopping-cart.png" alt="cart"></img>
        <h2>cart</h2>

        </div>
        <div onClick={logOut}>
        <img src="logout.png?v=2" alt="log out"></img>
        <h2>sign out</h2>

        </div>
        
    </div>)
    // function to set visibility of  user card 
    function handleDiv(){

        setDiv(!userDiv)
    }
    // handle search input
    function searchInput(event){
        setSearch({...search, value:event.target.value})
       
        
    }
    // this function sets search term when enter is pressed
    function handleSearch(event){
       if(event.key ==="Enter"){
        setSearch({...search, searchTerm:event.target.value})
        
       }
    }



    return(
        <div>
           <div className="nav-bar">
            <h2 href="/">HOME</h2>

            <div id="search-div">
             <img src="loupe.png?v=1" alt="search"/>

             <input id="search" type="text" placeholder="search" value={search.value} onChange={searchInput} onKeyDown={handleSearch}/>
            </div>

            <div id="user" onClick={handleDiv}>
             <img id="user-img" src="user.png?v=1" alt="user"/>

            </div>

            { userDiv ? div: ""}

            
           </div>

        <Outlet/>
        </div>
    )
}