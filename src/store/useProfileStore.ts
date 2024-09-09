import { create } from 'zustand';

type Profile = {
  gender: string;
  nickname: string;
  interest: string[];
  image: File[];
  introduce: string;
};

type State = {
  profile: Profile;
};

type Action = {
  setProfile: (profile: Profile) => void;
  addImage: (image: File) => void;
  removeImage: (image: File) => void;
};
const useProfileStore = create<State & Action>((set) => ({
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

export default useProfileStore;
