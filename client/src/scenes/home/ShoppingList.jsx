import React from 'react'
import { useEffect, useState } from 'react';
import {Box, Typography, Tab, Tabs, useMediaQuery} from '@mui/material';
import Item from '../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../state';

function ShoppingList() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    console.log("items", items);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    async function getItems() {
        const items = await fetch(
            "https://ecom-mern-lq59.onrender.com/api/items",
            {method : "GET"}
        )
        const itemsJson = await items.json();
        dispatch(setItems({items: itemsJson}));
    }

    useEffect(() => {
        getItems();
    }, []) // eslint=disable-line react-hools/exhaustive-deps

    const topRatedItems = items.filter((item) => 
        item.category === "topRated"
    )
    const newArrivalItems = items?.filter((item) => 
        item.category === "newArrivals"
    )
    const bestSellerItems = items?.filter((item) => 
        item.category === "bestSellers"
    )

  return (
    <Box width='80%' margin="80px auto">
        <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
        </Typography>
        <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{sx:{display:isNonMobile?"block":"none"}}}
            sx={{
                m:"25px",
                "& .MuiTabs-flexContainer" : {
                    flexWrap:"wrap"
                }
            }}
        >
            <Tab label="ALL" value="all" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
            <Tab label="BEST SELLERS" value="bestSellers" />
            <Tab label="TOP RATED" value="topRated" />
        </Tabs>
        <Box
            margin="0 auto"
            display={"grid"}
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent={"space-around"}
            rowGap="20px"
            columnGap="1.33%"
        >
            {value === "all" && items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "newArrivals" && newArrivalItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "bestSellers" && bestSellerItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === "topRated" && topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}

        </Box>
    </Box>
  )
}



export default ShoppingList