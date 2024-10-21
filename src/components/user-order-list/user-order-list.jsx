import React, { useState, useEffect } from 'react';
import './user-order-list-style.css';
import { getUserTasks, completeTask, cancelTask, reportTask, leaveReview  } from '../utils/ApiFunctions';
// const ordersData = [
//   {
//     id: '57529184',
//     executor: 'Дмитро К.',
//     details: 'Включає заміну петель, направляючих, фурнітури та відновлення поверхонь. Можливе регулювання дверей, усунення скрипів і заміна пошкоджених частин.',
//     date: '12/08/2024',
//     price: '450 UAH',
//     files: '-',
//     status: 'У процесі',
//     statusClass: 'in-progress',
//   },
//   {
//     id: '82437659',
//     executor: 'Софія Б.',
//     details: 'Оновлення оббивки, реставрація каркасу, вирівнювання деформацій. Заміна поролону, пружин, і ремонт механізмів трансформацій для тривалого використання.',
//     date: '24/05/2024',
//     price: '800 UAH',
//     files: '-',
//     status: 'Завершено',
//     statusClass: 'completed',
//   },
//   {
//     id: '29581473',
//     executor: 'Аліса С.',
//     details: 'Проведено детальну діагностику, замінено пошкоджені компоненти (екран, батарея, роз\'єм) та очищено внутрішні частини від пилу. Перевірено телефон на функціональність.',
//     date: '14/03/2024',
//     price: '500 UAH',
//     files: '-',
//     status: 'Завершено',
//     statusClass: 'completed',
//   },
//   {
//     id: '63847219',
//     executor: 'Дарія Л.',
//     details: 'Проведено глибоке прибирання, включаючи очищення поверхонь, пилосошення, миття підлоги та санітарне очищення ванних кімнат і кухні.',
//     date: '28/02/2024',
//     price: '600 UAH',
//     files: '-',
//     status: 'Завершено',
//     statusClass: 'completed',
//   },
// ];
const UserOrdersList = () => {
  const [createdTasks, setCreatedTasks] = useState([]);
  const [acceptedTasks, setAcceptedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem('token'));
  const [userId] = useState(localStorage.getItem('userId'));
  const [reviewContent, setReviewContent] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const userTasks = await getUserTasks(userId, token);
        setCreatedTasks(userTasks.createdTasks);
        setAcceptedTasks(userTasks.acceptedTasks);
      } catch (error) {
        console.error('Error fetching user tasks:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, token]);



  const handleComplete = async (taskId) => {
    try {
      const message = await completeTask(taskId, token);
      alert(message);
      // Optionally refresh tasks after completion
    } catch (error) {
      alert("Error completing task: " + error.message);
    }
  };

  const handleCancel = async (taskId) => {
    try {
      const message = await cancelTask(taskId, token);
      alert(message);
      // Optionally refresh tasks after cancellation
    } catch (error) {
      alert("Error canceling task: " + error.message);
    }
  };
  const handleReport = async (taskId) => {
    try {
      const message = await reportTask(taskId, token);
      alert(message); // Alert the user on success
      // Optionally refresh tasks after reporting
    } catch (error) {
      alert("Error reporting task: " + error.message);
    }
  };

  const handleReview = async (taskId) => {
    if (!reviewContent) {
      alert("Please enter a review.");
      return;
    }

    const reviewDTO = { content: reviewContent };

    try {
      const message = await leaveReview(taskId, reviewDTO);
      alert(message);
      setReviewContent("");
      // Optionally refresh tasks after leaving a review
    } catch (error) {
      alert("Error leaving review: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className='user-orders-container-bg'>
      <div className="user-orders-container">
        <div className="top-user-orders-list">
          <h2>Мої замовлення</h2>
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
            {createdTasks.length > 0 ? (
              createdTasks.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.workerName}</td>
                  <td className="order-details">{order.description}</td>
                  <td>{order.creationDate}</td>
                  <td>{order.price} грн</td>
                  <td>-</td>
                  <td>
                   <span className={
                     order.status === 'IN_PROCESS' ? 'in-progress' :
                     order.status === 'COMPLETED' ? 'completed' :
                     order.status === 'CANCELED' ? 'canceled' :
                     order.status === 'PROBLEM' ? 'problem' :
                     'active'
                   }>
                     {
                       order.status === 'IN_PROCESS' ? 'У процесі' :
                       order.status === 'COMPLETED' ? 'Завершено' :
                       order.status === 'CANCELED' ? 'Скасовано' :
                       order.status === 'PROBLEM' ? 'Проблема' :
                       'Активне'
                     }
                   </span>
                 </td>
                 
                 <td>
                   {order.status === 'IN_PROCESS' && (
                     <>
                       <button onClick={() => handleComplete(order.id)}>Завершити</button>
                       <button onClick={() => handleCancel(order.id)}>Скасувати</button>
                     </>
                   )}
                   
                   {order.status === 'ACTIVE' && (
                     <>
                       <button onClick={() => handleComplete(order.id)}>Завершити</button>
                       <button onClick={() => handleCancel(order.id)}>Скасувати</button>
                     </>
                   )}
                 
                   {order.status === 'PROBLEM' && (
                     <>
                       <button onClick={() => handleReport(order.id)}>Поскаржитися</button>
                     </>
                   )}
                 
                   {order.status === 'COMPLETED' && (
                     <span>Завершено</span>
                   )}
                 
                   {order.status === 'CANCELED' && (
                     <span>Скасовано</span>
                   )}
                 </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Немає створених замовлень.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="top-user-orders-list">
          <h2>Прийняті завдання</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>№ завдання</th>
              <th>Клієнт</th>
              <th>Деталі</th>
              <th>Дата завершення</th>
              <th>Ціна</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {acceptedTasks.length > 0 ? (
              acceptedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.clientName}</td>
                  <td className="order-details">{task.description}</td>
                  <td>{task.completionDate}</td>
                  <td>{task.price} грн</td>
                  <td>{task.status === 'COMPLETED' ? 'Завершено' : 'У процесі'}</td>
                  <td>
                    {task.status === 'COMPLETED' && (
                      <div>
                        <textarea
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          placeholder="Введіть ваш відгук"
                        />
                        <button onClick={() => handleReview(task.id)}>Відправити відгук</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Немає прийнятих завдань.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrdersList;
// const UserOrdersList = () => {
//   const [filter, setFilter] = useState('30days');

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   return (
//     <div className='user-orders-container-bg'>
//     <div className="user-orders-container">
//       <div className="top-user-orders-list">
//       <h2>Мої замовлення</h2>
//       <div className="filter-dropdown">
//         <button className="dropdown-button">{filter === '30days' ? 'Останні 30 днів' : filter === '3months' ? 'Останні 3 місяці' : 'Рік'}</button>
//         <div className="dropdown-content">
//           <div onClick={() => handleFilterChange('30days')}>Останні 30 днів</div>
//           <div onClick={() => handleFilterChange('3months')}>Останні 3 місяці</div>
//           <div onClick={() => handleFilterChange('year')}>Рік</div>
//         </div>
//       </div>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>№ замовлення</th>
//             <th>Виконавець</th>
//             <th>Деталі</th>
//             <th>Дата створення</th>
//             <th>Вартість</th>
//             <th>Файли</th>
//             <th>Статус</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ordersData.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.executor}</td>
//               <td className="order-details">{order.details}</td>
//               <td>{order.date}</td>
//               <td>{order.price}</td>
//               <td>{order.files}</td>
//               <td>
//                 <span className={`status ${order.statusClass}`}>{order.status}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default UserOrdersList;
