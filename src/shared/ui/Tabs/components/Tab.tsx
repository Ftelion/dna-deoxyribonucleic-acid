import {FC, ReactNode} from 'react'

export interface ITabProps {
    id: string
    title: string
    children: ReactNode
}

const Tab: FC<ITabProps> = ({children}) => {
    return <>{children}</>
}

// Добавляем displayName для лучшей отладки
Tab.displayName = 'Tab'

export default Tab
