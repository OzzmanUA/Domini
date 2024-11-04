import React, { useState, useEffect } from 'react';
import { getConversations, getConversation, sendMessage } from '../utils/ApiFunctions';
import './chat-style.css';
import avatar1 from './images/demo_user_1.png';
import file_logo from './images/file_logo.png';
import emoji_logo from './images/emoji_logo.png';
import send_logo from './images/send_logo.png';
import question_logo from './images/question_logo.png';
import support_logo from './images/support_logo.png';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/ApiFunctions';

const ChatPage = () => {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId'); // Assuming you store logged-in user's ID in localStorage
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null); // Selected user conversation
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredChats, setFilteredChats] = useState([]);
    const navigate = useNavigate();

    const emojiList = ['😊', '😂', '😍', '😒', '😭', '😡', '👍', '🙏', '🤔', '🤩'];

    // Fetch all conversations when the component loads
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conversationList = await getConversations(token);
                console.log(conversationList)
                setConversations(conversationList);
                setFilteredChats(conversationList);
            } catch (error) {
                console.error('Error loading conversations:', error);
            }
        };

        fetchConversations();
    }, [token]);

    // Fetch selected conversation messages
    const fetchConversation = async () => {
        if (selectedChat) {
            try {
                console.log(selectedChat)
                console.log(selectedChat.id)
                const conversationData = await getConversation(selectedChat.id, token);
                setMessages(conversationData);
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        }
    };

    // Refetch conversation messages whenever a new chat is selected or updated
    useEffect(() => {
        fetchConversation();
    }, [selectedChat, token]);

    // Polling for conversation updates every 5 seconds
    useEffect(() => {
        if (selectedChat) {
            const intervalId = setInterval(() => {
                fetchConversation();
            }, 5000); // Fetch messages every 5 seconds

            return () => clearInterval(intervalId); // Clean up the interval on unmount
        }
    }, [selectedChat, token]); // Only start polling when a chat is selected

    const handleUserSelect = (chat) => {
        setSelectedChat(chat); // Select chat when a user is clicked
    };

    const handleProposeWorkClick = () => {
        navigate(`/OrderP/${selectedChat.id}`);  // Navigate to create-task-for-worker page with workerId
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !selectedChat) return; // Check if there's a message and a selected chat

        try {
            const messageContent = newMessage.trim(); // Clean up the message content
            const newMsg = await sendMessage(selectedChat.id, messageContent, token); // Send message as a string
            setMessages((prev) => [...prev, newMsg]); // Add new message to messages
            setNewMessage(''); // Clear input field

            // Refetch conversation messages after sending a new message
            fetchConversation(); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSendFile = (e) => {
        const file = e.target.files[0];
        if (file && selectedChat) {
            const fileMessage = `File: ${file.name}`; // Create a string that represents the file being sent
            try {
                const newMsg = {
                    content: fileMessage,
                    senderId: currentUserId, // Assuming currentUserId is the ID of the sender
                    timestamp: new Date().toISOString() // Store the timestamp when the file is sent
                };
                setMessages((prev) => [...prev, newMsg]); // Add the file message as a string
            } catch (error) {
                console.error('Error sending file:', error);
            }
        }
    };

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = conversations.filter((chat) =>
            chat.recipientName.toLowerCase().includes(search)
        );
        setFilteredChats(filtered);
    };

    const addEmoji = (emoji) => {
        setNewMessage(newMessage + emoji);
    };

    return (
        <div className="all-chat">
            <h2 className="all-messages">All Conversations</h2>
            <div className="chat-container">
                <div className="sidebar">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <ul>
                        {filteredChats.map((chat, index) => (
                            <li key={index} onClick={() => handleUserSelect(chat)}>
                                <img src={(`${api.defaults.baseURL}${chat.avatarUrl}`)} alt={chat.lastName} className="avatar" />
                                <div className="user-info">
                                    <div className="user-info-top">
                                        <p className="user-name">{chat.firstName} {chat.lastName}</p>
                                        <p className="user-last-time-message"></p>
                                    </div>
                                    <p className="user-last-message">{chat.lastMessage}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedChat && (
                    <div className="chat-window">
                        <div className="chat-header">
                            <img src={(`${api.defaults.baseURL}${selectedChat.avatarUrl}`)} alt={selectedChat.lastName} className="avatar" />
                            <div className="user-status">
                                <h2>{selectedChat.firstName} {selectedChat.lastName}</h2>
                                <p>Online</p>
                            </div>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.senderId === currentUserId ? 'user-message' : 'contact-message'}`}>
                                    <p>{msg.content}</p>
                                    <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input">
                            <button onClick={() => document.getElementById('fileInput').click()}><img src={file_logo} alt="Attach file" /></button>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleSendFile}
                            />
                            <button onClick={() => setShowEmojis(!showEmojis)}><img src={emoji_logo} alt="Emojis" /></button>
                            <button onClick={handleSendMessage}><img src={send_logo} alt="Send" /></button>
                        </div>

                        {showEmojis && (
                            <div className="emoji-picker">
                                {emojiList.map((emoji, index) => (
                                    <span key={index} onClick={() => addEmoji(emoji)} className="emoji">
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {selectedChat && (
                    <div className="order-info">

                        <p className="user-info-about">{selectedChat.about}</p>
                        <div className="button-make-order-block">
                            <button onClick={handleProposeWorkClick} className="make-order">Make an Order</button>
                        </div>
                        <div className="support-block">
                            <div className="support-block-item">
                                <img src={question_logo} alt="FAQ" />
                                <a href="#"><p>FAQ</p></a>
                            </div>
                            <div className="support-block-item">
                                <img src={support_logo} alt="Support" />
                                <a href="#"><p>Support Center</p></a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;



