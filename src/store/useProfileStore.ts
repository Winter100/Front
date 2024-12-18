import { create } from 'zustand';

type Profile = {
  gender: string;
  profileName: string;
  interest: string[];
  image: File[];
  selfIntroduction: string;
  dateOfBirth: string;
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
    profileName: '',
    interest: [],
    image: [],
    selfIntroduction: '',
    dateOfBirth: '',
  },

  setProfile: ({
    gender,
    interest,
    image,
    selfIntroduction,
    profileName,
    dateOfBirth,
  }) =>
    set((state) => ({
      profile: {
        ...state.profile,
        gender,
        profileName,
        interest,
        image,
        selfIntroduction,
        dateOfBirth,
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
