import React, {useState, useEffect, useRef } from 'react'
import './UserList.css'


export const UserList = () => {
    const [users, setUsers] = useState(null)
    const [timer, setTimer] = useState('')
    const [currentFetch, setFetch] = useState(null)

    useEffect(() => {
        setFetch(null);
        let controller = null;
        const interval = setInterval(() => {
            setTimer('fired')
            setTimeout(() => setTimer(''), 300)
            if (controller) return;
            controller = new AbortController();
            const { signal } = controller;
            setUsers(null)
            setFetch(fetch('http://localhost:4000/users', { signal })
                .then(res => res.json())
                .then(users => {
                    setFetch(null);
                    controller = null;
                    setUsers(users)
                })
                .catch(console.log))
        }, 2000)

        return () => {
            clearInterval(interval)
            if (currentFetch) {
                controller.abort()
            }
        }

    }, [])
    return (
        <div className={'container'}>
        <div className={`timer ${timer}`}>Таймер сработал</div>
        <div className={`fetch ${currentFetch ? 'fetchFired' : ''}`}>Идет загрузка...</div>
        <ul >{users && users.map(({name, email}, ind) => <li className={'item'} key={ind}>
            <span>{`Name:: ${name}`}</span><br/>
            <span>{`Email:: ${email}`}</span>
        </li>)}
        </ul>
        </div>
    )
}
