/**
 * Парсит строку ввода в массив номеров пар
 */
export const parsePairNumbers = (input: string): number[] => {
    return input
        .split(/[, ]+/)
        .map((s) => parseInt(s.trim()))
        .filter((n) => n >= 1 && n <= 40 && !isNaN(n))
}

/**
 * Обрабатывает ввод номеров пар с клавиатуры
 */
export const handlePairInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentPairs: number[],
    onPairsChange: (pairs: number[]) => void
): void => {
    if (event.key === 'Enter') {
        const numbers = parsePairNumbers(event.currentTarget.value)
        if (numbers.length > 0) {
            const uniqueNumbers = [...new Set([...currentPairs, ...numbers])].sort((a, b) => a - b)
            onPairsChange(uniqueNumbers)
            event.currentTarget.value = ''
        }
    }
}
