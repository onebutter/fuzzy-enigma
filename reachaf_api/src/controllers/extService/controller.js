import request from 'request-promise';
import config from 'config';

export const getTokenForDiscord = async (req, res) => {
  const { discord } = config.extService;
  const data = {
    client_id: discord.clientID,
    client_secret: discord.clientSecret,
    grant_type: 'authorization_code',
    code: req.body.code,
    redirect_uri: req.body.redirectUrl
  };

  const options = {
    method: 'POST',
    url: discord.tokenURL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: data
  };

  try {
    const responseFromDiscord = await request(options);
    res.json(JSON.parse(responseFromDiscord));
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
