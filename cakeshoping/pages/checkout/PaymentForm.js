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

export default function PaymentForm({orderData}) {
  const { cart, totalPrice } = useCartContext();
  const { orderInfo, setOrderInfo, formDate, setFormData } = orderData

  const [addressName, setAddressName] = useState(formDate.name)
  const [address, setAddress] = useState(formDate.address)
  const [phone, setPhone] = useState(formDate.phone)
  const [email, setEmail] = useState(formDate.email)

  // useEffect(() => {
  //   if (!formDate.name || !formDate.phone || !formDate.address || !formData.email) {
  //     console.log('空的沒事')
  //     return
  //   }
  //   setAddress(formDate.name)
  //   setPhone(formDate.phone)
  //   setAddress(formDate.address)
  //   setEmail(formDate.email)
  // }, [])
  // 同步
  useEffect(() => {
    setFormData({
      "name": addressName, 
      "phone": phone, 
      "address": address, 
      "email": email, 
    })
  }, [addressName, address, phone, email])

  const handleAdd = () => {
    console.log('orderInfo ====', orderInfo)
  }
  const handleOpen = () => {
    console.log('w')
  }

  return (
    <React.Fragment>

      <Grid container 
        justifyContent="center"
        spacing={3}
        >

        <Button onClick={handleAdd} sx={{ mt: 3, ml: 1 }}>現在的 orderInfo</Button>
        <Button onClick={handleOpen} sx={{ mt: 3, ml: 1 }}>paymentInfo</Button>
          
          <Grid item xs={6} md={8}>
            <TextField
              required
              value={ addressName }
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
              value={ phone }
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
              value={ email }
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
              value={ address }
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
                <FormControlLabel id="payWay" value="cash" control={<Radio />} label="貨到付款" />
                <FormControlLabel id="payWay" value="card" control={<Radio />} label="信用卡" />
              </RadioGroup>
            </FormControl>
          </Grid>

      </Grid>

    </React.Fragment>
  );
}
