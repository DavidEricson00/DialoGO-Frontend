export function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token")

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    })
}
