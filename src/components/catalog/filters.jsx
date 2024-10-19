
import './filters.css'; // CSS для фильтров
import React, { useState, useEffect } from 'react';
// Import images
import arrowIcon from './images/show_container.png';
import findLogo from './images/find_logo.png';

const FilterComponent = ({ onApplyFilters }) => {
    const [openSections, setOpenSections] = useState({
        rating: false,
        price: false,
        experience: false,
        location: false
    });

    const [filters, setFilters] = useState({
        minPrice: null,
        maxPrice: null,
        skillLevel: '',
        city: ''
    });

    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value !== '' ? Number(value) : null // Reset to null if empty
        }));
    };

    const handleSkillLevelChange = (e) => {
        setFilters((prevState) => ({
            ...prevState,
            skillLevel: e.target.value,
        }));
    };

    const handleCityChange = (e) => {
        setFilters((prevState) => ({
            ...prevState,
            city: e.target.value,
        }));
    };

    const applyFilters = () => {
        // Create a new object with only the filters that are not null or empty
        const activeFilters = {};
        if (filters.minPrice !== null) activeFilters.minPrice = filters.minPrice;
        if (filters.maxPrice !== null) activeFilters.maxPrice = filters.maxPrice;
        if (filters.skillLevel) activeFilters.skillLevel = filters.skillLevel; // Only add if skillLevel is not empty
        if (filters.city) activeFilters.city = filters.city; // Only add if city is not empty

        // Pass the filtered parameters to the parent component
        onApplyFilters(activeFilters);
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
                            <input
                                type="radio"
                                id="beginner"
                                name="skillLevel"
                                value="beginner"
                                onChange={handleSkillLevelChange}
                            />
                            <label htmlFor="beginner">Початковий рівень (11,749)</label>
                        </div>
                        <div className="checkbox">
                            <input
                                type="radio"
                                id="intermediate"
                                name="skillLevel"
                                value="intermediate"
                                onChange={handleSkillLevelChange}
                            />
                            <label htmlFor="intermediate">Середній рівень (8,125)</label>
                        </div>
                        <div className="checkbox">
                            <input
                                type="radio"
                                id="expert"
                                name="skillLevel"
                                value="expert"
                                onChange={handleSkillLevelChange}
                            />
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
                            <label htmlFor="minPrice">Min Price:</label>
                            <input
                                type="number"
                                id="minPrice"
                                name="minPrice"
                                value={filters.minPrice || ''}
                                onChange={handlePriceChange}
                            />
                            <label htmlFor="maxPrice">Max Price:</label>
                            <input
                                type="number"
                                id="maxPrice"
                                name="maxPrice"
                                value={filters.maxPrice || ''}
                                onChange={handlePriceChange}
                            />
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
                        <select id="city" value={filters.city} onChange={handleCityChange}>
                            <option value="">Оберіть місто</option>
                            <option value="Київ">Київ</option>
                            <option value="Львів">Львів</option>
                            <option value="Одеса">Одеса</option>
                            <option value="Харків">Харків</option>
                            <option value="Полтава">Полтава</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Apply Filters Button */}
            <div className="filter-apply-button">
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
        </div>
    );
};

export default FilterComponent;