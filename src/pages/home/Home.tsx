import { useEffect, useState } from "react"
import Header from "../../components/layout/Header"
import { User } from "../../types/User"
import { getMe } from "../../services/user.service"
import MyChatsList from "../../components/chat/lists/MyChatsList"
import ChatDiscoveryList from "../../components/chat/lists/ChatDiscoveryList"

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
            <div className="mt-24 h-[calc(100vh-6rem)] grid grid-cols-4">
                <div className="col-span-1 border-r">
                    <MyChatsList />
                </div>

                <div className="col-span-3">
                    <ChatDiscoveryList />
                </div>
            </div>
        </>
    )
}