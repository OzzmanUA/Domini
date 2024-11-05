import React, { useState, useEffect, useContext  } from 'react';
import { api } from '../../utils/ApiFunctions';
import avatarImage from '../customer-profile/images/demo_user.png';
import countryImage from '../customer-profile/images/country.png'
import locationIcon from '../customer-profile/images/location_logo.png';
import joinDateIcon from '../customer-profile/images/user_logo.png';
import { getPrivateInformation, updatePrivateInformation, getAllCategories, addPhoto, removePhoto, uploadAvatar, getPortfolio, becomeWorker } from '../../utils/ApiFunctions';
import './extended-performer-profile-style.css';
import { AuthContext } from "../../auth/AuthProvider"
import { Link, useNavigate } from "react-router-dom"

import UserProfileLink from '../../common/UserProfileLink';

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

const ExtendedPerformerProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Track if editing general profile info
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // const [categories, setCategories] = useState([]); // Store all available categories
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    about: '',
    language: '',
    skills: '',
    education: '',
    experienceYears: 0,
    categories: [],
    country: '', // New field for country
    city: '',
    categoryPrices: []    // New field for city
  }); // Form state
  const [avatar, setAvatar] = useState(null); // Avatar file
  // const [selectedCategoryForPrice, setSelectedCategoryForPrice] = useState(''); // Track selected category for price assignment
  // const [servicePrice, setServicePrice] = useState(''); // Track service price for the selected category
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  const [isOpenSections, setIsOpenSections] = useState({
    about: false,
    language: false,
    skills: false,
    education: false
  }); // Track open sections for editing
  const [isEditingSections, setIsEditingSections] = useState({
    about: false,
    language: false,
    skills: false,
    education: false
  }); // Track editing state for each section
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);         // Текущие выбранные изображения
  const [savedImages, setSavedImages] = useState([]); // Массив для сохранённых изображений
  const handleSaveImages = () => {
    // Добавляем только уникальные URL, чтобы избежать дублирования
    const newSavedImages = [...savedImages, ...images].filter(
      (src, index, array) => array.indexOf(src) === index
    );
    setSavedImages(newSavedImages); // Сохраняем объединённый массив
    setImages([]); // Очищаем текущие выбранные изображения
  };



	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {

		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}


  useEffect(() => {
    const fetchPrivateInfo = async () => {
      try {
        const data = await getPrivateInformation(token); // Fetch the information using the provided token
        setFormValues({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          about: data.about || '',
          language: data.language || '',
          skills: data.skills || '',
          education: data.education || '',
          experienceYears: data.experienceYears || 0,
          country: data.country || '', // Set country from existing location
          city: data.city || '',       // Set city from existing location
          categories: data.categoryIds || [], 
          categoryPrices: data.workerCategoryPrices?.map(priceObj => ({
            categoryId: priceObj.category.id,
            servicePrice: priceObj.servicePrice
          })) || []
        });
        setAvatar(data.avatar || null);
         // Initialize avatar
      } catch (error) {
        console.error('Error fetching private information:', error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };
    

    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList); // Set available categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPrivateInfo(); // Call the fetch function
    fetchCategories(); // Fetch available categories
  }, [token]);

  // Handle form input changes for general info
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // // Handle form submission for individual sections or entire profile
  // const handleSubmitSection = async (sectionName) => {
  //   try {
  //     const updatedData = {
  //       ...formValues, // Отправляем все данные формы
  //     };
  //     await updatePrivateInformation(updatedData, token); // Update user's general private information
  //     alert(`${sectionName} information updated successfully!`);

  //     // Disable editing for the general profile or the specific section after save
  //     if (sectionName === 'profile') {
  //       setIsEditing(false); // Disable editing for the whole profile after saving
  //     } else {
  //       setIsEditingSections({
  //         ...isEditingSections,
  //         [sectionName]: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(`Error updating ${sectionName} information:`, error);
  //     alert(`Failed to update ${sectionName} information.`);
  //   }
  // };


  
  const handleAddCategoryPrice = () => {
    if (selectedCategoryForPrice && servicePrice) {
      // Создаем запись для новой цены
      const newPriceEntry = {
        categoryId: selectedCategoryForPrice,
        servicePrice: parseFloat(servicePrice),
      };
  
      // Обновляем состояние с новыми данными по ценам
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        categoryPrices: [...(prevFormValues.categoryPrices || []), newPriceEntry],
      }));
  
      // Сбрасываем поля ввода
      setSelectedCategoryForPrice('');
      setServicePrice('');
    } else {
      // alert('Пожалуйста, выберите категорию и введите цену.');
    }
  };
  
  const handleSubmitSection = async (sectionName) => {
    try {
      // Обновляем форму с новыми ценами перед отправкой
      handleAddCategoryPrice();
  
      // Создаем объект для обновления всех данных формы
      const updatedData = {
        ...formValues, // Все данные формы
        categoryIds: formValues.categories || [], // Массив ID выбранных категорий
        categoryPrices: formValues.categoryPrices || [], // Массив цен по категориям
      };
  
      // Обновляем информацию пользователя, включая категории и цены
      await updatePrivateInformation(updatedData, token);
      alert(`${sectionName} information updated successfully!`);
  
      // Отключаем режим редактирования для профиля или для определенного раздела после сохранения
      if (sectionName === 'profile') {
        setIsEditing(false); // Отключить редактирование для всего профиля после сохранения
      } else {
        setIsEditingSections({
          ...isEditingSections,
          [sectionName]: false,
        });
      }
    } catch (error) {
      console.error(`Error updating ${sectionName} information:`, error);
      alert(`Failed to update ${sectionName} information.`);
    }
  };
  
  
  const handleBecomeWorker = async () => {
    try {
      const message = await becomeWorker(token);
      alert(message); // Display success message
    } catch (error) {
      alert(`Error: ${error.message}`); // Display error message
    }
  };



  // Handle file (avatar) change
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Handle avatar upload separately
  const handlePhotoUpload = async () => {
    if (avatar) {
      try {
        const response = await uploadAvatar(avatar, token); // Upload the selected photo
 // Show success message
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Помилка :(');
      }
    }
  };
  const handlePortfolioUpload = async () => {
    if (image) {
      try {
        const response = await addPhoto(image, token); // Upload the single selected photo
 // Show success message
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo.');
      }
    }
  };
  

  // Toggle the open state for a section
  const handleToggle = (section) => {
    setIsOpenSections({
      ...isOpenSections,
      [section]: !isOpenSections[section]
    });
  };

  // Toggle the edit state for a section
  const handleEditClick = (section) => {
    setIsEditingSections({
      ...isEditingSections,
      [section]: !isEditingSections[section]
    });
  };


  const renderPhotoSection = () => (
    <div className="section-ext-perf">
      <div
        className="section-header-ext-perf"
        onClick={() => handleToggle('photos')}
        style={{ cursor: 'pointer' }}
      >
        <h2>Портфоліо</h2>
        <span>{isOpenSections.photos ? 'Згорнути' : 'Змінити'}</span>
      </div>
      {isOpenSections.photos && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(e.target.files[0]); // Store the selected image
              }
            }}
          />
          <button className="upload-foto" onClick={handlePortfolioUpload}>Зберегти фото</button> {/* Save button */}

          <div className="saved-images-container">
            <h3>Збережені фото:</h3>
            <div className="image-preview-container">
              {savedImages.map((photo) => (
                <img
                  key={photo.id}
                  src={(`${api.defaults.baseURL}${photo.imagePath}`)}
                  alt={photo.name}
                  className="image-preview"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
  


  // Render editable sections directly within the profile component
  const renderSection = (sectionName, label, content) => (
    <div className="section-ext-perf">
      <div
        className="section-header-ext-perf"
        onClick={() => handleToggle(sectionName)}
        style={{ cursor: 'pointer' }}
      >
        <h2>{label}</h2>
        <span>{isOpenSections[sectionName] ? 'Згорнути' : 'Змінити'}</span>
      </div>
      {isOpenSections[sectionName] && (
        <>
          {isEditingSections[sectionName] ? (
            <textarea
              className="edit-area-ext-perf"
              name={sectionName}
              value={formValues[sectionName]}
              onChange={handleInputChange}
            />
          ) : (
            <p>{formValues[sectionName]}</p>
          )}
          <div className="button-container-ext-perf">
            <button
              className="edit-button-ext-perf"
              onClick={() =>
                isEditingSections[sectionName]
                  ? handleSubmitSection(sectionName) // Save data when editing
                  : handleEditClick(sectionName)     // Enable editing if not editing
              }
            >
              {isEditingSections[sectionName] ? 'Зберегти' : 'Змінити'}
            </button>
          </div>
        </>
      )}
    </div>
  );





  const [categories, setCategories] = useState([]); // Все доступные категории
  // const [formValues, setFormValues] = useState({
  //   categories: [],
  //   categoryPrices: []
  // });
  const [selectedCategoryForPrice, setSelectedCategoryForPrice] = useState(''); 
  const [servicePrice, setServicePrice] = useState(''); 


  // Загрузка категорий
  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };
    fetchCategories();
    const fetchPortfolio = async () => {
      try {
        const portfolioData = await getPortfolio(token);
        if (portfolioData) {
          setSavedImages(portfolioData); // Store fetched images
        }
      } catch (error) {
        console.error('Ошибка при загрузке портфолио:', error);
      }
    };

    fetchPortfolio();
    
  }, []);
  



  // const handleAddCategoryPrice = () => {
  //   if (selectedCategoryForPrice && servicePrice) {
  //     // Prevent adding the same category more than once
  //     if (!formValues.categoryPrices.some(priceObj => priceObj.categoryId === selectedCategoryForPrice)) {
  //       setFormValues((prevFormValues) => ({
  //         ...prevFormValues,
  //         categoryPrices: [...prevFormValues.categoryPrices, {
  //           categoryId: selectedCategoryForPrice,
  //           servicePrice: parseFloat(servicePrice)
  //         }],
  //       }));
  //
  //       // Reset the selected category and price
  //       setSelectedCategoryForPrice('');
  //       setServicePrice('');
  //     }
  //   }
  // };


