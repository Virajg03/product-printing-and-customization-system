import React from 'react';

const CustomizedProductDetails = ({ items }) => {
  return (
    <div>
      <h2>Customized Product Details</h2>
      <div>
      <p className="font-semibold ">{items.product ? items.product.title : ""}</p>
        <p><strong>Brand:</strong> {customizedProduct.brand}</p>
        <p><strong>Category:</strong> {customizedProduct.category.name}</p>
        <p><strong>Color:</strong> {customizedProduct.color}</p>
        <p><strong>Description:</strong> {customizedProduct.description}</p>
        <p><strong>Discount Percentage:</strong> {customizedProduct.discountPersent}%</p>
        <p><strong>Discounted Price:</strong> {customizedProduct.discountedPrice}</p>
        <p><strong>Image URL:</strong> <img src={customizedProduct.imageUrl} alt="Product" /></p>
        <p><strong>Price:</strong> {customizedProduct.price}</p>
        <p><strong>Quantity:</strong> {customizedProduct.quantity}</p>
        <p><strong>User:</strong> {customizedProduct.user.firstName} {customizedProduct.user.lastName}</p>
        <p><strong>Size:</strong> {customizedProduct.sizes.map(size => size.name).join(', ')}</p>
        <p><strong>Created At:</strong> {new Date(customizedProduct.createdAt).toLocaleDateString()}</p>
        <p><strong>Design Added At:</strong> {new Date(customizedProduct.design.addedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CustomizedProductDetails;
