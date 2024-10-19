import React, { useState } from 'react';
import ProfileCard from './profileCard';
import Filters from './filters';
import './profilesCatalog.css'; // CSS для каталога
import profile_image01 from './images/demo_user_4.png';
import middleBg from './images/middle_bg.png';


const profiles = [
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    },
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    },
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    },
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    },
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    },
    {
        name: "Ірина Н.",
        short_dedcriptions: "Краткое описание",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 3000 грн",
        description: "Потрібен ремонт дивану, який включає заміну оббивки, наповнювача та ремонт каркасу. Сидіння дивану значно просіло, оббивка сильно зносилася та має потертості. Наповнювач потрібно повністю замінити на більш пружний та довговічний матеріал. Можливо, знадобиться зміцнити або відремонтувати каркас для забезпечення стійкості. Бажано підібрати якісну тканину для оббивки, стійку до зношування, з урахуванням інтер'єру приміщення. Після узгодження матеріалів та деталей роботи, очікую на попередню оцінку вартості і термінів виконання.",
    }

    // Остальные профили...
];

const ProfilesCatalog = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    const handleSubscribe = () => {
        // Здесь можно добавить логику подписки пользователя
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subscribed:', isSubscribed);
    };

    return (
        <div className="catalog-container">
            <h2 className="catalog-h2-top">Каталог замовників з меблевих робіт</h2>
            <div className="catalog-content">
                <Filters />
                <div className="catalog-right">
                    <div id="catalog-top-right-id_01">
                        {profiles.slice(0, 3).map((profile, index) => (
                            <ProfileCard key={index} profile={profile} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="img-middle-catalog" style={{ backgroundImage: `url(${middleBg})` }}>
                <button>Створити замовлення</button>
            </div>
            <div className="catalog-content">
                <div className="catalog-top-left">
                   <h2>Вартість робіт</h2>
                    <ul>
                        <li className="work-price-item">
                            <p>Збирання меблів</p>
                            <p>1200 грн.</p>
                        </li>
                        <li className="work-price-item">
                            <p>Виготовлення меблів</p>
                            <p>20000 грн.</p>
                        </li>
                        <li className="work-price-item">
                            <p>Ремонт меблів</p>
                            <p>1500 грн.</p>
                        </li>
                        <li className="work-price-item">
                            <p>Реставрація меблів</p>
                            <p>3500 грн.</p>
                        </li>
                        <li className="work-price-item">
                            <p>Перетяжка меблів</p>
                            <p>4000 грн.</p>
                        </li>
                        <li className="work-price-item">
                            <p>Швачка м’який меблів</p>
                            <p>1000 грн.</p>
                        </li>
                    </ul>
                </div>

                <div className="catalog-right">
                    <div id="catalog-top-right-id_02">
                        {profiles.slice(3).map((profile, index) => (
                            <ProfileCard key={index} profile={profile} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="newsletter">
            <div className="newsletter_left_part">
                <h3>Підписуйтеся на нашу розсилку та щотижня отримуйте найкращі пропозиці</h3>
                <div className="checkbox_newsletter">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={isSubscribed}
                        onChange={(e) => setIsSubscribed(e.target.checked)}
                    />
                    <label htmlFor="newsletter">Так, я бажаю підписатися на email-розсилку від DOMINI</label>
                </div>
            </div>
            <input
                className="user-info-input"
                type="text"
                placeholder="Ім’я"
                name="name_user"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="user-info-input"
                type="email"
                placeholder="Пошта"
                name="email_user"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button name="subscribe_user" onClick={handleSubscribe}>
                Підписатися
            </button>
        </div>
        </div>
    );
};

export default ProfilesCatalog;
