const statusIndex = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  DUPLICATE: 422,
  UNAUTORIZED: 401,
  FORBIDDEN: 403,
  DELETED: 204,
  TO_MANY_REQUEST: 429,
  ERROR: 500,
};

const MESSAGE = {
  INVALID_CREDENTIALS: (id) => {
    return {
      status: statusIndex.BAD_REQUEST,
      data: {
        errors: [
          {
            msg: 'Unautorized',
          },
        ],
      },
    };
  },

  UNAUTORIZED: () => {
    return {
      status: statusIndex.UNAUTORIZED,
      data: {
        errors: [
          {
            msg: 'Unautorized',
          },
        ],
      },
    };
  },

  ERROR: (data) => {
    return {
      status: statusIndex.ERROR,
      data: {
        error: data,
      },
    };
  },
  ADD_CLIENT_SUCCESS: (data) => {
    return {
      status: statusIndex.CREATED,
      data: {
        client: data,
      },
    };
  },
  ADD_DATA_SUCCESS: (data) => {
    return {
      status: statusIndex.CREATED,
      data: {
        data: data,
      },
    };
  },
  DELETE_SUCCESS: (data) => {
    return {
      status: statusIndex.DELETED,
      data: {
        result: data,
      },
    };
  },

  CLIENTS: (data) => {
    return {
      status: statusIndex.OK,
      data: {
        clients: data,
      },
    };
  },
  DATA: (data) => {
    return {
      status: statusIndex.OK,
      data: {
        data: data,
      },
    };
  },
};
module.exports = MESSAGE;
