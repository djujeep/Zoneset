import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage.js'

const  QUERY = '(prefers-color-scheme: dark)'

export default function useTheme() {
    const [choice, setChoice] = useLocalStorage('theme-choice', 'system')
    const [systemDark, setSystemDark] = useState(() => window.matchMedia(QUERY).matches)

    useEffect(() => {
        const media = window.matchMedia(QUERY)
        const onChange = (event) => setSystemDark(event.matches)
        media.addEventListener('change', onChange)
        return () => media.removeEventListener('change', onChange)
    }, [])

    const resolved = choice === 'system' ? (systemDark ? 'dark' : 'light') : choice

    useEffect(() => {
        document.documentElement.dataset.theme = resolved 
    }, [resolved])

    return { choice, setChoice, resolved }
}