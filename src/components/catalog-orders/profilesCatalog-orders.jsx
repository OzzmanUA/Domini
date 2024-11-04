import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './profileCard';
import Filters from './filters';
import './profilesCatalog.css'; // CSS для каталога
import profile_image01 from './images/demo_user_4.png';
import middleBg from './images/middle_bg.png';
import { getTasksByCategory, acceptTask } from '../utils/ApiFunctions';  // Import the function to fetch tasks

import demo_user_ava from './images/demo_user_2.png'
import money_logo from './images/money_logo.png'
import data_logo from './images/reviews_logo.png'
import zamownyk from './images/zamow.png'

const TasksCatalog = () => {
  const { categoryId } = useParams();  // Get categoryId from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});  // Store filters in state
  const [acceptingTaskId, setAcceptingTaskId] = useState(null); // Track the task being accepted
  const [token] = useState(localStorage.getItem('token')); // Get the token from localStorage
  const [workerId] = useState(localStorage.getItem('userId')); // Replace this with actual workerId if stored elsewhere

  // Helper function to check if filters are empty
  const isEmptyFilters = (filters) => {
    return Object.keys(filters).length === 0 ||
           Object.values(filters).every(value => value === null || value === '' || value === undefined);
  };

  // Fetch tasks with or without filters
  const fetchTasks = async (appliedFilters = {}) => {
    setLoading(true);
    try {
      // If no filters are applied, just fetch tasks by category
      if (isEmptyFilters(appliedFilters)) {
        
        const taskData = await getTasksByCategory(categoryId);
        console.log(taskData)
        setTasks(taskData);
      } else {
        // If filters are applied, fetch tasks with the applied filters
        const taskData = await getTasksByCategory(categoryId, appliedFilters);
        setTasks(taskData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when categoryId or filters change
  useEffect(() => {
    fetchTasks(filters);
  }, [categoryId, filters]);

  // Update filters when the user applies them
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update the filters state
  };

  // Handle task acceptance
  const handleAcceptTask = async (taskId) => {
    setAcceptingTaskId(taskId); // Track the task being accepted (to disable button or show loading state)
    try {
      const response = await acceptTask(taskId, workerId, token); // Call acceptTask API
      alert('Task accepted successfully!'); // Show success message
      // Optionally, refetch tasks or update the UI after task acceptance
      fetchTasks(filters); 
    } catch (error) {
      console.error('Error accepting task:', error);
      alert(`Failed to accept task: ${error.message}`); // Show error message
    } finally {
      setAcceptingTaskId(null); // Reset accepting state
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="catalog-container">
      <div className="transition-block">
      <h2 className="catalog-h2-top">Каталог завдань</h2>
      <button className="transition-btn">Каталог майстрів</button>
      </div>

      <div className="catalog-content">
        <Filters onApplyFilters={handleApplyFilters} /> {/* Pass handleApplyFilters to Filters */}
        <div className="catalog-right">
          <div id="catalog-top-right-id_01">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div className="task-card" key={index}>
                  <h3>{task.title}</h3>
                  <div className="order-avat-btn">
                    <div className="avatar-descript">
                        <img src={demo_user_ava}/>
                        <p className="or-p-descript">{task.description}</p>
                    </div>
                  <button
                    onClick={() => handleAcceptTask(task.taskId)} // task.id is passed here
                    disabled={acceptingTaskId === task.taskId}  // Button disabled while accepting
                  >
                  {acceptingTaskId === task.taskId ? 'Приймається...' : 'Прийняти завдання'}
                  </button>
                  </div>
                  <div className="or-prise-items-itd">
                    <div className="or-prise-item">
                        <img src={money_logo}/>
                        <p>{task.price} грн</p>
                    </div>
                    <div className="or-prise-item">
                        <img src={data_logo}/>
                        <p>Кінцева дата виконання</p>
                    </div>
                    <div className="or-prise-item">
                        <img className="zamov-img" src={zamownyk}/>
                        <p>{task.firstName} {task.lastName}</p>
                    </div>
                  </div>


                </div>
              ))
            ) : (
              <div>No tasks found for this category</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksCatalog;

// const profiles = [
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     },
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     },
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     },
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     },
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     },
//     {
//         name: "Ірина Н.",
//         short_dedcriptions: "Краткое описание",
//         location: "Київ, Україна",
//         image: profile_image01,
//         price: "від 3000 грн",
//         description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
//     }

//     // Остальные профили...
// ];

// const ProfilesCatalog = () => {

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [isSubscribed, setIsSubscribed] = useState(false);
    
//     const handleSubscribe = () => {
//         // Здесь можно добавить логику подписки пользователя
//         console.log('Name:', name);
//         console.log('Email:', email);
//         console.log('Subscribed:', isSubscribed);
//     };

//     return (
//         <div className="catalog-container">
//             <h2 className="catalog-h2-top">Каталог замовників з меблевих робіт</h2>
//             <div className="catalog-content">
//                 <Filters />
//                 <div className="catalog-right">
//                     <div id="catalog-top-right-id_01">
//                         {profiles.slice(0, 3).map((profile, index) => (
//                             <ProfileCard key={index} profile={profile} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="img-middle-catalog" style={{ backgroundImage: `url(${middleBg})` }}>
//                 <button>Створити замовлення</button>
//             </div>
//             <div className="catalog-content">
//                 <div className="catalog-top-left">
//                    <h2>Вартість робіт</h2>
//                     <ul>
//                         <li className="work-price-item">
//                             <p>Збирання меблів</p>
//                             <p>1200 грн.</p>
//                         </li>
//                         <li className="work-price-item">
//                             <p>Виготовлення меблів</p>
//                             <p>20000 грн.</p>
//                         </li>
//                         <li className="work-price-item">
//                             <p>Ремонт меблів</p>
//                             <p>1500 грн.</p>
//                         </li>
//                         <li className="work-price-item">
//                             <p>Реставрація меблів</p>
//                             <p>3500 грн.</p>
//                         </li>
//                         <li className="work-price-item">
//                             <p>Перетяжка меблів</p>
//                             <p>4000 грн.</p>
//                         </li>
//                         <li className="work-price-item">
//                             <p>Швачка м’який меблів</p>
//                             <p>1000 грн.</p>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className="catalog-right">
//                     <div id="catalog-top-right-id_02">
//                         {profiles.slice(3).map((profile, index) => (
//                             <ProfileCard key={index} profile={profile} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="newsletter">
//             <div className="newsletter_left_part">
//                 <h3>Підписуйтеся на нашу розсилку та щотижня отримуйте найкращі пропозиці</h3>
//                 <div className="checkbox_newsletter">
//                     <input
//                         type="checkbox"
//                         name="newsletter"
//                         checked={isSubscribed}
//                         onChange={(e) => setIsSubscribed(e.target.checked)}
//                     />
//                     <label htmlFor="newsletter">Так, я бажаю підписатися на email-розсилку від DOMINI</label>
//                 </div>
//             </div>
//             <input
//                 className="user-info-input"
//                 type="text"
//                 placeholder="Ім’я"
//                 name="name_user"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 className="user-info-input"
//                 type="email"
//                 placeholder="Пошта"
//                 name="email_user"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <button name="subscribe_user" onClick={handleSubscribe}>
//                 Підписатися
//             </button>
//         </div>
//         </div>
//     );
// };

// export default ProfilesCatalog;
