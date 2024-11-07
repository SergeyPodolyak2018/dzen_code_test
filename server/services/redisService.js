const sessionRepository = require('../repository/sessionRepository');

const PREFIX = 'session_';

const createSessionKey = (session) => {
  return PREFIX + session;
};

const saveSession = (session, id, time) => {
  const key = createSessionKey(session);
  return sessionRepository.setExpiried(key, id, time);
};

const checkSession = (session) => {
  const key = createSessionKey(session);

  return sessionRepository.get(key);
};

module.exports = {
  saveSession,
  checkSession,
};
