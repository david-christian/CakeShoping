import * as React from 'react';
import { useState, useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import { useCartContext } from '../../context/CartContext';

const steps = ['購物車確認', '寄送資料填寫', '訂單確認'];

function getStepContent(step, orderData) {
  switch (step) {
    case 0:
      return <AddressForm orderData={orderData} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review orderData={orderData} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const { cart, totalPrice } = useCartContext();
  const [orderInfo, setOrderInfo] = useState({  // 最後要送出的訂單
    "totalPrice": 0,
    "name": "", 
    "phone": "", 
    "address": "", 
    "email": "", 
    "productList": ['原始陣列']
  });
  
  // 將 cart 塞入 productList 中，「cart」 與 order 同步
  const setOrderProductList = () =>  {
    const cartToOrder = []
    cart.map(item => {
      let cartItem = {
        "productId": item.productid,
        "count": item.count,
        "unitPrice": item.price
      }
      cartToOrder.push(cartItem)
    })
    
    setOrderInfo({
      ...orderInfo,
      "productList" : cartToOrder
    })
  }

  const orderData = { orderInfo, setOrderInfo, setOrderProductList }

  // 管理下一步，應該要在這驗證第二步有沒有驗證
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 0) {
      setOrderProductList()
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Container component="main" maxWidth="md" sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            訂單結帳
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {/* 最後面，還沒到最後一步的話顯示 next 或上一步，到最後就顯示訂單資訊 */}
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>

                {/* 一到三步驟詳細頁面資訊 */}
                {getStepContent(activeStep, orderData)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      上一步
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : '下一步'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>

        </Paper>
      </Container>
    </ThemeProvider>
  );
}
