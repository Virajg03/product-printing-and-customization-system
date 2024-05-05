import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
// import AdminPannel from '../Admin/Admin/AdminPannel'
// import Admin from '../Admin/Admin'
// import Admin from '../Admin/Admin'
// import Adminpanel from '
import Home from "../Admin/pages/home/Home";
import UserList from "../Admin/pages/userList/UserList";
import User from "../Admin/pages/user/User";
import NewUser from "../Admin/pages/newUser/NewUser";
import ProductList from "../Admin/pages/productList/ProductList";
import Product from "../Admin/pages/product/Product";
import NewProduct from "../Admin/pages/newProduct/NewProduct";
import Topbar from "../Admin/components/topbar/Topbar";
import Sidebar from "../Admin/components/sidebar/Sidebar";
import CreateProductForm from "../Admin/pages/product/CreateProductForm";
// import AdminPannel from "../Admin/AdminPannel";
// Product-Printing\src\Admin\Admin

const AdminLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

const AdminRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UserList />} />
          <Route path="createproduct" element={<CreateProductForm />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="newUser" element={<NewUser />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="newproduct" element={<NewProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouters;
