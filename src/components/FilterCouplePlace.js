// // src/components/FilterCouplePlace.js
// import React, { useState } from 'react';
// import { TextField, Button, colors } from '@mui/material';
// import CouplePlaceService from '../CouplePlaceService';

// const FilterCouplePlace = () => {
//   const [location, setLocation] = useState('');
//   const [category, setCategory] = useState('');
//   const [filteredPlaces, setFilteredPlaces] = useState([]);

//   const handleFilter = () => {
//     CouplePlaceService.getPlacesByLocationAndCategory(location, category)
//       .then((response) => {
//         setFilteredPlaces(response.data);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the filtered places!', error);
//       });
//   };


//   return (
//     <div>
//       <h2 style={{ color: 'white' }}>Filter Couple Places</h2>
//       <TextField
//         label="Location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <Button onClick={handleFilter} variant="contained" color="primary">
//         Filter
//       </Button>

//       <div>
//         <h3>Filtered Places</h3>
//         <ul>
//           {filteredPlaces.map((place) => (
//             <li key={place.id}>
//               <strong>{place.name}</strong> - {place.category} - {place.location}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FilterCouplePlace;
