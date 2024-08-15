import { create } from 'zustand';

interface Profile {
  gender: string;
  nickname: string;
  interest: string[];
  image: File[];
  introduce: string;
}

// 전체 상태 타입 정의
interface ProfileState {
  profile: Profile;

  setProfile: (profile: Profile) => void;
  addImage: (image: File) => void;
  removeImage: (image: File) => void;
}
const useProfile = create<ProfileState>((set) => ({
  profile: {
    gender: '',
    nickname: '',
    interest: [],
    image: [],
    introduce: '',
  },

  setProfile: ({ gender, interest, image, introduce, nickname }) =>
    set((state) => ({
      profile: {
        ...state.profile,
        gender,
        nickname,
        interest,
        image,
        introduce,
      },
    })),
  addImage: (image) =>
    set((state) => ({
      profile: {
        ...state.profile,
        image: [...state.profile.image, image],
      },
    })),

  removeImage: (image) =>
    set((state) => ({
      profile: {
        ...state.profile,
        image: state.profile.image.filter((img) => img !== image),
      },
    })),
}));

export default useProfile;
