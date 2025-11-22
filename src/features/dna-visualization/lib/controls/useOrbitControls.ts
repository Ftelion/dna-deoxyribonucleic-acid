import {useRef, useCallback, useEffect} from 'react'
import type {OrbitControls as OrbitControlsImpl} from 'three-stdlib'
import {useDNAViewStore} from '../../model/stores/useDNAViewStore'
import {CAMERA_BOUNDS} from '@/features/dna-visualization/ui/components/visualization-tabs/CameraTab/lib/constants'
import {clampTarget, extractPositionAndTarget} from '../utils/orbitControlsUtils'

/**
 * Хук для управления OrbitControls и синхронизации с store
 */
export const useOrbitControls = () => {
    const orbitControlsRef = useRef<OrbitControlsImpl>(null)
    const updatingFromStoreRef = useRef(false)

    const {setResetCameraCallback, setCameraPosition, setCameraTarget, cameraPosition, cameraTarget} = useDNAViewStore(
        (s) => ({
            setResetCameraCallback: s.setResetCameraCallback,
            setCameraPosition: s.setCameraPosition,
            setCameraTarget: s.setCameraTarget,
            cameraPosition: s.cameraPosition,
            cameraTarget: s.cameraTarget,
        })
    )

    const handleResetCamera = useCallback(() => {
        if (orbitControlsRef.current) {
            orbitControlsRef.current.reset()
        }
    }, [])

    // Обработчик изменения камеры через OrbitControls
    const handleCameraChange = useCallback(() => {
        const controls = orbitControlsRef.current
        if (!controls || updatingFromStoreRef.current) {
            return
        }

        clampTarget(controls, CAMERA_BOUNDS.target)
        const {position, target} = extractPositionAndTarget(controls)

        setCameraPosition(position)
        setCameraTarget(target)

        // зачем передавать сеттеры в массив зависимостей?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Синхронизируем изменения из store в OrbitControls
    useEffect(() => {
        const controls = orbitControlsRef.current
        if (!controls) {
            return
        }

        // Устанавливаем флаг, чтобы избежать бесконечного цикла
        updatingFromStoreRef.current = true

        // Устанавливаем позицию камеры и target
        controls.object.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2])
        controls.target.set(cameraTarget[0], cameraTarget[1], cameraTarget[2])
        controls.object.updateProjectionMatrix()

        // Сбрасываем флаг
        updatingFromStoreRef.current = false
    }, [cameraPosition, cameraTarget])

    // callback для сброса камеры
    useEffect(() => {
        setResetCameraCallback(handleResetCamera)
    }, [setResetCameraCallback, handleResetCamera])

    return {
        ref: orbitControlsRef,
        onChange: handleCameraChange,
    }
}
