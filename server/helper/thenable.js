const getThenable = (action) => {
  const thenable = {
    then(onFulfilled, onReject) {
      action(onFulfilled, onReject);
    },
  };
  return thenable;
};

module.exports = getThenable;
