import { Outlet } from 'react-router-dom';
import MatchingMenu from '../../MatchingMenu';
import Footer from './Footer';

const MatchLayout = () => {
  return (
    <>
      <Outlet />
      <Footer>
        <MatchingMenu />
      </Footer>
    </>
  );
};

export default MatchLayout;