// // Метод для сохранения категорий, в которых работает пользователь
// const handleSaveCategories = async () => {
//   try {
//     const updatedCategoryData = {
//       categoryIds: formValues.categories, // Массив ID выбранных категорий
//     };

//     await updatePrivateInformation(updatedCategoryData, token);
//     alert('Категории успешно сохранены!');
//   } catch (error) {
//     console.error('Ошибка при сохранении категорий:', error);
//     alert('Не удалось сохранить категории.');
//   }
// };

  // Функция для отображения раздела с категориями и установкой цены
  
  const renderCategorySection = (sectionName, label) => (
    <div className="section-ext-perf">
      <div className="section-header-ext-perf" onClick={() => toggleSection(sectionName)}>
        <h2>{label}</h2>
        <span>{isOpenSections[sectionName] ? 'Зберегти' : 'Змінити'}</span>
      </div>
      {isOpenSections[sectionName] && (
        <>
          <div>
            <label>
              Виберіть категорію
              <select onChange={handleCategorySelect}>
                <option value="">Виберіть категорію</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <p className="user-categ-p">Вибрані категорії:</p>
            <ul>
              {formValues.categories.map((categoryId) => (
                <li key={categoryId}>               
                  {categories.find((cat) => cat.id === categoryId)?.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Встановити ціну для категорії:</h3>
            <label>
              Категорія для встановлення ціни:
              <select value={selectedCategoryForPrice} onChange={handlePriceCategorySelect}>
                <option value="">Виберіть категорію</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Ціна:
            </label>
            <div className="categ-price-block">
              <input
                type="number"
                value={servicePrice}
                onChange={handleServicePriceChange}
                placeholder="Введіть ціну"
                className="categ-price-input"
              />
            <button type="button" 
            onClick={handleAddCategoryPrice} 
            >
            
              Додати ціну
            </button>
            </div>
          </div>

          <p className="user-categ-p">Ціни по категоріям:</p>
          <ul>
  {formValues.categoryPrices && formValues.categoryPrices.length > 0 ? (
    formValues.categoryPrices.map((priceObj) => {
      const categoryName = categories.find((cat) => cat.id === priceObj.categoryId)?.name;

      if (!categoryName) {
        console.warn(`Category not found for id: ${priceObj.categoryId}`, categories);
      }

      return (
        <li key={priceObj.categoryId}>
          {categoryName ? `${categoryName}: ${priceObj.servicePrice} ₴` : "Category not found"}
        </li>
      );
    })
  ) : (
    <p>No category prices available or loading...</p>
  )}
</ul>

          <button class="edit-button-ext-perf" 
                  id="btn-categ"  
                  type="button" 
                  // onClick={handleSaveCategories}
          >Зберегти</button>
        </>
      )}
    </div>
  );

  // Обработчики для открытия/закрытия разделов и редактирования
  const toggleSection = (sectionName) => {
    setIsOpenSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  // Обработчики для управления категориями и ценами
  const handleCategorySelect = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    if (!formValues.categories.includes(selectedCategoryId)) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        categories: [...prevFormValues.categories, selectedCategoryId],
      }));
    }
  };

  const handlePriceCategorySelect = (e) => {
    setSelectedCategoryForPrice(parseInt(e.target.value));
  };

  const handleServicePriceChange = (e) => {
    setServicePrice(e.target.value);
  };

  // Handle category price updates
