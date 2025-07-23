import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import Jobs from './components/Jobs';
import Cards from './components/Cards';
import AddJob from './components/AddJob';
import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';

function AppRoutes({ updateLocalStorage, logout }) {
    const location = useLocation();

    return (
    <>
    <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/Auth' element={<Auth updateLocalStorage={updateLocalStorage} />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/jobs/addjob' element={<AddJob />} />
        <Route path='/Dashboard' element={<Dashboard user={Auth} jobs={Jobs} />} />
        <Route path='/invoices' element ={<Invoice />} />
    </Routes>

        
        {location.pathname !== '/' && (
        <button onClick={logout}>Logout</button>
        )}
    </>
    );
}

export default AppRoutes;