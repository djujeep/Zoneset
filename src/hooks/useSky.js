import { useEffect, useState } from 'react'
import { skyForHour } from '../utils/sky.js'

// The sky for the visitor's own clock, checked every minute.
export default function useSky() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return { sky: skyForHour(now.getHours()), now }
}