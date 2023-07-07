import { useEffect } from "react";
import { ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from "./scenes/home/Home";
import ItemDetails from './scenes/itemDetails/ItemDetails';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import Navbar from './scenes/global/Navbar';
import CartMenu from "./scenes/global/CartMenu";
import Footer from './scenes/global/Footer';
import { theme } from './theme';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])
  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Navbar /> 
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />

        </Routes>
        <CartMenu />
        <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
