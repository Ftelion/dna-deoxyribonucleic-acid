import {FC, ReactNode} from 'react'
import {AppProvider} from './AppProvider'
import {I18nProvider} from './I18nProvider'
import {ThemeProvider} from '@/shared/lib/theme/ThemeProvider'

interface IProvidersProps {
    children: ReactNode
}

export const Providers: FC<IProvidersProps> = ({children}) => {
    return (
        <AppProvider>
            <ThemeProvider>
                <I18nProvider>{children}</I18nProvider>
            </ThemeProvider>
        </AppProvider>
    )
}
