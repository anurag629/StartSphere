import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const FetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.Token) {
                    const response = await api.get('/user', {
                        headers: {
                            Authorization: `Bearer ${user.Token}`,
                        },
                    });
                    setUsers(response.data);
                }
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.Name} - {user.Email}</li>
                ))}
            </ul>
        </div>
    );
};

export default FetchUsers;
