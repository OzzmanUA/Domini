import React, { useEffect, useState } from 'react';
import { getConversations } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const ConversationsList = () => {
    const token = localStorage.getItem('token');
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conversationList = await getConversations(token);
                setConversations(conversationList);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, [token]);

    return (
        <div>
            <h2>Your Conversations</h2>
            <ul>
                {conversations.length === 0 ? (
                    <p>No conversations yet.</p>
                ) : (
                    conversations.map((user) => (
                        <li key={user.id}>
                            <Link to={`/chat/${user.id}`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ConversationsList;