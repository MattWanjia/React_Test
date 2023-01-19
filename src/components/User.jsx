import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function User({user}) {
    useEffect(() => {
        //console.log(user.name)
    })
    

  return (
    <Link class='w-2/3 h-64 rounded-lg bg-white' to={`/user/${user.id}`}>
        <div class='w-full h-full rounded-lg bg-white flex flex-col pt-4 p-2 space-y-3'>
            <div class='w-full flex justify-center font-bold'>
                <p class='text-black text-base'>{user.name}</p>
            </div>
            <a class='text-blue-500 text-xs' href={`mailto:${user.email}`}>{user.email}</a>
            <p class='text-black text-sm'>{user.occupation}</p>
            <p class='text-black text-base line-clamp-4 '>{user.bio}</p>
        </div>
    </Link>
  )
}
