import React, { useState, useEffect } from "react";
import "./categories.css";
import { api } from "../../utils/ApiFunctions";
import { getAllCategories } from "../../utils/ApiFunctions"; // Import API functions

// Замените на любое изображение по умолчанию
const defaultImage = "https://via.placeholder.com/320";

// Component for individual Category with child categories
const Category = ({ image, name, subcategories }) => {
  return (
    <div className="category-card">
      <img src={image} alt={name} className="category-image" />
      <h3>{name}</h3>

      {/* Display child categories if available */}
      {subcategories && subcategories.length > 0 && (
        <ul className="subcategory-list">
          {subcategories.map((sub) => (
            <li key={sub.id}>{sub.name}</li>
          ))}
        </ul>
      )}

      <a href="#"><h4>Показати ще 🡣</h4></a>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]); // Состояние для хранения категорий
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Хук для получения данных с сервера при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getAllCategories(); // Fetch parent categories and their children
        setCategories(categoriesList); // Устанавливаем данные в состояние
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Отключаем индикатор загрузки
      }
    };

    fetchCategories(); // Вызов асинхронной функции
  }, []);

  // Если данные еще загружаются
  if (loading) {
    return <div>Loading categories...</div>;
  }

  // Если данных нет или они неверны
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div>No categories found!</div>;
  }

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Category
          key={category.id}
          image={category.imageUrl ? `${api.defaults.baseURL}${category.imageUrl}` : defaultImage}  // Use API baseURL from axios config or fallback to default
          name={category.name}  // Display category name
          subcategories={category.subcategories}  // Pass subcategories to the Category component
        />
      ))}
    </div>
  );
};

export default Categories;




// import React, { useState, useEffect } from "react";
// import "./categories.css";
// import { getAllParentCategories } from "../../utils/ApiFunctions";
// import { getAllCategories } from "../../utils/ApiFunctions";

// // Замените на любое изображение по умолчанию
// const defaultImage = "https://via.placeholder.com/320";

// const Category = ({ image, name }) => {
//   return (
//     <div className="category-card">
//       <img src={image} alt={name} className="category-image" />
//       <h3>{name}</h3>
//       <a href="#"><h4>Показати ще 🡣</h4></a>
//     </div>
//   );
// };

// const Categories = () => {
//   const [categories, setCategories] = useState([]); // Состояние для хранения категорий
//   const [loading, setLoading] = useState(true); // Состояние загрузки

//   // Хук для получения данных с сервера при монтировании компонента
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categoriesList = await getAllParentCategories();
//         setCategories(categoriesList); // Устанавливаем данные в состояние
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false); // Отключаем индикатор загрузки
//       }
//     };

//     fetchCategories(); // Вызов асинхронной функции
//   }, []);

//   // Если данные еще загружаются
//   if (loading) {
//     return <div>Loading categories...</div>;
//   }

//   // Если данных нет или они неверны
//   if (!Array.isArray(categories) || categories.length === 0) {
//     return <div>No categories found!</div>;
//   }

//   return (
//     <div className="categories-container">
//       {categories.map((category) => (
//         <Category
//           key={category.id}
//           image={category.imageUrl ? `http://localhost:8080${category.imageUrl}` : defaultImage}  // Use server image or fallback to default
//           name={category.name}  // Выводим только имя категории
//         />
//       ))}
//     </div>
//   );
// };

// export default Categories;






// const [isLoading, setIsLoading] = useState(false)
// const [errorMessage, setErrorMessage] = useState("")
// useEffect(() => {
// fetchCats()
// }, [])

// const fetchCats = async () => {
// setIsLoading(true)
// try {
//   const result = await getAllCats()
//   categoriesList(result)
//   setIsLoading(false)
//   } catch (error) {
//   setErrorMessage(error.message)
//   setIsLoading(false)
//   }
// }


// const categoriesList2 = getAllParentCategories();


// const Categories = ({ categories }) => {
//   return (
//     <div className="categories-container">
//       {categories.map((category, index) => (
//         <Category
//           key={index}
//           image={category.image}
//           title={category.title}
//           subcategories={category.subcategories}
//         />
//       ))}
//     </div>
//   );
// };