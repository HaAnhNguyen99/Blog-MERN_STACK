const Reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
				token: action.payload.accesstoken,
				error: false
			}
		case 'LOGOUT':
			return {
				user: null,
				token: localStorage.setItem('token', null),
				error: false
			}
		case 'UPDATE_SUCCESS':
			return {
				user: action.payload,
				token: action.payload.accesstoken,
				error: false
			}
		default:
			return state
	}
}
export default Reducer
