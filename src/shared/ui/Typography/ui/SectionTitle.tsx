import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

interface ISectionTitleProps {
    titleKey: string
    className?: string
    size?: 'sm' | 'base' | 'lg'
    color?: 'gray' | 'blue' | 'light-gray'
}

const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-base',
}

const colorStyles = {
    gray: {
        color: '#374151',
        darkColor: '#f1f5f9',
    },
    blue: {
        color: '#2563eb',
        darkColor: '#60a5fa',
    },
    'light-gray': {
        color: '#6B7280',
        darkColor: '#94a3b8',
    },
}

export const SectionTitle: FC<ISectionTitleProps> = ({titleKey, className = '', size = 'lg', color = 'gray'}) => {
    const {t} = useTranslation()

    // Определяем цвет в зависимости от темы (пока используем класс, в будущем можно использовать хук useTheme)
    const isDark = document.body.getAttribute('data-theme') === 'dark'
    const currentColor = isDark ? colorStyles[color].darkColor : colorStyles[color].color

    return (
        <h3
            className={cn(sizeClasses[size], 'font-semibold', className)}
            style={{
                color: currentColor,
                lineHeight: '1.4',
                margin: '0 0 0.7rem 0',
            }}
        >
            {t(titleKey)}
        </h3>
    )
}
