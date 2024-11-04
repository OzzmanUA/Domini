import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './profileCard';
import Filters from './filters';
import './profilesCatalog.css'; // CSS для каталога
import profile_image01 from './images/demo_user_1.png';
import middleBg from './images/middle_bg.png';
import { getWorkersByCategory } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
const ProfilesCatalog = () => {
    const { categoryId } = useParams(); // Access the categoryId from the URL
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({}); // Store filters in state

  
    // Helper to check if filters are empty
    const isEmptyFilters = (filters) => {
        return Object.keys(filters).length === 0 || 
               Object.values(filters).every(value => value === null || value === '' || value === undefined);
    };
  
    // Fetch workers with or without filters
    const fetchWorkers = async (appliedFilters = {}) => {
        setLoading(true);
        try {
            console.log(appliedFilters);
            console.log(categoryId);
            // Check if filters are empty, and only send categoryId if no filters are applied
            const workerData = await getWorkersByCategory(categoryId, appliedFilters);
            console.log(workerData)
            setWorkers(workerData);
        } catch (error) {
            console.error('Error fetching workers:', error);
        } finally {
            setLoading(false);
        }
    };
  
    // Fetch workers when categoryId or filters change
    useEffect(() => {
        fetchWorkers(filters);
    }, [categoryId, filters]);
  
    // Update filters when the user applies them
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters); // Update the filters state
    };
  
    if (loading) {
        return <div>Loading workers...</div>;
    }
  
    return (
        <div className="catalog-container">
            <div className="transition-block">
                <h2 className="catalog-h2-top">Каталог майстрів</h2>
                <button className="transition-btn">Каталог завдань</button>
            </div>
            <div className="catalog-content">
                <Filters onApplyFilters={handleApplyFilters} /> {/* Pass handleApplyFilters */}
                <div className="catalog-right">
                    <div id="catalog-top-right-id_01">
                        {workers.length > 0 ? (
                            workers.map((worker, index) => (
                                <ProfileCard key={index} profile={worker} categoryId={categoryId} />
                            ))
                        ) : (
                            <div>No workers found for this category</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="img-middle-catalog" style={{ backgroundImage: `url(${middleBg})` }}>
                <Link to="/order"><button >Створити замовлення</button></Link>
            </div>
        </div>
    );
  };
  
  export default ProfilesCatalog;