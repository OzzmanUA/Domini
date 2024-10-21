import React, { useState, useEffect } from 'react';

import avatarImage from '../customer-profile/images/demo_user.png';
import countryImage from '../customer-profile/images/country.png'
import locationIcon from '../customer-profile/images/location_logo.png';
import joinDateIcon from '../customer-profile/images/user_logo.png';
import { getPrivateInformation, updatePrivateInformation, getAllCategories, addPhoto, removePhoto } from '../../utils/ApiFunctions';
import './extended-performer-profile-style.css';


// const reviews = [
//   { name: 'Анастасія О.', location: 'Україна', rating: '⭐⭐⭐⭐ 4.70', date: '3 місяці тому', review: '...' },
//   { name: 'Олег П.', location: 'Україна', rating: '⭐⭐⭐⭐ 4.50', date: '2 місяці тому', review: '...' }
// ];

// const EditableSection = ({ title, initialContent }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContent] = useState(initialContent);

//   const handleEditClick = () => setIsEditing(!isEditing);
//   const handleContentChange = (e) => setContent(e.target.value);
//   const handleToggle = () => setIsOpen(!isOpen);

//   return (
//       <div className="section-ext-perf">
//           <div className="section-header-ext-perf" onClick={handleToggle} style={{ cursor: 'pointer' }}>
//               <h2>{title}</h2>
//               <span>{isOpen ? 'Скасувати' : 'Змінити'}</span>
//           </div>
//           {isOpen && (
//               <>
//                   {isEditing ? (
//                       <textarea className="edit-area-ext-perf" value={content} onChange={handleContentChange} />
//                   ) : (
//                       <p>{content}</p>
//                   )}
//                   <div className="button-container-ext-perf">
//                       <button className="edit-button-ext-perf" onClick={handleEditClick}>
//                           {isEditing ? 'Зберегти' : 'Змінити'}
//                       </button>
//                   </div>
//               </>
//           )}
//       </div>
//   );
// };

// const ExtendedPerformerProfile = () => {
//   const [formValues, setFormValues] = useState({
//       avatar: avatarImage,
//       name: '',
//       lastname: '',
//       city: '',
//       country: '',
//       about: '',
//       language: '',
//       skills: '',
//       education: '',
//       categoryPrices: []
//   });
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryForPrice, setSelectedCategoryForPrice] = useState('');
//   const [servicePrice, setServicePrice] = useState('');
//   const [file, setFile] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const data = await getPrivateInformation(token);
//               const categoryList = await getAllCategories();
//               setCategories(categoryList);
//               setFormValues({
//                   ...formValues,
//                   firstName: data.firstName || '',
//                   lastName: data.lastName || '',
//                   city: data.city || '',
//                   country: data.country || '',
//                   about: data.about || '',
//                   language: data.language || '',
//                   skills: data.skills || '',
//                   education: data.education || '',
//                   categoryPrices: data.workerCategoryPrices || []
//               });
//           } catch (error) {
//               console.error('Error fetching data:', error);
//           }
//       };

//       fetchData();
//   }, []);

//   const handleInputChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

//   const handleSave = async () => {
//       try {
//         console.log(formValues)
//           await updatePrivateInformation(formValues, token);
//           alert('Information updated successfully');
//       } catch (error) {
//           console.error('Error updating information:', error);
//       }
//   };

//   const handleAddCategoryPrice = () => {
//       if (selectedCategoryForPrice && servicePrice) {
//           if (!formValues.categoryPrices.some(price => price.categoryId === selectedCategoryForPrice)) {
//               setFormValues((prevFormValues) => ({
//                   ...prevFormValues,
//                   categoryPrices: [
//                       ...prevFormValues.categoryPrices,
//                       { categoryId: selectedCategoryForPrice, servicePrice: parseFloat(servicePrice) }
//                   ]
//               }));
//               setSelectedCategoryForPrice('');
//               setServicePrice('');
//           }
//       }
//   };

//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handlePhotoUpload = async () => {
//       try {
//           if (file) {
//               await addPhoto(file, token);
//               alert('Photo uploaded');
//           }
//       } catch (error) {
//           console.error('Error uploading photo:', error);
//       }
//   };

