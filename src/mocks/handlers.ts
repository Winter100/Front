import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/v1/profile', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'user1',
        age: 28,
        description: 'I am user1',
        distance: 2.5,
        profilePictureUrl: '/profiles/user1.jpg',
      },
      {
        id: 2,
        name: 'user2',
        age: 34,
        description: 'I am user2',
        distance: 3.8,
        profilePictureUrl: '/profiles/user2.jpg',
      },
    ]);
  }),
  http.post('/api/login', () => {
    return HttpResponse.json([]);
  }),
];
