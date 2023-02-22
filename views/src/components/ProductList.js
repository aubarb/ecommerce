import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

export default function ProductList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/products");
      category 
      ? setProducts(result.data.filter((product) => product.category_id === category.id))
      : setProducts(result.data);
    };
    fetchData();
  }, [category]);

  return (
    <>
      <div className="container">
        <h1>All Products</h1>
        <div className="row row-cols-5 g-3">
          {products.map((product) => (
            <div className="col">
              <Product
                key={product.id}
                id={product.id}
                sku={product.sku}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                categoryId={product.category_id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
