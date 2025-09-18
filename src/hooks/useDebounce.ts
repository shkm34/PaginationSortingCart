import { useState, useEffect, useRef } from 'react'

export function useDebounce <T> (value: T, delay: number): T {
    const [debounced, setDebounced] = useState<T>(value)
      const lastValueRef = useRef(value);

    useEffect(() =>{
        lastValueRef.current = value;
        const timer = setTimeout(() => setDebounced(lastValueRef.current), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}