import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const Friend = (props) => {
    return (
        <div>{props.friend.name}</div>
    )
}





const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState({
        name: '',
        age: '',
        email: '',
    });

    useEffect(() => {
        axiosWithAuth().get('/api/friends')
            .then(res=>{
                console.log(res);
                setFriends(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleChange = (e) => {
        setNewFriend({
                ...newFriend,
                [e.target.name]: e.target.value
        })
        console.log(newFriend);
    }

    const submitHandler = e => {
        axiosWithAuth().post('/api/friends', newFriend)
            .then(res => {
                console.log('RESULTS', res);
                setNewFriend({name: '',
                age: '',
                email: '',})
            })
            .catch(err => {
                console.log('ERROR', err);
            })
    }

    return (
            <div>
                <h2>Add a New Friend:</h2>
                <form onSubmit={submitHandler}>
                    <input
                      type="text"
                      name="name"
                      value={newFriend.name}
                      onChange={handleChange}
                      placeholder='name'
                      />
                    <input
                      type="number"
                      name="age"
                      value={newFriend.age}
                      onChange={handleChange}
                      placeholder='age'
                      />
                    <input
                      type="email"
                      name="email"
                      value={newFriend.email}
                      onChange={handleChange}
                      placeholder='email'
                    />
                    <button>Submit</button>
                </form>    
            
            <h2>Friends list!</h2>
             {friends.map((friend) => {
                 return(
                     <Friend key={friend.id} friend={friend}/>
                 )
             })}
           </div>  
    )
}

export default FriendsList;