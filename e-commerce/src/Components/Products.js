import React from 'react'
import { Grid } from '@mui/material'
import Product from './Product'
import "./App.css";

function Products({products, onAddToCart}) {
  return (
    <main style={{ flexGrow: 1, marginTop:90 }}>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products