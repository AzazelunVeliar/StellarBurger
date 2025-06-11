import React, { ReactElement } from 'react';
import { Navigate, useLocation, Location } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  withoutAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  withoutAuth: nonAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  const fromPage = (location.state as { from?: Location })?.from || {
    pathname: '/'
  };

  if (isAuthChecked === undefined) {
    return null;
  }

  if (!nonAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (nonAuth && isAuthChecked) {
    return <Navigate replace to={fromPage} />;
  }

  return children;
};

export default ProtectedRoute;
