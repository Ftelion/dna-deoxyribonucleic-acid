import {FC, ReactNode} from 'react'
import {HelmetProvider} from 'react-helmet-async'

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider: FC<IAppProviderProps> = ({children}) => {
    return <HelmetProvider>{children}</HelmetProvider>
}
