import { useEffect, useState } from "react"
import Header from "../../components/layout/Header"
import { User } from "../../types/User"
import { getMe } from "../../services/user.service"

export default function Home() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getMe()
            .then(data => setUser(data))
            .catch(err => console.error(err))
    })

    function openUserMenu(){
        console.log("Abrir menu")
    }

    return(
        <>
            {user && (
                <Header
                    user={user}
                    onClick={openUserMenu}
                />
            )}
            <div className="mt-38">
                <p>Home</p>
            </div>
            
        </>
    )
}