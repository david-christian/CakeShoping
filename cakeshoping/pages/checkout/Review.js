import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useCartContext } from '../../context/CartContext';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const { cart, totalPrice, paymentInfo } = useCartContext();
  const handleOpen = () => {
    console.log(paymentInfo)
  }
  return (
    <React.Fragment>

      <Button onClick={handleOpen} sx={{ mt: 3, ml: 1 }}>===</Button>

      <Typography variant="h6" gutterBottom>
        您的訂單
      </Typography>
      <List disablePadding>

        {/* {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))} */}

          <ListItem sx={{ py: 1, px: 0, fontSize: '10px', }}>
            <ListItemText sx={{ width: '12%', }}>商品名稱</ListItemText>
            <ListItemText>單價</ListItemText>
            <Typography variant="body2">商品數量</Typography>
          </ListItem>

        {/* 顯示訂單商品 */}
        {cart.map((cartItem) => (
          <>
          <ListItem key={cartItem.id} sx={{ py: 3, px: 1 }}>
            <ListItemText primary={cartItem.productName} sx={{ width: '8%', }} />
            <ListItemText >$ {cartItem.price}</ListItemText>
            {/* <ListItemText primary={cartItem.count} /> */}
            <Typography variant="body2" >{cartItem.count} 份 </Typography>
          </ListItem>
            <Divider  />
          </>
        ))}

        {/* 顯示訂單總價 */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="總價" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {totalPrice}
          </Typography>
        </ListItem>
      </List>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            送貨資訊
          </Typography>
          <Typography gutterBottom>收貨人</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            收貨資訊
          </Typography>
          <Typography gutterBottom>收貨人：</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            付款資訊
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>


    </React.Fragment>
  );
}
