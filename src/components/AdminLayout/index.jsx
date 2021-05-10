import { Route } from 'react-router-dom';
import MenuAdmin from '../../pages/AdminCP/MenuAdmin'
function AdminLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <>
          <MenuAdmin/>
          <Component {...other} {...props} />
          </>
        )
      }}
    />
  );
}

export default AdminLayout;
