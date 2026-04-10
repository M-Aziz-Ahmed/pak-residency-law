"use client"
import { useEffect, useState } from "react"

const useMe = () => {
    const [user, setUser] = useState(undefined) // undefined = loading, null = not logged in
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/user/current')
            .then(r => r.json())
            .then(data => {
                setUser(data.user || null)
                setLoading(false)
            })
            .catch(() => {
                setUser(null)
                setLoading(false)
            })
    }, [])
    console.log(user)

    return { user, loading }
}

export default useMe
