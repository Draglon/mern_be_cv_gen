import jwt from 'jsonwebtoken'

import getError from './getError.js';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123')

      req.userId = decoded._id;
      next();
    } catch(error) {
      return getError(res, 403, { message: 'Нет доступа', error });
    }
  } else {
    getError(res, 403, { message: 'Нет доступа' });
  }
}