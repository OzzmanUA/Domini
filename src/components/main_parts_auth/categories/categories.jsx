import React from "react";
import "./categories.css";

const Category = ({ image, title, subcategories }) => {
  return (
    <body>
    <div className="category-card">
      <img src={image} alt={title} className="category-image" />
      <h3>{title}</h3>
      <ul>
        {subcategories.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </ul>
      <a href="#"><h4>Показати ще 🡣</h4></a>
    </div>
    </body>
  );
};

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <Category
          key={index}
          image={category.image}
          title={category.title}
          subcategories={category.subcategories}
        />
      ))}
    </div>
  );
};

export default Categories;
