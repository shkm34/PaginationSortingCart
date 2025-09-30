import { useCallback, useEffect, useState } from 'react'

export function useSearchFilterWithUrl(){
    console.log("useSearchFilterWithUrl")
    const getInitialQ = () =>{
        if(typeof window === "undefined") return undefined

        const params = new URL (window.location.href)
        const q = params.searchParams.get("q")

        return q ?? undefined
    }

    const [q, setQInternal] = useState<string | undefined>(getInitialQ)

    const setQ = useCallback((value?: string) =>{
        setQInternal(value ? value : undefined)

        if(typeof window === "undefined") return

        const url = new URL(window.location.href) 
        const params = url.searchParams

        if(!value) params.delete("q")
        else params.set("q", value)

        window.history.pushState(null, "", url.toString())

    }, [])

    return {q, setQ}
}