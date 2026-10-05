import { Navigate, Outlet } from 'react-router-dom';
import { isFamilyAdmin } from '../../data/mockData';

export default function AdminRoute() {
  return isFamilyAdmin() ? <Outlet /> : <Navigate to="/dashboard" replace state={{ accessDenied: true }} />;
}
