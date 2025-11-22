import {useMemo} from 'react'

interface IUseTorusMaterialProps {
    hoveredId: number | null
    selectedId: number | null
    id: number
    color: string
    defaultEmissive?: string
}

export const useTorusMaterial = ({
    hoveredId,
    selectedId,
    id,
    color,
    defaultEmissive = '#001122',
}: IUseTorusMaterialProps) => {
    /**
     * Определяем цвет торуса
     */
    const materialColor = useMemo(() => {
        if (hoveredId === id) {
            return '#00FFFF'
        }

        if (selectedId === id) {
            return '#FFD700'
        }

        return color
    }, [color, hoveredId, id, selectedId])

    /**
     * Определяем эмиссию торуса
     */
    const materialEmissive = useMemo(() => {
        if (hoveredId === id) {
            return '#004444'
        }

        if (selectedId === id) {
            return '#666600'
        }

        return defaultEmissive
    }, [hoveredId, id, selectedId, defaultEmissive])

    /**
     * Определяем прозрачность торуса
     */
    const materialOpacity = useMemo(() => {
        if (hoveredId === id || selectedId === id) {
            return 1.0
        }

        return 0.9
    }, [hoveredId, id, selectedId])

    return {
        materialColor,
        materialEmissive,
        materialOpacity,
    }
}
