import React, { useState } from 'react';
import './filters.css'; // CSS для фильтров

// Import images
import arrowIcon from './images/show_container.png';
import findLogo from './images/find_logo.png';

const FilterComponent = () => {
    const [openSections, setOpenSections] = useState({
        rating: false,
        price: false,
        experience: false,
        location: false
    });

    const [priceRange, setPriceRange] = useState({
        minPrice: 0,
        maxPrice: 10000
    });

    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prevState) => ({
            ...prevState,
            [name]: Number(value)
        }));
    };

    return (
        <div className="filter-container">
            {/* Rating Section */}
            <div className="filter-section">
                <button className="collapsible" onClick={() => toggleSection('rating')}>
                    Рейтинг виконавця
                    <img src={arrowIcon} className={`arrow-icon ${openSections.rating ? 'rotate' : ''}`} alt="Toggle" />
                </button>
                {openSections.rating && (
                    <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" id="beginner" name="rating" value="beginner" />
                            <label htmlFor="beginner">Початковий рівень (11,749)</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="intermediate" name="rating" value="intermediate" />
                            <label htmlFor="intermediate">Середній рівень (8,125)</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="expert" name="rating" value="expert" />
                            <label htmlFor="expert">Експерт (43,509)</label>
                        </div>
                    </div>
                )}
            </div>

            {/* Price Section */}
            <div className="filter-section">
                <button className="collapsible" onClick={() => toggleSection('price')}>
                    Вартість послуги (грн./год)
                    <img src={arrowIcon} className={`arrow-icon ${openSections.price ? 'rotate' : ''}`} alt="Toggle" />
                </button>
                {openSections.price && (
                    <div className="content">
                        <div className="price-range">
                            <input 
                                type="range" 
                                id="minPrice" 
                                name="minPrice" 
                                min="0" 
                                max="10000" 
                                value={priceRange.minPrice} 
                                onChange={handlePriceChange}
                            />
                            <input 
                                type="range" 
                                id="maxPrice" 
                                name="maxPrice" 
                                min="0" 
                                max="10000" 
                                value={priceRange.maxPrice} 
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div className="price-values">
                            <input 
                                type="number" 
                                id="minValue" 
                                name="minPrice" 
                                value={priceRange.minPrice} 
                                onChange={handlePriceChange} 
                            />
                            <span></span>
                            <input 
                                type="number" 
                                id="maxValue" 
                                name="maxPrice" 
                                value={priceRange.maxPrice} 
                                onChange={handlePriceChange} 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Experience Section */}
            <div className="filter-section">
                <button className="collapsible" onClick={() => toggleSection('experience')}>
                    Історія клієнта
                    <img src={arrowIcon} className={`arrow-icon ${openSections.experience ? 'rotate' : ''}`} alt="Toggle" />
                </button>
                {openSections.experience && (
                    <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" id="noExperience" name="experience" value="noExperience" />
                            <label htmlFor="noExperience">Без досвіду (11,749)</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="someExperience" name="experience" value="someExperience" />
                            <label htmlFor="someExperience">1-9 виконаних замовлень (8,125)</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="moreExperience" name="experience" value="moreExperience" />
                            <label htmlFor="moreExperience">10+ виконаних замовлень (43,509)</label>
                        </div>
                    </div>
                )}
            </div>

            {/* Location Section */}
            <div className="filter-section">
                <button className="collapsible" onClick={() => toggleSection('location')}>
                    Локалізація
                    <img src={arrowIcon} className={`arrow-icon ${openSections.location ? 'rotate' : ''}`} alt="Toggle" />
                </button>
                {openSections.location && (
                    <div className="content">
                        <select id="location">
                            <option value="">Оберіть місто</option>
                            <option value="Kyiv">Київ</option>
                            <option value="Lviv">Львів</option>
                            <option value="Odessa">Одеса</option>
                            <option value="Kharkiv">Харків</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="update-filters-btn">
                <button>Застосувати фільтри</button>
            </div>

            {/* Popular Requests Section */}
            <div className="popular-requests">
                <h4>Популярні запити в цій категорії</h4>
                <ul>
                    <li><a href="#"><img src={findLogo} alt="find" />виготовлення меблів</a></li>
                    <li><a href="#"><img src={findLogo} alt="find" />ремонт меблів</a></li>
                    <li><a href="#"><img src={findLogo} alt="find" />збирання меблів</a></li>
                    <li><a href="#"><img src={findLogo} alt="find" />перетяжка меблів</a></li>
                </ul>
            </div>
        </div>
    );
};

export default FilterComponent;