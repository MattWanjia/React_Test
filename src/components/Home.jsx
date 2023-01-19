import React, {useEffect, useState} from 'react'
import axios from 'axios';
import User from './User';

export default function Home() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        axios.get(`https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/users`)
        .then(res => {
            //console.log(res)
            setUsers(res.data)
            setLoading(false)            
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div class='w-full h-full text-3xl text-white flex p-4 '>
        <div class='w-full h-full flex place-items-center grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-y-auto'>
            {!loading && users.map(user => <User key={user.id} user={user}/>)}
        </div>
    </div>
  )
}