//   return (
//       <div className="customer-all">
//           <div className="customer-profile-container">
//               <div className="customer-profile-left">
//                   <div className="avatar-extend">
//                       <img src={formValues.avatar} alt="Avatar" className="avatar-img-extend" />
//                       <input type="file" onChange={handleFileChange} />
//                       <button onClick={handlePhotoUpload}>Upload Photo</button>
//                   </div>
//                   <div className="cust-pof-top-extend">
//                       <input type="text" name="name" value={formValues.firstName} onChange={handleInputChange} placeholder="Name" />
//                       <input type="text" name="lastname" value={formValues.lastname} onChange={handleInputChange} placeholder="Lastname" />
//                   </div>
//                   <div className="info-extend">
//                       <div className="info-item-extend">
//                           <img src={locationIcon} alt="Location" className="icon-extend" />
//                           <input type="text" name="city" value={formValues.city} onChange={handleInputChange} placeholder="City" />
//                           <input type="text" name="country" value={formValues.country} onChange={handleInputChange} placeholder="Country" />
//                       </div>
//                   </div>
//                   <button onClick={handleSave}>Save</button>
//               </div>

//               <div className="container-accordions-ext-perf">
//                   <EditableSection title="Загальна інформація" initialContent={formValues.about} />
//                   <EditableSection title="Мова" initialContent={formValues.language} />
//                   <EditableSection title="Навички" initialContent={formValues.skills} />
//                   <EditableSection title="Освіта" initialContent={formValues.education} />

//                   <h2>Set Category Prices</h2>
//                   <select value={selectedCategoryForPrice} onChange={(e) => setSelectedCategoryForPrice(e.target.value)}>
//                       <option value="">Choose Category</option>
//                       {categories.map((category) => (
//                           <option key={category.id} value={category.id}>{category.name}</option>
//                       ))}
//                   </select>
//                   <input
//                       type="number"
//                       value={servicePrice}
//                       onChange={(e) => setServicePrice(e.target.value)}
//                       placeholder="Enter price"
//                   />
//                   <button onClick={handleAddCategoryPrice}>Add Price</button>

//                   <h3>Selected Prices:</h3>
//                   <ul>
//                       {formValues.categoryPrices.map((price, index) => (
//                           <li key={index}>
//                               Category: {categories.find((cat) => cat.id === price.categoryId)?.name}, Price: {price.servicePrice}
//                           </li>
//                       ))}
//                   </ul>
//               </div>
//           </div>
//       </div>
//   );
// };

// export default ExtendedPerformerProfile;











































const reviews = [
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Генеральне прибирання перевершило наші очікування! Квартира виглядала бездоганно: чисті вікна, блискучі підлоги, і жодного пилу. Команда працювала злагоджено, використовували якісні засоби, і були дуже уважними до деталей. Обов\'язково звернемося ще раз!'
  },
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Викликала сантехніка для ремонту змішувача, і залишився дуже задоволений. Майстер швидко приїхав, оперативно вирішив проблему, і навіть дав кілька корисних порад на майбутнє. Робота виконана якісно, все працює відмінно. Рекомендую цього майстра!'
  }
];

