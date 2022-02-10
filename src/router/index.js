/* src/router/index */
import { useRoutes } from 'react-router-dom';

// routes
import routes from '../router/routes';

// ==============================|| ROUTING RENDER 路由渲染 ||============================== //

export default function Routes() {
    return useRoutes(routes);
}