import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParentCategories } from "../../utils/ApiFunctions"; // Assuming you already have this function

// const NavMenu = () => {
//   const [categories, setCategories] = useState([]); // State for storing categories
//   const [loading, setLoading] = useState(true); // State for loading status

//   // Fetch categories when the component mounts
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categoriesList = await getAllParentCategories(); // Fetch the categories
//         setCategories(categoriesList); // Store them in the state
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false); // End loading state
//       }
//     };

//     fetchCategories(); // Fetch categories when component is mounted
//   }, []);

//   // Display loading state
//   if (loading) {
//     return <div>Loading categories...</div>;
//   }

//   // return (
//   //   <div className="nav-container">
//   //     <ul className="nav-menu">
//   //       {categories.map((category) => (
//   //         <li key={category.id}>
//   //           <a href={`/categories/${category.id}`}>{category.name}</a> {/* Assuming each category has a name */}
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
//   // );
//   return (
//     <div className="nav-container">
//       <ul className="nav-menu">
//         {categories.map((category) => (
//           <li key={category.id}>
//             <a href={`/pcatalog`}>{category.name}</a> {/* Assuming each category has a name */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NavMenu;

const NavMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getAllParentCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  const handleCategoryClick = (categoryId) => {
    // Navigate to the ProfilesCatalog page with the categoryId
    navigate(`/pcatalog/${categoryId}`);
  };

  return (
    <div className="nav-container">
      <ul className="nav-menu">
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;