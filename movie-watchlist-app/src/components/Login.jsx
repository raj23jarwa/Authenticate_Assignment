// import React, { useState } from "react";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Here you can implement your authentication logic
//     // For simplicity, let's just check if email is provided
//     if (!email) {
//       setError("Please enter your email.");
//       return;
//     }
//     // Assume login is successful, call onLogin with the email
//     onLogin(email);
//   };

//   return (
//     <div className="flex  justify-center mt-8">
//       <form onSubmit={handleLogin} className="max-w-md w-full space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email address
//           </label>
//           <input
//             type="email"
//             id="email"
//             autoComplete="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Sign in
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
