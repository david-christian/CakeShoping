import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useCartContext } from '../../context/CartContext';
import CheckoutCartItem from '../../components/CheckoutCartItem';

export default function AddressForm({orderData}) {
  const { cart, setCart, totalPrice } = useCartContext();
  const { orderInfo, setOrderInfo, setOrderProductList } = orderData

  const handleOpen = () => {
    // 測試用
    console.log('AddressForm orderInfo ====', orderInfo)
  }
  return (
    <React.Fragment>

      <TableContainer>
        {/* <Table sx={{ p: { xs: 2, md: 6 } }} aria-label="simple table"> */}
        <Button onClick={handleOpen} sx={{ mt: 3, ml: 1 }}>orderInfo</Button>

        <Table sx={{ width: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品名稱</TableCell>
              <TableCell align="center">單價</TableCell>
              <TableCell align="center">數量</TableCell>
              <TableCell align="center">小計</TableCell>
              <TableCell align="center">刪除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
   
            {cart.map((cartItem) => (
              <CheckoutCartItem  key={cartItem.id} cartItem={cartItem} />
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        textAlign: 'right',
        fontSize: '1rem',
        margin: '20px',
      }} >
        <div>小計：NT$ {totalPrice}</div>
        <div>運費：     NT$ 0</div>
        <div>總價：NT$ {totalPrice}</div>
      </Box>
{/* 
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid> */}



    </React.Fragment>
  );
}
