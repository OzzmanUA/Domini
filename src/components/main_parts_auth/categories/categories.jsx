import React from "react";

import "./categories.css";
import { getAllParentCategories } from "../../utils/ApiFunctions";
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

const Category = ({ image, name, subcategories }) => {
  return (

    <div className="category-card">
      <img src={image} alt={name} className="category-image" />
      <h3>{name}</h3>
      <ul>
        {subcategories.map((sub, key) => (
          <li key={key}>{sub}</li>
        ))}
      </ul>
      <a href="#"><h4>Показати ще 🡣</h4></a>
    </div>

  );
};
// const categoriesList2 = getAllParentCategories();
const Categories = ({ categories }) => {

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <Category
          key={index}
          image={category.image}
          name={category.name}
          subcategories={category.subcategories}
        />
      ))}
    </div>
  );
};
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

export default Categories;
