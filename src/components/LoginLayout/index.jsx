import { Route } from 'react-router-dom';
import Header from '../../pages/Header'
function LoginLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <>
          <Header/>
          <Component {...other} {...props} />
          </>
        )
      }}
    />
  );
}

export default LoginLayout;
