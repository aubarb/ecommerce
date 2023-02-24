import React, { useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useRecoilState } from "recoil";
import { productsAtom } from "../recoil/products/atom";
import { baseUrl } from "../utils/API";

export default function ProductList({ category }) {
  const [products, setProducts] = useRecoilState(productsAtom);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${baseUrl}/products`);
      category
        ? setProducts(
            result.data.filter((product) => product.category_id === category.id)
          )
        : setProducts(result.data);
    };
    fetchData();
  }, [category, setProducts]);

  return (
    <>
      <div className="container">
        <h1>All Products</h1>
        <div className="row row-cols-5 g-3">
          {products.map((product, index) => (
            <div className="col">
              <Product
                key={index}
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
