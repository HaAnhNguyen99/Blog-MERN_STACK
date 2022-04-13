import { createContext, useReducer, useEffect } from 'react'
import Reducer from './Reducer'

const INIT_VALUE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	token: localStorage.getItem('token') || null,
	error: false
}

export const Context = createContext(INIT_VALUE)

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, INIT_VALUE)
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user))
		state.user != null &&
			localStorage.setItem('token', state.user.accesstoken)
	}, [state.user])
	return (
		<Context.Provider
			value={{ user: state.user, error: state.error, dispatch }}>
			{children}
		</Context.Provider>
	)
}
