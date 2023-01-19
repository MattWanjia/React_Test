import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button
  } from '@chakra-ui/react'


export default function Person() {
    const id = useParams();
    const [person, setPerson] = useState({
        name: "",
        email: "",
        occupation: "",
        bio: ""
    })
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        //console.log(id)
        fetchUser()
    },[])

    const fetchUser = () => {
        axios.get(`https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/user/${id.id}`)
        .then(res => {
            console.log(res)
            setPerson({
                name: res.data.name,
                email: res.data.email,
                occupation: res.data.occupation,
                bio: res.data.bio
            })
            setLoading(false)            
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleNameChange = (e) => {
        setPerson({
            ...person, name: e.target.value
        })
    }

    const handleEmailChange = (e) => {
        setPerson({
            ...person, email: e.target.value
        })
    }

    const handleOccupationChange = (e) => {
        setPerson({
            ...person, occupation: e.target.value
        })
    }

    const handleBioChange = (e) => {
        setPerson({
            ...person, bio: e.target.value
        })
    }

    const saveUserDetails = () => {
        axios.patch(`https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/user/${id.id}`, person)
        .then((res) => {
            onClose()
        })
        .catch((err) => console.log(err))
    }

  return (
    <div class='w-full h-full flex flex-col justify-center items-center'>
        {!loading && <div class='w-auto h-auto p-5 rounded-lg border-2 border-white flex flex-col space-y-4'>
            <div class='w-full flex flex-row space-x-4'>
                <p class='text-white'>NAME:</p>
                <p class='text-white'>{person.name}</p>
            </div>
            <div class='w-full flex flex-row space-x-4'>
                <p class='text-white'>EMAIL:</p>
                <a class='text-blue-500' href={`mailto:${person.email}`}>{person.email}</a>
            </div>
            <div class='w-full flex flex-row space-x-4'>
                <p class='text-white'>OCCUPATION:</p>
                <p class='text-white'>{person.occupation}</p>
            </div>
            <div class='w-full flex flex-row space-x-4'>
                <p class='text-white'>BIO:</p>
                <p class='text-white'>{person.bio}</p>
            </div>
            <div class='w-full flex justify-center'>
                <button class='w-1/2 bg-blue-500 p-2 rounded-lg' onClick={onOpen}>EDIT</button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <div class='w-full flex justify-center'>
                        <p>EDIT USER</p>
                    </div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div class='w-full h-auto flex flex-col space-y-3'>
                        <input class='border-2 border-grey-200 rounded-md w-full p-1' value={person.name} onChange={(e) => handleNameChange(e)} placeholder='Name' type={'text'}></input>
                        <input class='border-2 border-grey-200 rounded-md w-full p-1' value={person.email} onChange={(e) => handleEmailChange(e)} placeholder='Email' type={'email'}></input>
                        <input class='border-2 border-grey-200 rounded-md w-full p-1' value={person.occupation} onChange={(e) => handleOccupationChange(e)} placeholder='Occupation' type={'text'}></input>
                        <input class='border-2 border-grey-200 rounded-md w-full p-1' value={person.bio} onChange={(e) => handleBioChange(e)} placeholder='Bio...' type={'text'}></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div class='w-full flex flex-row justify-around'>
                        <Button colorScheme='green' mr={3} onClick={saveUserDetails}>Save</Button>
                        <Button colorScheme='red' mr={3} onClick={onClose}>Close</Button>
                    </div>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>}
    </div>
  )
}
