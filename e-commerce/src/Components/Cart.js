import React from 'react'
import {Container,Typography, Button, Grid} from '@mui/material'
import CartItems from './CartItems';
import { Link } from "react-router-dom";

function Cart({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  // const handleEmptyCart = () => onEmptyCart();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link style={{ textDecoration: "none" }} to="/">
        start adding some
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
            <CartItems
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          marginTop: "10%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            style={{
              minWidth: "150px",
              marginBottom: "5px",
              marginRight: "20px",
            }}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            style={{ minWidth: "150px", marginBottom: "5px" }}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading";

  return (
    <Container>
      <div style={{ flexGrow: 1, marginTop: 90 }} />
      <Typography style={{ marginTop: "5%" }} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart