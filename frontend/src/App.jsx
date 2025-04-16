import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Aution from './Aution';
import Contact from './Contact';
import AdminDashboard from './components/admin/AdminDashboard';
import Userhome from './components/user/Userhome';
import Additems from './components/user/Additems';
import AdminAuction from './AdminAuction';
import ApprovedProducts from './components/admin/ApprovedProducts';
import Users from './components/admin/Users';
import Settings from './components/admin/Settings';
import EditAuction from "./components/user/EditAuction";
import { UserProvider } from './contexts/UserContext'; 
import MyAuctions from './components/user/MyAuctions';
import MyWonItems from './components/user/MyWonItems';
import MyWons from './components/user/MyWons';
import TransactionTable from './components/admin/TransactionTable';
import WinnerList from './components/admin/WinnerList';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-auction/:itemId" element={<EditAuction />} />
          <Route path="/autions" element={<Aution />} >
              <Route index element={<Userhome/>}></Route>
              <Route path="/autions/myauction" element={<MyAuctions/>}></Route>
              <Route path="/autions/my-won-items" element={<MyWonItems />} />
              <Route path="/autions/my-won" element={<MyWons />} />
              <Route path="/autions/sell" element={<Additems/>}></Route>
          </Route>
          <Route path="/admindashboard" element={<AdminAuction />} >
              <Route index element={<AdminDashboard/>}></Route>
              <Route path="/admindashboard/approvedproducts" element={<ApprovedProducts/>}></Route>
              <Route path="/admindashboard/winners" element={<WinnerList/>}></Route>
              <Route path="/admindashboard/users" element={<Users/>}></Route>
              <Route path="/admindashboard/transaction" element={<TransactionTable/>}></Route>
              <Route path="/admindashboard/settings" element={<Settings/>}></Route>
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
