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

  const heading = category ? `${category.name}` : "All Products";

  return (
    <>
      <div className="container">
        <h1 className="text-center m-4">{heading}</h1>
        <div className="row row-cols-xl-5 g-3">
          {productList.map((product, index) => (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
