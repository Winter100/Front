import Footer from '../../components/layout/Footer';

import AddressForm from './components/AddressForm';
import MatchingMenu from './components/MatchingMenu';

const Home = () => {
  return (
    <>
      <AddressForm />
      <Footer>
        <MatchingMenu />
      </Footer>
    </>
  );
};

export default Home;
