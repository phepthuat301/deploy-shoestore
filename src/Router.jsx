import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';
import moment from 'moment'
//LayOut
import DefaultLayout from './components/DefaultLayout';
import LoginLayout from './components/LoginLayout';
import AdminLayout from './components/AdminLayout'
//Components
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import LogInOUt from './pages/LogInOut';
import Home from './pages/Home';
import AddProduct from './pages/AdminCP/ProductManager/AddProduct';
import ReadProduct from './pages/AdminCP/ProductManager/ReadProduct';
import AdminDetailProduct from './pages/AdminCP/ProductManager/ReadProduct/DetailProduct';
import AdminUpdateProduct from './pages/AdminCP/ProductManager/UpdateProduct';
import AdminDisplayColor from './pages/AdminCP/ColorManager'
import AdminDisplaySize from './pages/AdminCP/SizeManager'
import AdminAddSize from './pages/AdminCP/SizeManager/AddSize';
import AdminAddColor from './pages/AdminCP/ColorManager/AddColor';
import AdminDisplayOrder from './pages/AdminCP/OrderManager/index';
import AdminOrderDetail from './pages/AdminCP/OrderManager/OrderDetail';
import CheckoutStep1 from './pages/CheckOut/step1';
import CheckoutStep2 from './pages/CheckOut/step2';
import CheckoutStep3 from './pages/CheckOut/step3';
import Profile from './pages/Profile';
import EditProfile from './pages/Profile/EditProfile';
import AdminDisplayUser from './pages/AdminCP/UserManager';
import AdminStatistic from './pages/AdminCP/StatisticManager';
import AdminAddType from './pages/AdminCP/TypeManager/AddType';
import AdminDisplayType from './pages/AdminCP/TypeManager';
import AdminAddSale from './pages/AdminCP/SaleManager/AddSale';
import AdminDisplaySale from './pages/AdminCP/SaleManager/ReadSale';
import AdminAddBanner from './pages/AdminCP/BannerManager/AddBanner';
import AdminDisplayBanner from './pages/AdminCP/BannerManager/ReadBanner';
import ResetPassword from './pages/LogInOut/Components/ResetPassword';
import ForgotPassword from './pages/LogInOut/Components/ForgotPassword';
import AdminAddNews from './pages/AdminCP/NewsManager/AddNews';
import AdminDisplayNews from './pages/AdminCP/NewsManager/ReadNews';
import AdminEditNews from './pages/AdminCP/NewsManager/EditNews';
import NewsDetail from './pages/News/NewsDetail';
import NotFound from './pages/404';
import News from './pages/News';
//REACT REDUX
import { useSelector, useDispatch } from "react-redux";
import { getSaleAction, removeSaleAction, updateSaleStatus } from './redux/actions';
import { useEffect } from 'react';







