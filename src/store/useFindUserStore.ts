import { create } from 'zustand';

export interface User {
  imageUrl: string;
  profileName: string;
  age: number;
}

type State = {
  userData: User[];
  selectedUser: null | User;
  currentIndex: number;
};

type Action = {
  setUserData: (users: User[]) => void;
  setNextSelectUser: () => void;
  deleteUser: (name: string) => void;
};

const useFindUserStore = create<State & Action>((set) => ({
  userData: [],
  selectedUser: null,
  currentIndex: 0,
  setUserData: (users) =>
    set(() => {
      return {
        userData: users,
        currentIndex: 0,
        selectedUser: users[0] ?? null,
      };
    }),
  setNextSelectUser: () =>
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % state.userData.length;
      return {
        currentIndex: nextIndex,
        selectedUser: state.userData[nextIndex],
      };
    }),
  deleteUser: (name) =>
    set((state) => {
      const users = [...state.userData];
      const filteredUsers = users.filter((user) => user.profileName !== name);
      return { userData: filteredUsers };
    }),
}));

export default useFindUserStore;
