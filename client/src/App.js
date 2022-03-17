import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import Settings from "./pages/Settings";
import BecomePremium from "./pages/BecomePremium";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        { authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
        { authToken && <Route path="/onboarding" element={<Onboarding/>}/>}
        { authToken && <Route path="/settings" element={<Settings/>}/>}
        { authToken && <Route path="/become-premium" element={<BecomePremium/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
