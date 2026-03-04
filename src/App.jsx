import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Deposit from "./pages/Deposit.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TransactionHistoryPage from "./pages/TransactionHistoryPage.jsx";
import Transfer from "./pages/Transfer.jsx";
import Withdraw from "./pages/Withdraw.jsx";

function App() {
  const hasToken = Boolean(localStorage.getItem("authToken"));

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={hasToken ? "/dashboard" : "/login"} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionHistoryPage />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={hasToken ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
