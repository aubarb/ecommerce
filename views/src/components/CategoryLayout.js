import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

export default function CategoryLayout() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/categories');
      setCategories(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <ul>
        {categories.map(category => (
          <Link to={`/categories/${category.name}`}>
            <li key={category.id}>
              {category.name} ({category.description})
            </li>
          </Link> 
        ))}
      </ul>
      <Outlet />
    </>
  );
}
