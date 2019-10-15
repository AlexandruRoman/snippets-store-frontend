export function getObject(key: string): object | null {
    const string = localStorage.getItem(key)
    if (!string || string === '')
        return null
    return JSON.parse(string)
}

export function setObject(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data))
}

export function clearObject(key: string): void {
    localStorage.removeItem(key)
}

export function getString(key: string): string | null {
    return localStorage.getItem(key)
}
export function setString(key: string, value: string): void {
    localStorage.setItem(key, value)
}