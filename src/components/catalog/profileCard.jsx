import React from 'react';
import './profileCard.css'; // CSS for the profile card
import { Link } from 'react-router-dom';
import { api } from '../utils/ApiFunctions';
// Import images directly
import favouriteIcon from './images/favourite.png';
import moneyLogo from './images/money_logo.png';
import reviewsLogo from './images/reviews_logo.png';
import successLogo from './images/success_logo.png';
//hi

// const ProfileCard = ({ profile }) => {
//     return (
//         <div className="profile-card">
//             <div className="profile-header">
//                 <div className="profile-header-left">
//                     <div className="profile-picture">
//                         <img src={profile.image} alt="Profile Picture" />
//                     </div>
//                     <div className="profile-info">
//                         <h2>{profile.name}</h2>
//                         <p className="user_categ">{profile.category}</p>
//                         <p className="location">{profile.location}</p>
//                     </div>
//                 </div>
//                 <div className="profile-action">
//                     <img src={favouriteIcon} alt="Favourite" />
//                     <button className="view-profile-btn">Переглянути профіль</button>
//                 </div>
//             </div>

//             <div className="profile-stats">
//                 <div className="stat-item">
//                     <img src={moneyLogo} alt="Price" />
//                     <span>{profile.price}</span>
//                 </div>
//                 <div className="stat-item">
//                     <img src={reviewsLogo} alt="Feedback" />
//                     <span>{profile.feedback}</span>
//                 </div>
//                 <div className="stat-item">
//                     <img src={successLogo} alt="Projects" />
//                     <span>{profile.projects}</span>
//                 </div>
//             </div>

//             <div className="profile-services">
//                 {profile.services.map((service, index) => (
//                     <div key={index} className="profile-services-item">
//                         {service}
//                     </div>
//                 ))}
//             </div>

//             <div className="profile-description">
//                 <p>{profile.description}</p>
//             </div>
//         </div>
//     );
// };
// const ProfileCard = ({ profile }) => {
//     return (
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-header-left">
//             <div className="profile-picture">
//               <img src={profile.image} alt="Profile Picture" />
//             </div>
//             <div className="profile-info">
//               <h2>{profile.name}</h2>
//               <p className="user_categ">{profile.category}</p>
//               <p className="location">{profile.location}</p>
//             </div>
//           </div>
//           <div className="profile-action">
//             <img src={favouriteIcon} alt="Favourite" />
//             <Link to="/perfprofile"><button className="view-profile-btn">Переглянути профіль</button></Link>
//           </div>
//         </div>
  
//         <div className="profile-stats">
//           <div className="stat-item">
//             <img src={moneyLogo} alt="Price" />
//             <span>{profile.price}</span>
//           </div>
//           <div className="stat-item">
//             <img src={reviewsLogo} alt="Feedback" />
//             <span>{profile.feedback}</span>
//           </div>
//           <div className="stat-item">
//             <img src={successLogo} alt="Projects" />
//             <span>{profile.projects}</span>
//           </div>
//         </div>
  
//         <div className="profile-services">
//           {profile.services.map((service, index) => (
//             <div key={index} className="profile-services-item">
//               {service}
//             </div>
//           ))}
//         </div>
  
//         <div className="profile-description">
//           <p>{profile.description}</p>
//         </div>
//       </div>
//     );
//   };
  
// export default ProfileCard;

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-header-left">
          <div className="profile-picture">
            <img src={(`${api.defaults.baseURL}${profile.avatarUrl}`) || '/path/to/default-image.png'} alt="Profile Picture" />
          </div>
          <div className="profile-info">
            <h2>{profile.firstName} {profile.lastName}</h2> {/* Updated for full name */}
            <p className="user_categ">{profile.categories || 'Category not specified'}</p> {/* Assuming profile.category is an object */}
            <p className="location">{profile.city}, {profile.country}</p> {/* Assuming location is an object */}
          </div>
        </div>
        <div className="profile-action">
          <img src={favouriteIcon} alt="Favourite" />
          <Link to={`/perfprofile/${profile.userId}`}> {/* Pass the profile ID for dynamic routing */}
            <button className="view-profile-btn">Переглянути профіль</button>
          </Link>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <img src={moneyLogo} alt="Price" />
          <span>{profile.price ? `$${profile.price}` : 'Price not available'}</span>
        </div>
        <div className="stat-item">
          <img src={reviewsLogo} alt="Feedback" />
          <span>{profile.feedback || 'No feedback yet'}</span>
        </div>
        <div className="stat-item">
          <img src={successLogo} alt="Projects" />
          <span>{profile.projects || 'No projects yet'}</span>
        </div>
      </div>

      <div className="profile-services">
        {profile.services?.length > 0 ? (
          profile.services.map((service, index) => (
            <div key={index} className="profile-services-item">
              {service}
            </div>
          ))
        ) : (
          <div>No services offered</div>
        )}
      </div>

      <div className="profile-description">
        <p>{profile.about || 'No description provided'}</p>
      </div>
    </div>
  );
};

export default ProfileCard;