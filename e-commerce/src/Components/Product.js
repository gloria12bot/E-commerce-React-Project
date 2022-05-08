import React from 'react'
import { Card , CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material'
import {AddShoppingCart} from '@mui/icons-material'
// import Products from './Products';


function Product({product, onAddToCart}) {
  return (
    <Card style={{ maxWidth: "100%" }}>
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        >
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id,1) }>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product