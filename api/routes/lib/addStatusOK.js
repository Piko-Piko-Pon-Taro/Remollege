const addStatusOK = (data) => {
  return {
    statusCode: 200,
    ...data
  };
};

module.exports = addStatusOK;