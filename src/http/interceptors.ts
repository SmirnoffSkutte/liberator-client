import axios from 'axios'
import removeTokensFromStorage from '@/helpers/removeTokensFromStorage'
import { AuthService } from '@/services/auth.service'
import { APP_URL,API_URL } from '@/config'
import { toastr } from 'react-redux-toastr'
import { useAppDispatch } from '@/redux/reduxHooks'
import { authActions } from '@/redux/store'

const axiosInterceptor = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInterceptor.interceptors.request.use((config) => {
    const accessToken=localStorage.getItem('accessToken')
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

axiosInterceptor.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401) && error.config && !error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()

				return axiosInterceptor.request(originalRequest)
			} catch (e) {
				removeTokensFromStorage
				const dispatch=useAppDispatch()
				dispatch(authActions.removeAuthed())
				toastr.error('','Ваша авторизация истекла,пожалуйста,перезайдите')
			}
		}

		// throw error
		toastr.error('Ошибка запроса',error)
	}
)

export default axiosInterceptor

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})