const EditableSection = ({ title, initialContent }) => {
    const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
    const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием/закрытием секции
    const [content, setContent] = useState(initialContent); // Содержимое секции
  
    const handleEditClick = () => {
      setIsEditing(!isEditing); // Переключение режима редактирования
    };
  
    const handleContentChange = (e) => {
      setContent(e.target.value); // Изменение текста при редактировании
    };
  
    const handleToggle = () => {
        setIsOpen(!isOpen); // Переключение открытой/закрытой секции
      };




  
    return (
        <div className="section-ext-perf">
        <div className="section-header-ext-perf" onClick={handleToggle} style={{ cursor: 'pointer' }}>
          <h2>{title}</h2>
          <span>{isOpen ? 'Скасувати' : 'Змінити'}</span> {/* Стрелка меняется в зависимости от состояния */}
        </div>
        {isOpen && ( // Отображаем контент, если секция открыта
          <>
            {isEditing ? (
              <textarea
                className="edit-area-ext-perf"
                value={content}
                onChange={handleContentChange}
              />
            ) : (
              <p>{content}</p>
            )}
            <div className="button-container-ext-perf">
              <button className="edit-button-ext-perf" onClick={handleEditClick}>
                {isEditing ? 'Зберегти' : 'Змінити'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };




const ExtendedpPerformerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    avatar: avatarImage,
    name: 'Анастасія О.',
    username: '@Nastya_lis',
    location: 'Київ, Україна',
    joinDate: 'Липень, 2022'
  });

  // Обработчик изменения формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик редактирования
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Обработчик сохранения
  const handleSave = () => {
    setIsEditing(false);
    // Логика для сохранения данных (например, отправка на сервер)
    console.log('Сохраненные данные:', formData);
  };
  return (
<div className="customer-all">
<div className="customer-profile-container" id="customer-profile-container">
    <div className="customer-profile-left">
    <div className="customer-profile-card-extend">
      <div className="prof-up-btn">
      <div className="avatar-extend">
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) })
            }
          />
        ) : (
          <img className="avatar-img-extend" src={formData.avatar} alt="Avatar" />
        )}
      </div>

      <div className="cust-pof-top-extend">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Имя"
          />
        ) : (
          <h2>{formData.name}</h2>
        )}

        {isEditing ? (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        ) : (
          <p>{formData.username}</p>
        )}
      </div>

      {isEditing ? (
        <button className="save-button-extend" onClick={handleSave}>
          Зберегти
        </button>
      ) : (
        <button className="edit-button-extend" onClick={handleEdit}>
          Редагувати
        </button>
      )}
      </div>

      <div className="info-extend">
        <div className="info-item-extend">
          <div className="location-user-info-extend">
            <img src={locationIcon} alt="Location" className="icon-extend" />
            <p>Місцезнаходження</p>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Місцезнаходження"
            />
          ) : (
            <p>{formData.location}</p>
          )}
        </div>

        <div className="info-item-extend">
          <div className="location-user-info-extend">
            <img src={joinDateIcon} alt="Join date" className="icon-extend" />
            <p>Долучилися</p>
          </div>
          <p>{formData.joinDate}</p>
        </div>
      </div>


    </div>


      </div>

    <div className="customer-profile-middle"></div>
    <div className="customer-profile-right">
      <div className="review-list-custo" id="review-list-custo">
        <h2>Відгуки</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="review-item" id="review-item">
              <div className="review-item-top">
              <div className="review-avatar">
                <img src={avatarImage} alt="Avatar" />
              </div>
              <div className="review-content">
                <div className="review-header">
                  <h3>{review.name}</h3>
                  <span className="location"><img src={countryImage}/>{` ${review.location}`}</span>
                </div>
              </div>
              </div>
              <div className="review-rating">
                  <span>{review.rating}</span>
                  <span>|</span>
                  <span>{review.date}</span>
              </div>
              <p className="review-text">{review.review}</p>
            </li>
          ))}
        </ul>
      </div>



    </div>
    </div>


    <div className="container-accordions-ext-perf">
      {/* Загальна інформація */}
      <EditableSection
        title="Загальна інформація"
        initialContent="Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У своїй професії я завжди прагну до досконалості, створюючи нову оббивку для меблів, виконуючи реставрацію та перетяжку. Маю широкий досвід роботи з різноманітними матеріалами, такими як велюр, шкіра, бавовна, льон та синтетичні тканини. Мої навички включають точне викроювання, пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя у будь-які меблі. Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче. Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і стиль для кожного виробу. Вмію враховувати особливості інтер'єру та бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів та дизайну. Моя професійна діяльність включає також консультації щодо догляду за оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для вашого стилю життя. Я переконана, що кожна деталь має значення, тому уважно ставлюся до кожного етапу роботи, від вибору матеріалів до останнього шва. Моя мета — зробити ваші меблі не лише зручними, але й естетично привабливими, щоб вони приносили радість і задоволення у повсякденному житті. Довіртеся мені, і я зроблю все можливе, щоб перевершити ваші очікування."
      />

      {/* Мова */}
      <EditableSection
        title="Мова"
        initialContent="Українська | Носій, Англійська | B2"
      />

      {/* Навички */}
      <EditableSection
        title="Навички"
        initialContent="Середній рівень: 3-5 років досвіду | Самостійна робота з різними тканинами | Консультує клієнтів з вибору матеріалів., Перетяжка меблів | Заміна наповнювача | Дизайн інтер'єру та кольорова координація | Цифровий розкрій | Пошиття чохлів | Орієнтація на клієнта"
      />

      {/* Освіта */}
      <EditableSection
        title="Освіта"
        initialContent="Київський національний університет технологій та дизайну, Магістр, Технології легкої промисловості, 2015 рік випуску"
      />
    </div>


</div>
  );
};

export default ExtendedpPerformerProfile;








// const EditableSection = ({ title, initialContent }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContent] = useState(initialContent);

//   const handleEditClick = () => {
//       setIsEditing(!isEditing);
//   };

//   const handleContentChange = (e) => {
//       setContent(e.target.value);
//   };

//   const handleToggle = () => {
//       setIsOpen(!isOpen);
//   };

//   return (
//       <div className="section-ext-perf">
//           <div className="section-header-ext-perf" onClick={handleToggle} style={{ cursor: 'pointer' }}>
//               <h2>{title}</h2>
//               <span>{isOpen ? 'Скасувати' : 'Змінити'}</span>
//           </div>
//           {isOpen && (
//               <>
//                   {isEditing ? (
//                       <textarea
//                           className="edit-area-ext-perf"
//                           value={content}
//                           onChange={handleContentChange}
//                       />
//                   ) : (
//                       <p>{content}</p>
//                   )}
//                   <div className="button-container-ext-perf">
//                       <button className="edit-button-ext-perf" onClick={handleEditClick}>
//                           {isEditing ? 'Зберегти' : 'Змінити'}
//                       </button>
//                   </div>
//               </>
//           )}
//       </div>
//   );
// };

