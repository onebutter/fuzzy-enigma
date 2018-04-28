import request from 'request-promise';
import config from 'config';
import { URLSearchParams } from 'url';

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

export const getTokenForGithub = async (req, res) => {
  const { github } = config.extService;
  const data = {
    client_id: github.clientID,
    client_secret: github.clientSecret,
    code: req.body.code,
    redirect_uri: req.body.redirectUrl
  };

  const options = {
    method: 'POST',
    url: github.tokenURL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: data
  };

  try {
    const responseFromGithub = new URLSearchParams(await request(options));
    let resObj = {};
    for (let x of responseFromGithub.entries()) {
      resObj[x[0]] = x[1];
    }
    res.json(resObj);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
