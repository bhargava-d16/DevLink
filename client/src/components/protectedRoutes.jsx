// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../store/useAuth";
// import { Loader } from "lucide-react";

// const ProtectedRoute = ({ children }) => {
//   const { authUser, isCheckingAuth, checkAuth } = useAuth();

//   useEffect(() => {
//     if (!authUser) {
//       checkAuth();
//     }
//   }, [authUser, checkAuth]);

//   if (isCheckingAuth) {
//     return (
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//         <Loader className="size-10 animate-spin text-white" />
//       </div>
//     );
//   }

//   return authUser ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;