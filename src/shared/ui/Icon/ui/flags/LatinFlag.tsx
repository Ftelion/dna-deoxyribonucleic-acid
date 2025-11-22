import {FC} from 'react'

const LatinFlag: FC = () => (
    <svg width="32" height="24" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="latinBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="50%" stopColor="#F5F5DC" />
                <stop offset="100%" stopColor="#FFF8DC" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
        </defs>
        <rect width="28" height="20" rx="2" fill="url(#latinBg)" />

        <text x="10" y="14" fill="url(#goldGradient)" fontSize="12" fontFamily="serif" fontWeight="bold">
            L
        </text>

        <rect x="18" y="4" width="2" height="12" fill="#8B4513" />
        <rect x="17" y="3" width="4" height="1" fill="#654321" />
        <rect x="17" y="16" width="4" height="1" fill="#654321" />
        <rect x="16" y="15" width="1" height="2" fill="#654321" />
        <rect x="21" y="15" width="1" height="2" fill="#654321" />

        <circle cx="6" cy="6" r="1" fill="#DAA520" opacity="0.6" />
        <circle cx="22" cy="14" r="1" fill="#DAA520" opacity="0.6" />
    </svg>
)

export default LatinFlag
