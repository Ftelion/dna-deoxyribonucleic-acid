import type {OrbitControls as OrbitControlsImpl} from 'three-stdlib'
import type {ICameraBounds} from '@/features/dna-visualization/ui/components/visualization-tabs/CameraTab/types'

/**
 * Ограничиваем вектор target в пределах границ камеры
 */
export const clampTarget = (controls: OrbitControlsImpl, bounds: ICameraBounds['target']): void => {
    controls.target.x = Math.max(bounds.x.min, Math.min(bounds.x.max, controls.target.x))
    controls.target.y = Math.max(bounds.y.min, Math.min(bounds.y.max, controls.target.y))
    controls.target.z = Math.max(bounds.z.min, Math.min(bounds.z.max, controls.target.z))
}

/**
 * Извлекаем текущую позицию и target из OrbitControls
 */
export const extractPositionAndTarget = (controls: OrbitControlsImpl) => ({
    position: [controls.object.position.x, controls.object.position.y, controls.object.position.z] as const,
    target: [controls.target.x, controls.target.y, controls.target.z] as const,
})
