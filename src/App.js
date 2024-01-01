import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { userContext, searchContext } from './components/context';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import Product from './components/product';
import Cart from './components/cart'
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <searchContext.Provider value={{ search, setSearch }}>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='product/'>
                <Route path=':id' element={<Product />} />
              </Route>
              <Route path='cart' element={<Cart/>}/>
            </Route>
          </Routes>
        </searchContext.Provider>
      </userContext.Provider>
    </BrowserRouter>
  );
}
