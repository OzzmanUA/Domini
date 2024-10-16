import React, { useState, useEffect } from 'react';
import './chat-style.css';
import chatData from './chatData.json';
import avatar1 from './images/demo_user_1.png';
import file_logo from './images/file_logo.png';
import emoji_logo from './images/emoji_logo.png';
import send_logo from './images/send_logo.png';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojis, setShowEmojis] = useState(false); // Для отображения панели эмодзи
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredChats, setFilteredChats] = useState([]);

    const emojiList = ['😊', '😂', '😍', '😒', '😭', '😡', '👍', '🙏', '🤔', '🤩'];

    useEffect(() => {
        setMessages(chatData);
        setFilteredChats(chatData);
    }, []);

    const handleUserSelect = (index) => {
        setSelectedChat(index);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [...messages];
            updatedMessages[selectedChat].messages.push({
                text: newMessage,
                time: new Date().toLocaleTimeString().slice(0, 5),
                isUser: true,
            });
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    const handleSendFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedMessages = [...messages];
            updatedMessages[selectedChat].messages.push({
                text: `Файл: ${file.name}`,
                time: new Date().toLocaleTimeString().slice(0, 5),
                isUser: true,
            });
            setMessages(updatedMessages);
        }
    };

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = messages.filter((chat) =>
            chat.name.toLowerCase().includes(search)
        );
        setFilteredChats(filtered);
    };

    const addEmoji = (emoji) => {
        setNewMessage(newMessage + emoji);
    };

    return (
    <div className="all-chat">
        <h2 className="all-messages">Усі повідомлення</h2>
        <div className="chat-container">
            <div className="sidebar">
                <input
                    type="text"
                    placeholder="Пошук"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <ul>
                    {filteredChats.map((chat, index) => (
                        <li key={index} onClick={() => handleUserSelect(index)}>
                            <img src={avatar1} alt={chat.name} className="avatar" />
                            <div className="user-info">
                                <div className="user-info-top">
                                <p className="user-name">{chat.name}</p>
                                <p className="user-last-time-message">9:20</p>
                                </div>
                                <p className="user-last-message">{chat.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {messages[selectedChat] && (
                <div className="chat-window">
                    <div className="chat-header">
                        <img src={avatar1} alt={messages[selectedChat].name} className="avatar" />
                        <div className="user-status">
                            <h2>{messages[selectedChat].name}</h2>
                            <p>В мережі</p>
                        </div>
                    </div>
                    <div className="chat-messages">
                        {messages[selectedChat].messages.map((message, index) => (
                            <div key={index} className={`message ${message.isUser ? 'user-message' : 'contact-message'}`}>
                                <p>{message.text}</p>
                                <span className="message-time">{message.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                    <button onClick={() => document.getElementById('fileInput').click()}><img src={file_logo}/></button>
                        <input
                            type="text"
                            placeholder="Написати повідомлення..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleSendFile}
                        />
                        <button onClick={() => setShowEmojis(!showEmojis)}><img src={emoji_logo}/></button>
                        <button onClick={handleSendMessage}><img src={send_logo}/></button>
                    </div>

                    {/* Панель с эмодзи */}
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

            {messages[selectedChat] && (
                <div className="order-info">
                    <h3>Про {messages[selectedChat].name}</h3>
                    <p>{messages[selectedChat].about}</p>
                    <div className="deadline">
                        <p>Крайній термін:</p>
                        <p>
                            {messages[selectedChat].deadline.day} / {messages[selectedChat].deadline.month} / {messages[selectedChat].deadline.year} о{' '}
                            {messages[selectedChat].deadline.time}
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};

export default Chat;
