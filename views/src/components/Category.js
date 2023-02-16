import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/category');
      console.log(result);
      setCategories(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} ({category.description})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
