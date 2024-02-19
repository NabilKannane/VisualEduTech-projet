import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
 
 // Your authentication logic goes here...
 const token = localStorage.getItem("accessToken")
 
  return token ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;