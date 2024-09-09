import Header from '../../components/layout/Header';

import Carousel from './components/Carousel';
import AbsoluteBox from '../../components/common/AbsoluteBox';
import UserProfile from './components/UserProfile';
import AnotherMenu from './components/AnotherMenu';

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
      <Carousel images={DUMMY.profileImages} />
      <AbsoluteBox>
        <UserProfile name={DUMMY.name} age={DUMMY.age} />
        <AnotherMenu />
      </AbsoluteBox>
    </>
  );
};

export default MatchingProfile;
