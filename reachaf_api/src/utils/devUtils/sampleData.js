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
  tag: `${username}-${Math.floor(Math.random() * 1000)}`,
  services: [
    {
      type: 'facebook',
      value: `http://facebook.com/${username}`
    },
    {
      type: 'email',
      value: `${username}${Math.floor(Math.random() * 100)}@gmail.com`
    },
    {
      type: 'mobile',
      value: `${Math.floor(Math.random() * 10000000000)}`
    }
  ],
  aliases: [
    {
      type: 'my user name',
      value: `${username}`
    },
    {
      type: 'spliiitt',
      value: `${username.split('').join(' ')}`
    }
  ]
});
