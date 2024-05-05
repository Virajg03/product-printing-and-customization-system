import React, { useState } from "react";
import axios from "axios";

const CreateCustomizeProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    customizationPrice: 0,
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    brand: "",
    color: "",
    sizes: [
      { name: "m", quantity: "" },
      { name: "xl", quantity: "" },
      { name: "a", quantity: "" }
    ],
    imageUrl: "",
    categoryId: "", // Assuming you will select category from a dropdown
    // Other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSizeChange = (index, e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.map((size, i) =>
        i === index ? { ...size, quantity: value } : size
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/customized/products/`,
        formData
      );
      console.log("Product created:", response.data);
      // Clear form after successful submission
      setFormData({
        title: "",
        description: "",
        price: "",
        customizationPrice: 0,
        discountedPrice: "",
        discountPercent: "",
        quantity: "",
        brand: "",
        color: "",
        sizes: [
          { name: "m", quantity: "" },
          { name: "xl", quantity: "" },
          { name: "a", quantity: "" }
        ],
        imageUrl: "",
        categoryId: ""
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        type="number"
        name="discountedPrice"
        value={formData.discountedPrice}
        placeholder="Discounted Price"
        onChange={handleChange}
      />
      <input
        type="number"
        name="discountPercent"
        value={formData.discountPercent}
        placeholder="Discount Percent"
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        placeholder="Quantity"
        onChange={handleChange}
      />
      <input
        type="text"
        name="brand"
        value={formData.brand}
        placeholder="Brand"
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        placeholder="Color"
        onChange={handleChange}
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        placeholder="Image URL"
        onChange={handleChange}
      />
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {/* Assuming you have categories data from somewhere */}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {formData.sizes.map((size, index) => (
        <input
          key={index}
          type="number"
          value={size.quantity}
          placeholder={`Quantity for size ${size.name}`}
          onChange={(e) => handleSizeChange(index, e)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCustomizeProductForm;
