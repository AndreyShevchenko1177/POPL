{
  'Login': {
    sEmail: 'string',
    sPassword: 'string',
    sAction: 'Auth',
    ajax: 1,
    requestType: 'post'
  },
  'Logout': 'Simply clear cookies',
  'SignUp': {
    sName: 'string',
    sEmail: 'string',
    sPassword: 'string',
    sAction: 'SaveMember'
    ajax: 1
  },
  'GetAllPopls': {
    // Member should be auth
    sAction: 'GetPopls',
    ajax=1
    answer: {
      type: 'json',
      example: [{}, {}, {}]
    }
  },
  'AddPopl': {
    sAction: 'AddPopl',
    sName: 'string',
    sSlug: 'string',
    iMemberID: 'mid from auth response'
    ajax: 1
    answer: {
      type: 'json',
      example: {iPoplId: 1}
    }
  },
  'EditPopl': {
    sAction: 'UpdatePopl',
    sName: 'string',
    sSlug: 'string',
    iMemberID: 'mid from auth response',
    iID: '',
    // existing value
    ajax: 1,
    answer: {
      type: 'json',
      example: {iPoplID: 1}
    }
  },
}