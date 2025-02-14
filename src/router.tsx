import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
