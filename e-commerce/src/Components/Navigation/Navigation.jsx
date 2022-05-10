import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,Typography} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import logo from '../../commerce.png';
import { Link,useLocation } from 'react-router-dom';

function Navigation({totalItems}) {
  const location = useLocation();
  return (
   <div>
        <AppBar position="fixed" color="inherit" style={{ boxShadow: "none",borderBottom: "1px solid rgba(0, 0, 0, 0.12)"}}>
           <Toolbar>
          <Typography component={Link} to="/"  variant="h6" style={{flexGrow: 1,alignItems: "center",display: "flex",textDecoration: "none"}} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" style={{marginRight: "10px"}} /> Commerce.js
          </Typography>
          <div style={{flexGrow: 1}} />
           {location.pathname === '/' && (
          <div>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
           )}
        </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navigation