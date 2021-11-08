import * as React from 'react';
import { useState, useEffect }  from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Link from 'next/link';
import { useRouter } from 'next/router'
import { getProduct, getOneProductData, getOneProductImg  } from '../../pages/api/webAPI';

import Paper from '@mui/material/Paper';

const theme = createTheme();

export default function SiglePage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState('')
  const [productImg, setProductImg] = useState('')

  useEffect(() => {
    if (!id) return
    getOneProductData(id).then((data) => {
      if(!data.result[0]) {
        console.log('超過了目前所有商品')
        return 
      }
      setProduct(data.result[0])
    })
    getOneProductImg(id).then((data) => {
      if(!data.result[0]) {
        console.log('超過了目前所有商品 img')
        return 
      }
      console.log(data)
      setProductImg(data.result[0].url)
    })
  }, [id])

  const handleAddToCart = () => {
    // 添加到購物車，需要資料：商品 id 購物車 state
    console.log('123')
  }


  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ background:'#7e7e7e', width:'90vw', padding:5 }} component="main">
        <Grid container spacing={2} sx={{ width: '100%' }} >

          {/* 左區塊：圖片 */}
          <Grid item xs={12} md={6} sx={{ height: '450px' }}>
            <Paper 
              sx={{ 
                padding: '5px',
                backgroundImage: `url(${productImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
              }} >
            
            </Paper>
          </Grid>

          {/* 右區塊：詳細資料 */}
          <Grid item xs={12} md={6} sx={{ height: '450px' }} >
            <Grid
              container
              sx={{ border:'1px solid black',  background: 'white', height: '100%' }}
            >
              <Grid item md={12}>
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  $ {product.price}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  尚有庫存
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 3, mb: 2, width:'50%' }} 
                  onClick={handleAddToCart}
                >
                  加入購物車</Button>
                <Button variant="contained" size="small" sx={{ mt: 3, mb: 2, width:'50%' }} >直接購買</Button>
              </Grid>
            </Grid>

          </Grid>

          {/* 下面區塊：詳細商品描述 */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ background: 'white', padding: '20px', height: '500px'}} >
              <Typography variant="h5" mt="2" >
                商品介紹：
              </Typography>
              <Typography sx={{ textAlign:'center' }}>
                {product.articlel}
              </Typography>
            </Paper>
          </Grid>

          {/* 推薦商品 */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ background: 'white', padding: '20px', height: '250px' }} >
              推薦商品
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </ThemeProvider>
  );
}