// // Метод для добавления цены к категории и сохранения ее
// const handleAddCategoryPrice = async () => {
//   if (selectedCategoryForPrice && servicePrice) {
//     // Добавляем цену к выбранной категории в состояние
//     const newPriceEntry = {
//       categoryId: selectedCategoryForPrice,
//       servicePrice: parseFloat(servicePrice),
//     };

//     setFormValues((prevFormValues) => ({
//       ...prevFormValues,
//       categoryPrices: [...prevFormValues.categoryPrices, newPriceEntry],
//     }));

//     try {
//       // Сохраняем обновленный массив цен на сервере
//       const updatedPriceData = {
//         categoryPrices: [...formValues.categoryPrices, newPriceEntry],
//       };
      
//       await updatePrivateInformation(updatedPriceData, token);
//       alert('Цена успешно добавлена и сохранена!');
      
//       // Сброс полей выбора
//       setSelectedCategoryForPrice('');
//       setServicePrice('');
//     } catch (error) {
//       console.error('Ошибка при сохранении цены:', error);
//       alert('Не удалось сохранить цену.');
//     }
//   } else {
//     alert('Пожалуйста, выберите категорию и введите цену.');
//   }
// };







  return (
    <div className="customer-all">
      <div className="customer-profile-container" id="customer-profile-container">
        <div className="customer-profile-left">
          <div className="customer-profile-card-extend">
            <div className="prof-up-btn">
              <div className="avatar-extend">
                {isEditing ? (
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                ) : (
                  // <img className="avatar-img-extend" src={avatar} alt="Avatar" />
                  <UserProfileLink />
                )}
              </div>
              <div className="cust-pof-top-extend">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </>
                ) : (
                  <>
                    <h2>{formValues.firstName}</h2>
                    <p>{formValues.lastName}</p>
                  </>
                )}
              </div>

              {isEditing ? (
                <button
                  className="save-button-extend"
                  onClick={() => handleSubmitSection('profile')}
                >
                  Зберегти
                </button>
              ) : (
                <button className="edit-button-extend" onClick={() => setIsEditing(true)}>
                  Редагувати
                </button>
              )}

              <div className="location-join-info">
                <div className="location-info">
                  <div className="location-join-info-start">
                    <img src={locationIcon} alt="Location Icon" className="info-icon" />
                    <p>Місцезнаходження</p>
                  </div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="country"
                        value={formValues.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                      />
                      <input
                        type="text"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </>
                  ) : (
                    <span>{formValues.country}, {formValues.city}</span>
                  )}
                </div>

                {/* Дата присоединения, не редактируется */}
                <div className="join-date-info">
                <div className="location-join-info-start">
                  <img src={joinDateIcon} alt="Join Date Icon" className="info-icon" />
                  <p>Долучилися</p>
                </div>
                  <span>{formValues.experienceYears} років тому</span>
                </div>
              </div>





              <button className="upload-avatar-button" onClick={handlePhotoUpload}>
                Upload Avatar
              </button>
            </div>
          </div>
        </div>

{/* !!!отзыви!!! */}


<div className="customer-profile-middle"></div>
    <div className="customer-profile-right">
      <div className="review-list-custo">
        <h2>Відгуки</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
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

      <div className="customer-profile-bottom">
          <div className="container-accordions-ext-perf">
            {renderPhotoSection()}
            {renderSection('about', 'Загальна інформація', formValues.about)}
            {renderSection('language', 'Мова', formValues.language)}
            {renderSection('skills', 'Навички', formValues.skills)}
            {renderSection('education', 'Освіта', formValues.education)}
            {renderCategorySection('categorySection', 'Категорії та ціни')}
            <button className="logout-user-btn"  onClick={handleBecomeWorker}>Стати робітником</button>
            <button className="logout-user-btn"  onClick={handleLogout}>Вийти</button>
          </div>
        </div>

    </div>
  );
};

export default ExtendedPerformerProfile;



