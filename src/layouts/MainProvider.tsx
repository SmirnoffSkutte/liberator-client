import { PropsWithChildren,FC } from "react"
import store from '@/redux/store'
import { Provider} from 'react-redux'
import AppLayout from '@/layouts/AppLayout'
import ReduxToastrLib from 'react-redux-toastr'
const MainProvider : FC<PropsWithChildren> = ({children}) => {
    return (
        <Provider store={store}>
        <AppLayout>
        <ReduxToastrLib
        newestOnTop={false}
        preventDuplicates
        closeOnToastrClick
        timeOut={4000}
        transitionIn='fadeIn'
        transitionOut='fadeOut'/>
          {children}
        </AppLayout>
      </Provider>
    )
  }
  
export default MainProvider