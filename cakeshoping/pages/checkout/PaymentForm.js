import * as React from 'react';
import { useState, useEffect }  from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useCartContext } from '../../context/CartContext';
import Button from '@mui/material/Button';

export default function PaymentForm() {
  const { cart, totalPrice } = useCartContext();
  const [paymentCart, setPaymentCart] = useState([])
  const [addressName, setAddressName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // useEffect(() => {
  //   console.log('輸入中')
  //   console.log('paymentCart ===', paymentCart)
  //   setPaymentInfo({
  //     "totalPrice": totalPrice,
  //     "name": addressName, 
  //     "phone": phone, 
  //     "address": address, 
  //     "email": email, 
  //     "productList": []
  //   })
  // }, [addressName, address, phone, email])

  const handleAdd = () => {
    console.log(paymentCart)
  }
  const handleOpen = () => {
    console.log(paymentInfo)
  }

  return (
    <React.Fragment>
      <Button onClick={handleAdd} sx={{ mt: 3, ml: 1 }}>paymentCart</Button>
      <Button onClick={handleOpen} sx={{ mt: 3, ml: 1 }}>paymentInfo</Button>

      <Grid container 
        justifyContent="center"
        spacing={3}
        xs={6} md={12}>

          <Grid item xs={6} md={8}>
            <TextField
              required
              id="cardName"
              label="收件名"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={e => setAddressName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={8}>
            <TextField
              required
              id="cardNumber"
              label="電話"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={e => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={8}>
            <TextField
              required
              id="expDate"
              label="電子信箱"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={8}>
            <TextField
              required
              id="cvv"
              label="地址"
              helperText="前面請輸入郵遞區號"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={e => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={6} md={8} sx={{ my:3 }}>
            <FormControl component="fieldset">
              <FormLabel component="">選擇付款方式</FormLabel>
              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} label="信用卡" />
                <FormControlLabel value="male" control={<Radio />} label="貨到付款" />
              </RadioGroup>
            </FormControl>
          </Grid>

      </Grid>

    </React.Fragment>
  );
}
