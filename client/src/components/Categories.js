import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryAtom } from "../recoil/category/atom";
import { categoriesAtom } from "../recoil/categories/atom";
import { getCategories } from "../api/categories";
import { searchAtom } from "../recoil/products/atom";

export default function Categories() {
  const [categories, setCategories] = useRecoilState(categoriesAtom);
  const setCategory = useSetRecoilState(categoryAtom);
  const setSearchTerm = useSetRecoilState(searchAtom);

  //Fetching the categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, [setCategories]);

  return (
    <div className="nav-item dropdown">
      <button
        className="btn btn-primary  dropdown-toggle"
        id="navbarDropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categories
      </button>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        {categories.map((category) => (
          <li key={category.id} className="dropdown-item">
            <Link
              to={`/categories/${category.name}`}
              onClick={() => {
                setCategory(category);
                setSearchTerm("");
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
