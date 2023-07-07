import React from 'react'
import {

} from '@mui/material';

import Subscribe from "./Subscribe";
import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";


function Home() {
  return (
    <div className='home'>
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  )
}

export default Home