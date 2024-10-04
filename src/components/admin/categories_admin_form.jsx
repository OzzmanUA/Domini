import React, { useEffect, useState } from "react"
import { getAllCats } from "../utils/ApiFunctions";
import categoriesList from "../main_parts_auth/categories/categoriesList";
import "./categories_admin_form_style.css";

const CategoryForm = () => {
  const [categories, setCategories] = useState(categoriesList);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subcategories: "",
    image: ""
  });



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



  // Удаление категории
  const deleteCategory = (title) => {
    setCategories(categories.filter((category) => category.title !== title));
  };

  // Включение режима редактирования
  const editCategory = (category) => {
    setEditingCategory(category.title);
    setFormData({
      title: category.title,
      subcategories: category.subcategories.join(", "),
      image: category.image
    });
  };

  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Сохранение изменений
  const saveChanges = () => {
    if (editingCategory) {
      // Редактирование категории
      setCategories(
        categories.map((category) =>
          category.title === editingCategory
            ? {
                ...category,
                title: formData.title,
                subcategories: formData.subcategories.split(",").map((sub) => sub.trim()),
                image: formData.image
              }
            : category
        )
      );
      setEditingCategory(null);
    } else {
      // Добавление новой категории
      setCategories([
        ...categories,
        {
          title: formData.title,
          subcategories: formData.subcategories.split(",").map((sub) => sub.trim()),
          image: formData.image
        }
      ]);
    }
    setFormData({ title: "", subcategories: "", image: "" });
  };

  return (
    <div className="category-form-container">
      <h2 className="cat-manegH2">Category Management</h2>

      {/* Форма для добавления/редактирования категории */}
      <div className="form-section">
        <input
          type="text"
          name="title"
          placeholder="Category Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subcategories"
          placeholder="Subcategories (comma separated)"
          value={formData.subcategories}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <button onClick={saveChanges}>{editingCategory ? "Save Changes" : "Add Category"}</button>
      </div>

      {/* Отображение списка категорий */}
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.title} className="category-item">
            <img src={category.image} alt={category.title} className="category-image_edit" />
            <div>
              <h3>{category.title}</h3>
              <p>Subcategories: {category.subcategories.join(", ")}</p>
              <button onClick={() => editCategory(category)}>Edit</button>
              <button onClick={() => deleteCategory(category.title)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;
