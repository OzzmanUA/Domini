import React, { useState } from "react";
import './order.css';

import top_bg from './images/top_bg.png';

const OrderForm = () => {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("Київ");
  const [date, setDate] = useState("2024-10-07");
//hi
  return (
    <form className="order-form">

     <div className="order-top-bg">
     <img src={top_bg} alt="Top_bg" />
     </div>   


        <h2>Категорія замовлення</h2>
    <div className="form-group-border">
      <div className="form-group">
        <label htmlFor="category">Оберіть відповідну категорію замовлення</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Сантехнік">Сантехнік</option>
          {/* Другие категории можно добавить здесь */}
        </select>
      </div>
    </div>


        <h2>Деталі замовлення</h2>
    <div className="form-group-border">
      <div className="form-group">
        <label htmlFor="short-description">Що потрібно зробити (коротко)?</label>
        <input type="text" id="short-description" placeholder="Введіть короткий опис" />
      </div>

      <div className="form-group">
        <label htmlFor="detailed-description">Детально опишіть ваше замовлення</label>
        <input type="text" id="detailed-description" placeholder="Введіть детальний опис" />
      </div>
      </div>

        <h2>Адреса виконання замовлення</h2>
    <div className="form-group-border">
      <div className="form-group address">
        <div className="address-fields">
            <span>Місто</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Київ">Київ</option>
            {/* Добавьте другие города по необходимости */}
          </select>
          <span>Вулиця</span>
          <input type="text" />
          <span>Будинок</span>
          <input type="text" />
        </div>
      </div>
    </div>

    <div className="order-bottom">
        <div className="order-bottom-left">
            <h2>Вартість роботи</h2>
        <div className="work-price">
            <div className="form-group">
            <label>Орієнтовна вартість послуги</label>
            <input type="text" id="price" placeholder="UAN"/>
            </div>
            <div className="checkbox">
            <input type="checkbox" id="price-agreement" />
            <label htmlFor="price-agreement">Ціна договірна</label>
            </div>
        </div>
        </div>
        <div className="order-bottom-right">
            <h2>Дата виконання замовлення</h2>
        <div className="form-group">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        </div>
    </div>


      <button type="submit" className="submit-btn">Опублікувати</button>
    </form>
  );
};

export default OrderForm;
