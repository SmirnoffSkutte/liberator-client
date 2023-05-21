import axios, { AxiosError } from 'axios'

import { API_URL } from '@/config'

import { IAuthResponse, ITokens } from '@/interfaces'

import saveTokensToStorage from '@/helpers/saveTokensToStorage'
import removeTokensFromStorage from '@/helpers/removeTokensFromStorage'
import saveAuthResponceToStorage from '@/helpers/saveAuthResponceToStorage'
import { toastr } from 'react-redux-toastr'
import { useAppDispatch } from '@/redux/reduxHooks'
import store, { authActions } from '@/redux/store'

export const AuthService = {
	async registerEmail(email: string, password: string) {
		try {
			const response = await axios.post<IAuthResponse>(
				`${API_URL}/auth/registration`,
				{
					email,
					password,
				}
			)
			if (response.data.accessToken) {
				saveAuthResponceToStorage(response.data)
			}
			return response
		} catch(error:AxiosError | any){
			if (axios.isAxiosError(error))  {
				// Access to config, request, and response
				toastr.error('Ошибка логина',error.response?.data.message)
			  } else {
				console.log(error)
			  }
		}
	},
	async loginEmail(email: string, password: string) {
		try{
			const response = await axios.post<IAuthResponse>(
				`${API_URL}/auth/login`,
				{
					email,
					password,
				}
			)
		
			if (response.data.accessToken) {
				saveAuthResponceToStorage(response.data)
			}
			return response
		} catch(error:AxiosError | any){
			if (axios.isAxiosError(error))  {
				// Access to config, request, and response
				toastr.error('Ошибка логина',error.response?.data.message)
			  } else {
				console.log(error)
			  }
		}
	},
	async logout() {
		removeTokensFromStorage()
		localStorage.removeItem('user')
		store.dispatch(authActions.removeAuthed())
	},
	async getNewTokens() {
		try {
		const refreshToken = localStorage.getItem('refreshToken')
		const response = await axios.post<ITokens>(
			`${API_URL}/auth/refresh`,
			{
				refreshToken,
			},
			{
				headers:{'Content-Type':'application/json'}
			}
		)

		if (response.data.accessToken) {
			saveTokensToStorage(response.data.accessToken,response.data.refreshToken)
		}

		return response
		} catch(error:AxiosError | any){
			if (axios.isAxiosError(error))  {
				// Access to config, request, and response
				toastr.error('Ошибка обновления токенов',error.response?.data.message)
			  } else {
				console.log(error)
			  }
		}
	},
}