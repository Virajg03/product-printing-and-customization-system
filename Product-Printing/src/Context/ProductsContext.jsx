import React, { createContext, useState } from "react";

// Create a context
const ProductsContext = createContext(undefined);
const ProductsDispatchContext = createContext(undefined);
// Create a provider component
const ProductsProvider = ({ children }) => {
  // State to store the products array
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={products}>
        <ProductsDispatchContext.Provider value={setProducts}>
          {children}
        </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsDispatchContext, ProductsProvider };