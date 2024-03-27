import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navigation from './customer/components/Navigation/Navigation';
import Product from './customer/components/Product/Product';
import HomePage from './customer/pages/HomePage/HomePage';
import GetCategory from "./customer/context/GetCategory";
import SelectProduct from "./customer/components/SelectedProduct/SelectProduct";
import SelectedProduct from "./customer/context/SelectedProduct";
import EachUserProfile from "./customer/components/EachUser/EachUserProfile";
import LoginForm from "./customer/components/Auth/LoginForm";
import SignupForm from "./customer/components/Auth/SignupForm";
import Cart from "./customer/components/Cart/Cart";
import ProtectedRoute from "./Route/ProtectedRoute";


function App() {

  return (
    <SelectedProduct>
      <GetCategory>
        <Router>
          <Routes>
            <Route exact path='/' element={<><Navigation /><HomePage /><Product /></>}></Route>
            <Route exact path='/signup' element={<><Navigation /><SignupForm/></>}></Route>
            <Route exact path='/signin' element={<><Navigation /><LoginForm /></>}></Route>
            <Route exact path='/profile' element={<ProtectedRoute><Navigation /><EachUserProfile /></ProtectedRoute>}></Route>
            <Route exact path='/men' element={<><Navigation /><Product /></>}></Route>
            <Route exact path='/women' element={<><Navigation /><Product /></>}></Route>
            <Route exact path='/electronics' element={<><Navigation /><Product /></>}></Route>
            <Route exact path='/store' element={<><Navigation /><Product /></>}></Route>
            <Route exact path='/children' element={<><Navigation /><Product /></>}></Route>
            <Route exact path='/cart' element={<ProtectedRoute><Navigation /><Cart/></ProtectedRoute>}></Route>
            {/* <Route exact path='/selectedProduct' element={<><Navigation /><SelectProduct /></>}></Route> */}
            <Route exact path='/product/:pid' element={<><Navigation /><SelectProduct /></>}></Route>
          </Routes>
        </Router>
      </GetCategory>
    </SelectedProduct>
  );
}

export default App;
