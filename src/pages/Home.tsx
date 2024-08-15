import AddressForm from '../components/AddressForm';
import Footer from '../components/common/layout/Footer';
import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import MatchingMenu from '../components/MatchingMenu';

const Home = () => {
  return (
    <>
      <Header></Header>
      <MainSection>
        <AddressForm />
      </MainSection>
      <Footer>
        <MatchingMenu />
      </Footer>
    </>
  );
};

export default Home;
