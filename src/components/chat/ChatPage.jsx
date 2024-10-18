import React, { useEffect, useState } from 'react';
import { getConversations, getConversation, sendMessage } from '../utils/ApiFunctions';
import { useAuth } from '../auth/AuthProvider';
import { useParams, Link } from 'react-router-dom';

const ChatPage = () => {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId'); // Assuming you store the logged-in user's ID in localStorage
    const { userId } = useParams(); // recipientId from the URL
    const [conversation, setConversation] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        const fetchConversation = async () => {
            try {

                const conversationData = await getConversation(userId, token);
                console.log(conversationData)
                setConversation(conversationData);
            } catch (error) {
                console.error('Error loading conversation:', error);
            }
        };

        if (userId) {
            fetchConversation();
        }
    }, [userId, token]);

    const handleSendMessage = async () => {
        if (messageContent.trim() === '') return;

        try {
            const newMessage = await sendMessage(userId, messageContent, token);
            setConversation((prev) => [...prev, newMessage]); // Add new message to conversation
            setMessageContent(''); // Clear the input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h1>{userId ? `Chat with User ${userId}` : 'Select a User to Chat'}</h1>
            {userId ? (
                <div>
                    <div className="conversation-history">
                        {conversation.length === 0 ? (
                            <p>No conversation yet. Start the conversation!</p>
                        ) : (
                            conversation.map((msg, index) => (
                                <div key={index} className="message">
                                    <p>
                                        <strong>
                                            {msg.senderId === parseInt(currentUserId) ? 'You' : msg.senderName}:
                                        </strong> 
                                        {msg.content}
                                    </p>
                                    <p>
                                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="message-input">
                        <input
                            type="text"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            ) : (
                <p>Please select a user to start chatting.</p>
            )}
            <Link to="/chat">Back to Conversations List</Link>
        </div>
    );
};

export default ChatPage;