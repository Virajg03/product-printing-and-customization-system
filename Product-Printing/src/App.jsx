import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRouters from './Routers/CustomerRouters';
import { ProductsProvider } from './Context/ProductsContext';
import AdminRouters from './Routers/AdminRouters';

function App() {
  return (
    <div className=''> 
      <Router>
        <ProductsProvider>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
          
          <Route path="/admin/*" element={<AdminRouters/>}/>
        </Routes> 
      </ProductsProvider>
      </Router>
    </div>
  );
}

export default App;
