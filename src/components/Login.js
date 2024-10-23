// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Import Auth context
// import './Login.css';


// const Login = () => {
//   const { login } = useAuth(); // Use the login function from Auth context
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       // Redirect or show success message
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Log In</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import Auth context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import './Login.css';

const Login = () => {
  const { handleLogin } = useAuth(); // Use handleLogin from Auth context
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password }); // Pass the user data as an object
      navigate('/'); // Redirect to the homepage or desired route
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
