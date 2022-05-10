import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'

function CartItems({ item, onUpdateCartQty, onRemoveFromCart }) {
//   const handleUpdateCartQty = (productId, newQuantity) =>
//     onUpdateCartQty(productId, newQuantity);

//   const handleRemoveFromCart = (productId) => onRemoveFromCart(productId);
  return (
    <Card className="cart-item">
      <CardMedia
        image={item.image.url}
        alt={item.name}
        style={{ height: 0, paddingTop: "80%" }}
      />
      <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default CartItems