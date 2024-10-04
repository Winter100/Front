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
  http.post('/api/v1/auth/kakao', () => {
    return HttpResponse.json({
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzIzMTYyNDcyLCJleHAiOjE3MjM1MjI0NzJ9.RsuO7_CL6IALDx7ZarjJOhnpmNNqGluAt2-XeyHrKS4',
      refreshToken: 'string',
      grantType: 'string',
      expiresIn: 0,
    });
  }),
  http.post('/api/v1/auth/email-certification', async () => {
    return HttpResponse.json({
      status: '성공!',
      message: '이미 인증이 완료된 이메일입니다.',
    });
  }),
  http.post('/api/v1/auth/sign-up', async () => {
    return HttpResponse.json(`signup success`);
  }),
];
