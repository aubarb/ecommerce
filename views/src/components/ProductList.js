import React, { useEffect } from "react";
import Product from "./Product";
import { useRecoilState } from "recoil";
import { productsAtom } from "../recoil/products/atom";
import { getProducts } from "../api/products";

export default function ProductList({ category }) {
  const [products, setProducts] = useRecoilState(productsAtom);

  useEffect(() => {
    const fethProducts = async () => {
      const data = await getProducts();
      category
        ? setProducts(
            data.filter((product) => product.category_id === category.id)
          )
        : setProducts(data);
    };
    fethProducts();
  }, [category, setProducts]);

  const heading = category ? `Products in ${category.name}` : "All Products";


  return (
    <>
      <div className="container">
        <h1>{heading}</h1>
        <div className="row row-cols-5 g-3">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
