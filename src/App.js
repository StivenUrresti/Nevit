import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, AppBar } from "@mui/material";
import { makeStyles } from '@mui/styles';

import Home from "./page/home/Home";
import Products from "./page/products/Products";
import Toolkit from "./page/toolkit/Toolkit";
import logo from "./img/logoNevit1.png";


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  appBar: {
    '&.css-hip9hq-MuiPaper-root-MuiAppBar-root': {
      background: '#90339D',
      height: 150

    }
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar} position="static">
        <div style={{ display: 'flex', justifyContent: 'flex-end', height: 50, padding: 30 }}>
          <div style={{ width: '50%' }}>
            <img src={logo} style={{ width: 120, height: 120, borderRadius: 100, margin: -10 }} alt='logo' />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: 'flex-end',
              width: '50%'
            }}
          >
            <div
              style={{
                display: "flex",
                width: 352,
                justifyContent: "space-around",
              }}>
              <Button className={classes.root} to="/" component={Link} variant="contained">
                home
              </Button>
              <Button to="products" component={Link} variant="contained" className={classes.root}>
                products
              </Button>
              <Button to="toolkit" component={Link} variant="contained" className={classes.root}>
                Toolkit
              </Button>
            </div>
          </div>
        </div>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="Toolkit" element={<Toolkit />} />
      </Routes>
    </div>
  );
}
