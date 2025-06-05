import { useRoutes } from 'react-router-dom';
import { HomeRoutes } from './home';

function AppRoutes() {
  return useRoutes([HomeRoutes]);
}

export default AppRoutes;
