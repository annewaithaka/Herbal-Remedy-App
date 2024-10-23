// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Import Auth context
// import './Remedies.css';


// const Remedies = () => {
//   const { getToken } = useAuth();
//   const [remedies, setRemedies] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRemedies = async () => {
//       try {
//         const token = await getToken();
//         const response = await fetch('http://localhost:5000/api/remedies', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setRemedies(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchRemedies();
//   }, [getToken]);

//   return (
//     <div className="remedies-container">
//       <h2>Available Remedies</h2>
//       {error && <p className="error-message">{error}</p>}
//       <ul>
//         {remedies.map((remedy) => (
//           <li key={remedy.id}>
//             <h3>{remedy.name}</h3>
//             <p>{remedy.advantages}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Remedies;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import Auth context
import './Remedies.css';

const Remedies = () => {
  const { getToken } = useAuth();
  const [remedies, setRemedies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const token = getToken(); // Call getToken directly without awaiting
        const response = await fetch('http://localhost:5000/api/remedies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch remedies');
        }

        const data = await response.json();
        setRemedies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRemedies();
  }, [getToken]);

  return (
    <div className="remedies-container">
      <h2>Available Remedies</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {remedies.map((remedy) => (
          <li key={remedy.id}>
            <h3>{remedy.name}</h3>
            <p>{remedy.advantages}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Remedies;
