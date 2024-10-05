import React, { useState } from 'react';
import ProfileCard from './profileCard';
import Filters from './filters';
import './profilesCatalog.css'; // CSS для каталога
import profile_image01 from './images/demo_user_1.png';
import middleBg from './images/middle_bg.png';


const profiles = [
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
    },
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
    },
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
    },
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
    },
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
    },
    {
        name: "Софія Б.",
        category: "Меблеві роботи | Швачка м'яких меблів",
        location: "Київ, Україна",
        image: profile_image01,
        price: "від 1200 грн",
        feedback: "100% позитивних відгуків",
        projects: "42 успішних проєкти",
        services: ["Хімчистка", "Перетяжка меблів", "Реставрація меблів"],
        description: "Я досвідчена швачка м'яких меблів з багаторічним стажем. Моя робота — створювати комфорт та стиль у вашому домі за допомогою якісної оббивки меблів. Володію всіма необхідними навичками, працюю з різними матеріалами та завжди прагну до ідеального результату. Для мене важливо, щоб кожен клієнт залишився задоволеним, тому я уважно підходжу до кожного замовлення, враховуючи всі побажання.",
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
            <h2 className="catalog-h2-top">Каталог майстрів із меблевих робіт</h2>
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
