import {FC, ReactNode} from 'react'
import {I18nextProvider} from 'react-i18next'
import i18n from '@/shared/lib/i18n/config/i18n'

interface I18nProviderProps {
    children: ReactNode
}

export const I18nProvider: FC<I18nProviderProps> = ({children}) => {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
