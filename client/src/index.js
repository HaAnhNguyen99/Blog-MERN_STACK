import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import './index.css'
import axios from 'axios'
import App from './app'
import { ContextProvider } from './context/ Context'

//config axios
axios.defaults.baseURL = 'http://localhost:3000/'

const rootElement = document.getElementById('root')

ReactDOM.render(
	// <React.StrictMode>
	<ContextProvider>
		<App />
	</ContextProvider>,
	// </React.StrictMode>,
	rootElement
)