// const ExtendedPerformerProfile = () => {
//   const [isEditing, setIsEditing] = useState(false); // Store edit state
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [categories, setCategories] = useState([]); // Store all available categories
//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     lastName: '',
//     about: '',
//     language: '',
//     skills: '',
//     education: '',
//     experienceYears: 0,
//     country: '', // New field for country
//     city: '',    // New field for city
//   }); // Form state
//   const [avatar, setAvatar] = useState(null); // Avatar file
//   const [selectedCategoryForPrice, setSelectedCategoryForPrice] = useState(''); // Track selected category for price assignment
//   const [servicePrice, setServicePrice] = useState(''); // Track service price for the selected category
//   const token = localStorage.getItem('token'); // Get the JWT token from localStorage

//   useEffect(() => {
//     const fetchPrivateInfo = async () => {
//       try {
//         const data = await getPrivateInformation(token); // Fetch the information using the provided token
//         setFormValues({
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           about: data.about || '',
//           language: data.language || '',
//           skills: data.skills || '',
//           education: data.education || '',
//           experienceYears: data.experienceYears || 0,
//           country: data.country || '', // Set country from existing location
//           city: data.city || '',       // Set city from existing location
//         });
//         setAvatar(data.avatar || null); // Initialize avatar
//       } catch (error) {
//         console.error('Error fetching private information:', error);
//       } finally {
//         setIsLoading(false); // Mark loading as complete
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const categoryList = await getAllCategories();
//         setCategories(categoryList); // Set available categories
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchPrivateInfo(); // Call the fetch function
//     fetchCategories(); // Fetch available categories
//   }, [token]);

//   // Handle form input changes for general info
//   const handleInputChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission for general information
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedData = {
//         ...formValues, // Send updated general info data
//       };
//       await updatePrivateInformation(updatedData, token); // Update user's general private information
//       alert('Private information updated successfully!');
//     } catch (error) {
//       console.error('Error updating private information:', error);
//       alert('Failed to update private information.');
//     }
//   };

//   // Handle file (avatar) change
//   const handleFileChange = (e) => {
//     setAvatar(e.target.files[0]);
//   };

//   // Handle avatar upload separately
//   const handlePhotoUpload = async () => {
//     if (avatar) {
//       try {
//         const response = await addPhoto(avatar, token); // Upload the selected photo
//         alert(response); // Show success message
//       } catch (error) {
//         console.error('Error uploading photo:', error);
//         alert('Failed to upload photo.');
//       }
//     }
//   };

//   // Handle category selection and price assignment separately
//   const handleAddCategoryPrice = () => {
//     if (selectedCategoryForPrice && servicePrice) {
//       // Add category price logic here
//     }
//   };

//   return (
//     <div className="customer-all">
//       <div className="customer-profile-container" id="customer-profile-container">
//         <div className="customer-profile-left">
//           <div className="customer-profile-card-extend">
//             <div className="prof-up-btn">
//               <div className="avatar-extend">
//                 {isEditing ? (
//                   <input type="file" accept="image/*" onChange={handleFileChange} />
//                 ) : (
//                   <img className="avatar-img-extend" src={avatar} alt="Avatar" />
//                 )}
//               </div>
//               <div className="cust-pof-top-extend">
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formValues.firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                   />
//                 ) : (
//                   <h2>{formValues.firstName}</h2>
//                 )}

//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formValues.lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                   />
//                 ) : (
//                   <p>{formValues.lastName}</p>
//                 )}
//               </div>

//               {isEditing ? (
//                 <button className="save-button-extend" onClick={handleSubmit}>
//                   Зберегти
//                 </button>
//               ) : (
//                 <button className="edit-button-extend" onClick={() => setIsEditing(true)}>
//                   Редагувати
//                 </button>
//               )}

//               <button className="upload-avatar-button" onClick={handlePhotoUpload}>
//                 Upload Avatar
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="customer-profile-right">
//           <div className="container-accordions-ext-perf">
//             <EditableSection title="Загальна інформація" initialContent={formValues.about} />
//             <EditableSection title="Мова" initialContent={formValues.language} />
//             <EditableSection title="Навички" initialContent={formValues.skills} />
//             <EditableSection title="Освіта" initialContent={formValues.education} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExtendedPerformerProfile;