import './Header_style.css';

import logo from './images/logo.png';
import ukrLang from './images/ukr_lang.png';
import entry from './images/entry.png';
import favourite from './images/favourite.png';
import messages from './images/messages.png';
import my_orders from './images/my_orders_logo.png';
import new_task from './images/new_task.png';
import ukr_lang_auth from './images/ukr_lang_auth.png';
import user_demo from './images/user_demo.png';
import NavMenu from '../main_parts_auth/categories/navmenu';
import UserProfileLink from '../common/UserProfileLink';
import { useNavigate } from 'react-router-dom';

const Header_auth = () => {
  const navigate = useNavigate();
  const handleChatClick = () => {
    navigate(`/chat`);  // Navigate to create-task-for-worker page with workerId
  };
  const handleTasksClick = () => {
    navigate(`/listOrders`);  // Navigate to create-task-for-worker page with workerId
  };
  const handleOrderClick = () => {
    navigate(`/order`);  // Navigate to create-task-for-worker page with workerId
  };
  return (
    <div className='all_header'>
    <div className="navbar">
      <a href="/" className="logo">
        <img src={logo} alt="Domini Logo" />
      </a>
      <div className="search-bar">
        <input type="text" placeholder="Шукайте будь-яку послугу..." />
      </div>
      <div className="nav-links">
        <a href="#" className="lang">
          <img src={ukr_lang_auth} alt="ukr_lang_auth" />
        </a>
        <div className="header_menu">
        <a href="#">
          <img src={favourite} alt="favourite" />
        </a>
        <a href="#">
          <img src={messages} onClick={handleChatClick} alt="messages" />
        </a>
        <a href="#">
          <img src={my_orders} onClick={handleTasksClick} alt="my_orders" />
        </a>
        <a href="#">
          <img src={new_task} onClick={handleOrderClick} alt="new_task" />
        </a>
        </div>
        {/* <a href="#" className="demo_user">
          <img src={user_demo} alt="user_demo" />
        </a> */}
        <div className="user-avatar-foto"><UserProfileLink /></div>
      </div>
    </div>
          <div className="nav-container">
            <NavMenu />
          {/* <ul className="nav-menu">
              <li><a href="#">Домашній майстер</a></li>
              <li><a href="#">Ремонт техніки</a></li>
              <li><a href="#">Оздоблювальні роботи</a></li>
              <li><a href="#">Будівельні роботи</a></li>
              <li><a href="#">Меблеві роботи</a></li>
              <li><a href="#">Клінінгові послуги</a></li>
              <li><a href="#">Транспортні та складські послуги</a></li>
              <li><a href="#">Побутові послуги</a></li>
          </ul> */}
      </div>
      </div>
  );
};


export default Header_auth;
