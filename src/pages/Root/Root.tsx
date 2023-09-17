import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';

export const Root: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
