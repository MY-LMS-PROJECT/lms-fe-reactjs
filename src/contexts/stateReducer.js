export const initState = {
  auth: {
    isAuth: false,
    user: {
      /* firstName, lastName, email, role: { id name description }, avatar, socialId, id, social, createdAt, updatedAt, deletedAt */
    },
  },
}

export const ACTION_TYPE = {
  LOG_IN: 'LOGIN',
  LOG_OUT: 'LOGOUT',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOG_IN:
      return {
        ...state,
        auth: {
          isAuth: true,
          user: { ...action.payload },
        },
      }

    case ACTION_TYPE.LOG_OUT:
      return {
        ...state,
        auth: {
          isAuth: false,
          user: {},
        },
      }

    default:
      throw new Error('Invalid Action')
  }
}
