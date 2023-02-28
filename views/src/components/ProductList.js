import React, { useEffect } from "react";
import Product from "./Product";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsAtom, searchAtom } from "../recoil/products/atom";
import { getProducts } from "../api/products";

export default function ProductList({ category }) {
  const [products, setProducts] = useRecoilState(productsAtom);
  const searchTerm = useRecoilValue(searchAtom)

  console.log(searchTerm);

  useEffect(() => {
    const fethProducts = async () => {
      const data = await getProducts();
      if (searchTerm !== "") {
        setProducts(
          data.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      } else if (category) {
        setProducts(
          data.filter((product) => product.category_id === category.id)
        );
      } else {
        setProducts(data);
      }
    };
    fethProducts();
  }, [category, setProducts, searchTerm, products]);

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
