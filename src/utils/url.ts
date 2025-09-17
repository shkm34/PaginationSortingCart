export function parseIntOrDefault(raw: string | null, fallback: number): number {
    if(raw === null) return fallback
    const parsed = parseInt(raw, 10)
    return Number.isFinite(parsed)? parsed : fallback
}

export function getIntFromSearch(search: string, key: string, fallback: number): number {
    try {
        const params = new URLSearchParams(search)
        return parseIntOrDefault(params.get(key), fallback)
    } catch {
        return fallback
    }
}