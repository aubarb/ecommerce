import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/product');
      console.log(result);
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} Price: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