function BrowserRouter() {
  useEffect(() => {
    dispatch(getSaleAction());
    return () => {
      dispatch(removeSaleAction())
    }
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const saleEvent = useSelector(state => state.adminReducer);
  const { userInfo } = user;
  const { saleList } = saleEvent;

  saleList.map(item => {
    let currentTime = new Date(moment().format('YYYY-MM-DD')).getTime()
    if (currentTime >= new Date(item.batdau).getTime() && currentTime <= new Date(item.ketthuc).getTime() && item.trangthai !== "Đang Bắt Đầu") {
      item.trangthai = "Đang Bắt Đầu";
      dispatch(updateSaleStatus(item))
    } else if (currentTime > new Date(item.ketthuc).getTime() && item.trangthai !== "Đã Kết Thúc") {
      item.trangthai = "Đã Kết Thúc";
      dispatch(updateSaleStatus(item))
    }
  })
  return (
    <Router history={history}>
      <Switch>
        {/* Home */}
        <DefaultLayout
          exact
          path={ROUTERS.HOME}
          component={Home}
        />
        {/* Product Detail */}
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={ProductDetail}
        />
        {/* Login */}
        <LoginLayout exact path={ROUTERS.LOGIN} component={LogInOUt} />

        {/* Product List */}
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_LIST}
          component={ProductList}
        />

        {/* NEWS */}
        <DefaultLayout
          exact
          path={ROUTERS.NEWS}
          component={News}
        />

        {/* NEWS DETAIL */}
        <DefaultLayout
          exact
          path={ROUTERS.NEWS_DETAIL}
          component={NewsDetail}
        />

        {/* Check out Step1 */}
        <LoginLayout
          exact
          path={ROUTERS.CHECKOUT_STEP_1}
          component={CheckoutStep1}
        />
        {/* Check out Step2 */}
        <LoginLayout
          exact
          path={ROUTERS.CHECKOUT_STEP_2}
          component={CheckoutStep2}
        />
        {/* Check out Step3 */}
        <LoginLayout
          exact
          path={ROUTERS.CHECKOUT_STEP_3}
          component={CheckoutStep3}
        />
        <LoginLayout
          exact
          path={ROUTERS.PROFILE}
          component={Profile}
        />
        <LoginLayout
          exact
          path={ROUTERS.EDIT_PROFILE}
          component={EditProfile}
        />
        {/* Forgot Password */}
        <LoginLayout exact path={ROUTERS.FORGOT_PASSWORD} component={ForgotPassword} />
        {/* Reset Password */}
        <LoginLayout exact path={ROUTERS.RESET_PASSWORD} component={ResetPassword} />
        {userInfo[0]?.role === 'admin' ?
          (
            <>
              {/* Admin Add Product */}
              <AdminLayout exact path={ROUTERS.ADD_PRODUCT} component={AddProduct} />
              {/* Admin Display Product */}
              <AdminLayout exact path={ROUTERS.READ_PRODUCT} component={ReadProduct} />
              {/* Admin Display Size */}
              <AdminLayout exact path={ROUTERS.READ_COLOR} component={AdminDisplayColor} />
              {/* Admin Diplay Color */}
              <AdminLayout exact path={ROUTERS.READ_SIZE} component={AdminDisplaySize} />
              {/* Admin Diplay Type */}
              <AdminLayout exact path={ROUTERS.READ_TYPE} component={AdminDisplayType} />
              {/* Admin Detail Product */}
              <AdminLayout exact path={ROUTERS.DETAIL_PRODUCT} component={AdminDetailProduct} />
              {/* Admin Edit Product */}
              <AdminLayout exact path={ROUTERS.EDIT_PRODUCT} component={AdminUpdateProduct} />
              {/* Admin Add Size */}
              <AdminLayout exact path={ROUTERS.ADD_SIZE} component={AdminAddSize} />
              {/* Admin Add Color */}
              <AdminLayout exact path={ROUTERS.ADD_COLOR} component={AdminAddColor} />
              {/* Admin Add Type */}
              <AdminLayout exact path={ROUTERS.ADD_TYPE} component={AdminAddType} />
              {/* Admin Display Order */}
              <AdminLayout exact path={ROUTERS.READ_ORDER} component={AdminDisplayOrder} />
              {/* Admin Display Order Detail*/}
              <AdminLayout exact path={ROUTERS.ORDER_DETAIL} component={AdminOrderDetail} />
              {/* Admin Display User*/}
              <AdminLayout exact path={ROUTERS.READ_USER} component={AdminDisplayUser} />
              {/* Admin Statistic*/}
              <AdminLayout exact path={ROUTERS.STATISTIC} component={AdminStatistic} />
              {/* Admin Add Sale*/}
              <AdminLayout exact path={ROUTERS.ADD_SALE} component={AdminAddSale} />
              {/* Admin Display Sale*/}
              <AdminLayout exact path={ROUTERS.READ_SALE} component={AdminDisplaySale} />
              {/* Admin Add Sale*/}
              <AdminLayout exact path={ROUTERS.ADD_BANNER} component={AdminAddBanner} />
              {/* Admin Display Sale*/}
              <AdminLayout exact path={ROUTERS.READ_BANNER} component={AdminDisplayBanner} />
              {/* Admin Add NEWS*/}
              <AdminLayout exact path={ROUTERS.ADD_NEWS} component={AdminAddNews} />
              {/* Admin Display NEWS*/}
              <AdminLayout exact path={ROUTERS.READ_NEWS} component={AdminDisplayNews} />
              {/* Admin Edit NEWS*/}
              <AdminLayout exact path={ROUTERS.EDIT_NEWS} component={AdminEditNews} />
            </>
          ) : <Route path="*" component={NotFound} />}

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter