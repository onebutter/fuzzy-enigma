const user0 = {
  username: 'donkey',
  password: '1234'
};

const user1 = {
  username: 'smash',
  password: '1234'
};

export const sampleData = {
  users: [user0, user1]
};

export const genSampleNamecard = username => ({
  tags: ['some', 'tags', 'for', 'testing'],
  services: [
    {
      label: 'facebook',
      value: `http://facebook.com/${username}`
    },
    {
      label: 'email',
      value: `${username}${Math.floor(Math.random() * 100)}@gmail.com`
    },
    {
      label: 'mobile',
      value: `${Math.floor(Math.random() * 10000000000)}`
    }
  ],
  aliases: [
    {
      label: 'my user name',
      value: `${username}`
    },
    {
      label: 'spliiitt',
      value: `${username.split('').join(' ')}`
    }
  ]
});
