/* eslint-disable no-console */
const validateRequest = (filePath) => {
  const result = {
    code: null,
    message: null,
  };

  if (filePath.includes('..')) {
    result.code = 400;
    result.message = 'Bad request';

    return result;
  }

  if (!(filePath === 'file' || filePath.startsWith('file/'))) {
    result.code = 200;
    result.message = 'Request should start with "file"';

    return result;
  }

  if (filePath.includes('//')) {
    result.code = 404;
    result.message = 'Request should not contain double slashes';

    return result;
  }

  return result;
};

module.exports = { validateRequest };
