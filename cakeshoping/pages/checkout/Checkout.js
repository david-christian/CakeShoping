import * as React from 'react';
import { useState, useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import CheckLogin from './checkLogin';

import { useCartContext } from '../../context/CartContext';
import { postOrder, getUser } from '../api/webAPI';

// 身分
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

// 都成功，返回首頁
import Link from 'next/link';

const steps = ['購物車確認', '寄送資料填寫', '訂單確認'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    // case 9:
    //   return <CheckLogin orderData={orderData} />;
    default:
      throw new Error('Unknown step');
  }
}

// 傳 訂單內容、表單
function StepContent() {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm  />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  // const user = useSelector(selectUser); // user.role 身分
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState()

  const { 
    cart, 
    setCart, 
    cartId, 
    handleAddToCart,
    handleRemoveFromCart,
    totalPrice, 
    setTotalPrice,
    handleChangeCountFromCart,
    orderInfo, setOrderInfo, handleAddOrderProductList, handleOrderPaymentForm,  formData, setFormData, handleRemoveCheckout
  } = useCartContext();

  // # context
  // const [orderInfo, setOrderInfo] = useState({  // 最後要送出的訂單
  //   "totalPrice": 0,
  //   "name": "", 
  //   "phone": "", 
  //   "address": "", 
  //   "email": "", 
  //   "productList": ['原始陣列']
  // });

  // # payform
  // const [formDate, setFormData] = useState({
  //   "name": '', 
  //   "phone": '', 
  //   "address": '', 
  //   "email": '', 
  // })

  
  // // # context 塞第一步資料：將 cart 塞入 productList 中，「cart」 與 order 同步
  // const handleAddOrderProductList = () =>  {
  //   const cartToOrder = []
  //   cart.map(item => {
  //     let cartItem = {
  //       "productId": item.productid,
  //       "count": item.count,
  //       "unitPrice": item.price
  //     }
  //     cartToOrder.push(cartItem)
  //   })
    
  //   setOrderInfo({
  //     ...orderInfo,
  //     "totalPrice": totalPrice,
  //     "productList" : cartToOrder
  //   })
  // }

  // // # payform 驗證第二步資料：
  // const validateForm = (formDate) => {
  //   console.log('沒有全部填寫')
  //   const { name, address, phone, email } = formDate
  //   if (name === '' || address === '' || phone === '' || email === '') {
  //     setErrorMessage('請輸入每個欄位喲！')
  //     return false
  //   }
  //   setErrorMessage('')
  //   return true
  // }

  // // # context 塞第二步資料：
  // const handleOrderPaymentForm = (formDate) => {
  //   console.log('log 第二步')
  //   const { name, address, phone, email } = formDate
  //   setOrderInfo({
  //     ...orderInfo,
  //     name,
  //     phone,
  //     address,
  //     email
  //   })
  // };

  // const orderData = { orderInfo, setOrderInfo, handleAddOrderProductList, formDate, setFormData }

  // const handleCheckLogin = () => {
  //   if (user.role !== 'user') {
  //     console.log('尚未登入1')
  //     console.log(activeStep)
  //     setActiveStep(9);
  //     return
  //   } 
  //   console.log('已登入')
  // }

  // 管理下一步，應該要在這驗證第二步有沒有驗證
  // ## 做判斷在這做吧
  const handleNext = () => {
    console.log('handleNext')
    console.log('cart ===', cart)
    console.log('orderInfo ===', orderInfo)
    
    if (activeStep === 0) {
      handleAddOrderProductList()   // # context
    } 
    // if (activeStep === 1) {
    //   if (!validateForm(formDate)) return // 簡單的判斷
    //   handleOrderPaymentForm(formDate)    
    // }
    if (activeStep === 2) {
      console.log('送出訂單');
      console.log('送出訂單 orderInfo = ', orderInfo);

      postOrder(orderInfo);

      postOrder(orderInfo).then(response => {
        console.log('response ===', response)
        console.log('成功')
        // if (response.ok === 0) {
        //   return setErrorMessage(response.message)
        // }
        // history.push("/")
        handleRemoveCheckout()
      })
      .catch((err) => {
        // setIsLoading(false)
        // return setErrorMessage(err.message)
        console.log('失敗 err = ', err)
      })

    }
    setErrorMessage('')
    setActiveStep(activeStep + 1);    // # 留這個就好
  };

  // const handleNext = () => {
  //   console.log('handleNext')
  //   console.log('cart ===', cart)
  //   console.log('orderInfo ===', orderInfo)
    
  //   if (activeStep === 0) {
  //     // if (user.role !== 'user') {
  //     //   console.log('尚未登入1')
  //     //   setActiveStep(9);
  //     //   return
  //     // } else {
  //     //   setActiveStep(0);
  //     // }
      
  //     handleAddOrderProductList()   // # context
  //   } 
  //   if (activeStep === 1) {
  //     if (!validateForm(formDate)) return // 簡單的判斷
  //     handleOrderPaymentForm(formDate)    
  //   }
  //   if (activeStep === 2) {
  //     console.log('送出訂單');
  //     console.log('送出訂單 orderInfo = ', orderInfo);
  //     postOrder(orderInfo);   // # Riview
  //   }
  //   setErrorMessage('')
  //   setActiveStep(activeStep + 1);    // # 留這個就好
  // };

  const handleBack = () => {
    setErrorMessage('');
    setActiveStep(activeStep - 1);
  };

  function clickk() {
    console.log('clickk')
    console.log('cart ===', cart)
    console.log('orderInfo ===', orderInfo)
    console.log('formData ===', formData)

  }

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Container component="main" maxWidth="md" sx={{ mb: 2 }}>
        <button onClick={clickk}>測試用</button>
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
                  感謝您的購買！
                </Typography>
                <Typography variant="subtitle1">
                  您的訂單已成功送出，請隨時注意您的收貨訊息，蛋糕很香祝您有愉快的一餐！
                </Typography>
                <Link href={`/`}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{ mt: 3, ml: 1 }} >
                      回到首頁
                    </Button>
                  </Box>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>

                { errorMessage && <Alert  sx={{ width: '100%' }} severity="error">{errorMessage}</Alert> }
                {/* 一到三步驟詳細頁面資訊 */}
                {getStepContent(activeStep)}
                {/* <StepContent 
                  step={activeStep} 
                  // orderData={orderData}
                  orderInfo={orderInfo}
                  setOrderInfo={setOrderInfo}
                  handleAddOrderProductList={handleAddOrderProductList}
                  formDate={formDate}
                  setFormData={setFormData}
                /> */}

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
                    {activeStep === steps.length - 1 ? '送出訂單' : '下一步'}
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
