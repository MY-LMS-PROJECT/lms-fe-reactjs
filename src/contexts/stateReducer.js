export const initState = {
  auth: {
    isAuth: false,
    user: {
      name: '',
      email: '',
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
          user: {
            name: action.payload.name,
            email: action.payload.email,
          },
        },
      }

    case ACTION_TYPE.LOG_OUT:
      return {
        ...state,
        auth: {
          isAuth: false,
          user: { name: '', email: '' },
        },
      }

    default:
      throw new Error('Invalid Action')
  }
}
