import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import AdminTab from './AdminTab'
import { orderApi } from '../misc/OrderApi'
import { handleLogError } from '../misc/Helpers'

function AdminPage() {
    const Auth = useAuth()
    const user = Auth.getUser()

    const [users, setUsers] = useState([])
    const [userUsernameSearch, setUserUsernameSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const [isUsersLoading, setIsUsersLoading] = useState(false)

    useEffect(() => {
        setIsAdmin(user.data.rol[0] === 'ADMIN')
    }, [])

    const handleInputChange = (e, { name, value }) => {
        if (name === 'userUsernameSearch') {
            setUserUsernameSearch(value)
        }
        // else if (name === 'orderDescription') {
        //     setOrderDescription(value)
        // } else if (name === 'orderTextSearch') {
        //     setOrderTextSearch(value)
        // }
    }

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    return (
        <Container>
            <AdminTab
                isUsersLoading={isUsersLoading}
                users={users}
                userUsernameSearch={userUsernameSearch}
                handleInputChange={handleInputChange}
            />
        </Container>
    )
}

export default AdminPage