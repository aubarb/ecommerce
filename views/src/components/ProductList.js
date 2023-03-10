import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useRecoilValue } from "recoil";
import { productsAtom, searchAtom } from "../recoil/products/atom";

export default function ProductList({ category }) {
  const products = useRecoilValue(productsAtom);
  const [productList, setProductList] = useState([]);
  const searchTerm = useRecoilValue(searchAtom);

  useEffect(() => {
    if (searchTerm !== "") {
      setProductList(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (category) {
      setProductList(
        products.filter((product) => product.category_id === category.id)
      );
    } else {
      setProductList(products);
    }
  }, [category, searchTerm, products]);

  const heading = category ? `Products in ${category.name}` : "All Products";

  return (
    <>
      <div className="container">
        <h1>{heading}</h1>
        <div className="row row-cols-5 g-3">
          {productList.map((product, index) => (
            <div className="col" key={index}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
