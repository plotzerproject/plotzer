import { useState } from 'react'
import { useEffect } from 'react'
import Base from '../../components/Base'
import { api } from '../../services/api'
import Loading from '../Loading'

function Profile () {
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function getUser(){
            try {
                const req = await api.get("/user/@me")
                console.log(req.data.data)
                setLoading(false)
            } catch (error) {
                setError({
                    title: "User",
                    subtitle: error.response.data.errors[0].title,
                    detail: error.response.data.errors[0].detail
                })
                setLoading(false)
            }
        }
        getUser()
    }, [])

    if(loading) {
        return <Loading />
    } else {
        return (
            <Base>
                asd
            </Base>
        )
    }
}

export default Profile