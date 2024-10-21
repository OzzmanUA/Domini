import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import './order.css';
import { fetchWorkerDetailedInfo, createTaskForWorker, fetchCategoryById } from "../utils/ApiFunctions";
import top_bg from './images/top_bg.png';



const OrderForm = () => {
  const { userId } = useParams(); // Get workerId from the URL
  const clientId = localStorage.getItem("userId"); // Get clientId from local storage
  const token = localStorage.getItem("token"); // Get the token for authorization

  // State to store form data
  const [category, setCategory] = useState("");
  const [workerCategories, setWorkerCategories] = useState([]); // Use empty array instead of null
  const [categoryNames, setCategoryNames] = useState({}); // Store categoryId to name mapping
  const [shortDescription, setShortDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [country, setCountry] = useState(""); // New state for country
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState(""); // New state for district
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [price, setPrice] = useState("");
  const [isPriceNegotiable, setIsPriceNegotiable] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the worker's categories when the component mounts
  useEffect(() => {
    const fetchWorkerCategories = async () => {
      try {
        const workerData = await fetchWorkerDetailedInfo(userId);
        setWorkerCategories(workerData.categoriesWithPrices || []);

        // Fetch category names by their IDs and store directly as string
        const categoryNameMapping = {};
        for (let category of workerData.categoriesWithPrices) {
          const categoryName = await fetchCategoryById(category.categoryId); // fetchCategoryById returns a string directly
          categoryNameMapping[category.categoryId] = categoryName; // Store the string directly
        }
        setCategoryNames(categoryNameMapping); // Set mapping from categoryId to categoryName
      } catch (error) {
        console.error('Error fetching worker categories:', error);
        setWorkerCategories([]); // Fallback to an empty array if there's an error
      }
    };

    fetchWorkerCategories();
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      description: shortDescription,
      details: detailedDescription,
      price: parseFloat(price), // Ensure price is a number
      completionDate: date,
      categoryId: category, // Use the selected category ID directly
      clientId: clientId, // Use the logged-in client's ID
      country: country, // Use the inputted country
      city: city,
      district: district, // Use the inputted district
      street: street,
      house: house,
      status: isPriceNegotiable ? 'NEGOTIABLE' : 'ACTIVE' // Set status based on price negotiation
    };

    try {
      console.log(taskData)
      const response = await createTaskForWorker(taskData, userId); // Call the updated function
      console.log(response);
      setMessage("Task created successfully!");
    } catch (error) {
      setMessage("Error creating task: " + (error.response?.data?.message || error.message));
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
          <label htmlFor="category">Оберіть відповідну категорію замовлення</label>
          {workerCategories.length === 0 ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Оберіть категорію</option>
              {workerCategories.map((cat, index) => (
                <option key={index} value={cat.categoryId}>
                  {categoryNames[cat.categoryId] || 'Loading...'} - {cat.servicePrice} UAH
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <h2>Деталі замовлення</h2>
      <div className="form-group-border">
        <div className="form-group">
          <label htmlFor="short-description">Що потрібно зробити (коротко)?</label>
          <input
            type="text"
            id="short-description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Введіть короткий опис"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailed-description">Детально опишіть ваше замовлення</label>
          <input
            type="text"
            id="detailed-description"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            placeholder="Введіть детальний опис"
            required
          />
        </div>
      </div>

      <h2>Адреса виконання замовлення</h2>
      <div className="form-group-border">
        <div className="form-group address">
          <div className="address-fields">
            <span>Країна</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Введіть країну"
              required
            />
            <span>Місто</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введіть місто"
              required
            />
            <span>Район</span>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Введіть район"
              required
            />
            <span>Вулиця</span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Введіть вулицю"
              required
            />
            <span>Будинок</span>
            <input
              type="text"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
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
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="UAN"
                required
              />
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="price-agreement"
                checked={isPriceNegotiable}
                onChange={(e) => setIsPriceNegotiable(e.target.checked)}
              />
              <label htmlFor="price-agreement">Ціна договірна</label>
            </div>
          </div>
        </div>

        <div className="order-bottom-right">
          <h2>Дата виконання замовлення</h2>
          <div className="form-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn">Опублікувати</button>

      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default OrderForm;

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
