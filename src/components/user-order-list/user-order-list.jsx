import React, { useState } from 'react';
import './user-order-list-style.css';

const ordersData = [
  {
    id: '57529184',
    executor: 'Дмитро К.',
    details: 'Включає заміну петель, направляючих, фурнітури та відновлення поверхонь. Можливе регулювання дверей, усунення скрипів і заміна пошкоджених частин.',
    date: '12/08/2024',
    price: '450 UAH',
    files: '-',
    status: 'У процесі',
    statusClass: 'in-progress',
  },
  {
    id: '82437659',
    executor: 'Софія Б.',
    details: 'Оновлення оббивки, реставрація каркасу, вирівнювання деформацій. Заміна поролону, пружин, і ремонт механізмів трансформацій для тривалого використання.',
    date: '24/05/2024',
    price: '800 UAH',
    files: '-',
    status: 'Завершено',
    statusClass: 'completed',
  },
  {
    id: '29581473',
    executor: 'Аліса С.',
    details: 'Проведено детальну діагностику, замінено пошкоджені компоненти (екран, батарея, роз\'єм) та очищено внутрішні частини від пилу. Перевірено телефон на функціональність.',
    date: '14/03/2024',
    price: '500 UAH',
    files: '-',
    status: 'Завершено',
    statusClass: 'completed',
  },
  {
    id: '63847219',
    executor: 'Дарія Л.',
    details: 'Проведено глибоке прибирання, включаючи очищення поверхонь, пилосошення, миття підлоги та санітарне очищення ванних кімнат і кухні.',
    date: '28/02/2024',
    price: '600 UAH',
    files: '-',
    status: 'Завершено',
    statusClass: 'completed',
  },
];

const UserOrdersList = () => {
  const [filter, setFilter] = useState('30days');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className='user-orders-container-bg'>
    <div className="user-orders-container">
      <div className="top-user-orders-list">
      <h2>Мої замовлення</h2>
      <div className="filter-dropdown">
        <button className="dropdown-button">{filter === '30days' ? 'Останні 30 днів' : filter === '3months' ? 'Останні 3 місяці' : 'Рік'}</button>
        <div className="dropdown-content">
          <div onClick={() => handleFilterChange('30days')}>Останні 30 днів</div>
          <div onClick={() => handleFilterChange('3months')}>Останні 3 місяці</div>
          <div onClick={() => handleFilterChange('year')}>Рік</div>
        </div>
      </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>№ замовлення</th>
            <th>Виконавець</th>
            <th>Деталі</th>
            <th>Дата створення</th>
            <th>Вартість</th>
            <th>Файли</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.executor}</td>
              <td className="order-details">{order.details}</td>
              <td>{order.date}</td>
              <td>{order.price}</td>
              <td>{order.files}</td>
              <td>
                <span className={`status ${order.statusClass}`}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserOrdersList;
