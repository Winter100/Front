import AnotherMenu from '../components/AnotherMenu';
import Carousel from '../components/Carousel';
import AbsoluteBox from '../components/common/AbsoluteBox';
import Header from '../components/common/layout/Header';
import MainSection from '../components/common/layout/MainSection';
import UserProfile from '../components/common/UserProfile';

const DUMMY = {
  name: '아무개',
  age: 26,
  profileImages: ['public/1.jpg', 'public/2.jpg', 'public/3.jpg'],
  badges: [
    { description: 'INTP' },
    { description: '요리잘함' },
    { description: '집순이' },
    { description: '학생' },
    { description: '좋아함zzzzzzzzzzzzzz' },
    { description: '게임고수' },
    { description: '강아지 키워요!' },
    { description: 'INTP' },
    { description: '요리잘함' },
    { description: '집순이' },
    { description: '학생' },
    { description: '좋아함zzzzzzzzzzzzzz' },
    { description: '게임고수' },
    { description: '강아지 키워요!' },
    { description: 'INTP' },
    { description: '요리잘함' },
    { description: '집순이' },
    { description: '학생' },
    { description: '좋아함zzzzzzzzzzzzzz' },
    { description: '게임고수' },
    { description: '강아지 키워요!' },
  ],
};

const MatchingProfile = () => {
  return (
    <>
      <Header></Header>
      <MainSection>
        <Carousel images={DUMMY.profileImages} />
        <AbsoluteBox>
          <UserProfile name={DUMMY.name} age={DUMMY.age} />
          <AnotherMenu />
        </AbsoluteBox>
      </MainSection>
    </>
  );
};

export default MatchingProfile;
