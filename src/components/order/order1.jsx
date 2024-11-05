import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import './order.css';
import { getAllCategories, createTask } from "../utils/ApiFunctions";
import top_bg from './images/top_bg.png';



const OrderFormNonSpecific = () => {
  const { userId } = useParams(); // Get workerId from the URL
  const clientId = localStorage.getItem("userId"); // Get clientId from local storage
  const token = localStorage.getItem("token"); // Get the token for authorization

  // Centralized state to store form data
  const [taskData, setTaskData] = useState({
    description: '',
    details: '',
    price: '',
    completionDate: '',
    categoryId: '',
    country: '',
    city: '',
    district: '',
    street: '',
    house: '',
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all available categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories(); // Get all available categories
        setCategories(categoryList || []);
        console.log(categoryList)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change for task data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const taskPayload = {
      ...taskData,
      clientId,
      price: parseFloat(taskData.price), // Ensure price is a number
    };

    try {
      console.log('Task Payload:', taskPayload);
      const response = await createTask(taskPayload, token); // Call createTask and pass token
      console.log(response);
      setMessage("Завдання створено!");

      // Reset form fields
      setTaskData({
        description: '',
        details: '',
        price: '',
        completionDate: '',
        categoryId: '',
        country: '',
        city: '',
        district: '',
        street: '',
        house: '',
      });
    } catch (error) {
      setMessage("Error creating task: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="order-top-bg">
        <img src={top_bg} alt="Top_bg" />
      </div>

      <h2>Категорія замовлення</h2>
      <div className="form-group-border">
        <div className="form-group">
          <label htmlFor="categoryId">Оберіть відповідну категорію замовлення</label>
          <select
            name="categoryId"
            value={taskData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Оберіть категорію</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2>Деталі замовлення</h2>
      <div className="form-group-border">
        <div className="form-group">
          <label htmlFor="description">Що потрібно зробити (коротко)?</label>
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            placeholder="Введіть короткий опис"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Детально опишіть ваше замовлення</label>
          <textarea
            name="details"
            value={taskData.details}
            onChange={handleInputChange}
            placeholder="Введіть детальний опис"
            required
          ></textarea>
        </div>
      </div>

      <h2>Адреса виконання замовлення</h2>
      <div className="form-group-border">
        <div className="form-group address">
          <div className="address-fields">
            <span>Країна</span>
            <input
              type="text"
              name="country"
              value={taskData.country}
              onChange={handleInputChange}
              placeholder="Введіть країну"
              required
            />
            <span>Місто</span>
            <input
              type="text"
              name="city"
              value={taskData.city}
              onChange={handleInputChange}
              placeholder="Введіть місто"
              required
            />
            <span>Район</span>
            <input
              type="text"
              name="district"
              value={taskData.district}
              onChange={handleInputChange}
              placeholder="Введіть район"
            />
            <span>Вулиця</span>
            <input
              type="text"
              name="street"
              value={taskData.street}
              onChange={handleInputChange}
              placeholder="Введіть вулицю"
              required
            />
            <span>Будинок</span>
            <input
              type="text"
              name="house"
              value={taskData.house}
              onChange={handleInputChange}
              placeholder="Введіть будинок"
              required
            />
          </div>
        </div>
      </div>

      <div className="order-bottom">
        <div className="order-bottom-left">
          <h2>Вартість роботи</h2>
          <div className="work-price">
            <div className="form-group">
              <label>Орієнтовна вартість послуги</label>
              <input
                type="number"
                name="price"
                value={taskData.price}
                onChange={handleInputChange}
                placeholder="UAN"
                required
              />
            </div>
          </div>
        </div>

        <div className="order-bottom-right">
          <h2>Дата виконання замовлення</h2>
          <div className="form-group">
            <input
              type="date"
              name="completionDate"
              value={taskData.completionDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Creating...' : 'Опублікувати'}
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default OrderFormNonSpecific;
// const OrderForm = () => {
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("Київ");
//   const [date, setDate] = useState("2024-10-07");
// //hi
//   return (
//     <form className="order-form">

//      <div className="order-top-bg">
//      <img src={top_bg} alt="Top_bg" />
//      </div>   


//         <h2>Категорія замовлення</h2>
//     <div className="form-group-border">
//       <div className="form-group">
//         <label htmlFor="category">Оберіть відповідну категорію замовлення</label>
//         <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="Сантехнік">Сантехнік</option>
//           {/* Другие категории можно добавить здесь */}
//         </select>
//       </div>
//     </div>


//         <h2>Деталі замовлення</h2>
//     <div className="form-group-border">
//       <div className="form-group">
//         <label htmlFor="short-description">Що потрібно зробити (коротко)?</label>
//         <input type="text" id="short-description" placeholder="Введіть короткий опис" />
//       </div>

//       <div className="form-group">
//         <label htmlFor="detailed-description">Детально опишіть ваше замовлення</label>
//         <input type="text" id="detailed-description" placeholder="Введіть детальний опис" />
//       </div>
//       </div>

//         <h2>Адреса виконання замовлення</h2>
//     <div className="form-group-border">
//       <div className="form-group address">
//         <div className="address-fields">
//             <span>Місто</span>
//           <select value={city} onChange={(e) => setCity(e.target.value)}>
//             <option value="Київ">Київ</option>
//             {/* Добавьте другие города по необходимости */}
//           </select>
//           <span>Вулиця</span>
//           <input type="text" />
//           <span>Будинок</span>
//           <input type="text" />
//         </div>
//       </div>
//     </div>

//     <div className="order-bottom">
//         <div className="order-bottom-left">
//             <h2>Вартість роботи</h2>
//         <div className="work-price">
//             <div className="form-group">
//             <label>Орієнтовна вартість послуги</label>
//             <input type="text" id="price" placeholder="UAN"/>
//             </div>
//             <div className="checkbox">
//             <input type="checkbox" id="price-agreement" />
//             <label htmlFor="price-agreement">Ціна договірна</label>
//             </div>
//         </div>
//         </div>
//         <div className="order-bottom-right">
//             <h2>Дата виконання замовлення</h2>
//         <div className="form-group">
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//         </div>
//         </div>
//     </div>


//       <button type="submit" className="submit-btn">Опублікувати</button>
//     </form>
//   );
// };

// export default OrderForm;
