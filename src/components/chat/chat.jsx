import React, { useState, useEffect } from 'react';
import './chat-style.css';
import chatData from './chatData.json';
import avatar1 from './images/demo_user_1.png';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Для поиска чатов
    const [filteredChats, setFilteredChats] = useState([]); // Отфильтрованные чаты

    useEffect(() => {
        setMessages(chatData);
        setFilteredChats(chatData); // Изначально все чаты
    }, []);

    // Обработчик выбора чата
    const handleUserSelect = (index) => {
        setSelectedChat(index);
    };

    // Отправка сообщения
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

    // Отправка файла (функция-заглушка)
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

    // Поиск чатов по имени
    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = messages.filter((chat) =>
            chat.name.toLowerCase().includes(search)
        );
        setFilteredChats(filtered);
    };

    return (
        <div className="chat-container">
            {/* Боковая панель с чатом */}
            <div className="sidebar">
                <input
                    type="text"
                    placeholder="Пошук"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch} // Поиск по имени
                />
                <ul>
                    {filteredChats.map((chat, index) => (
                        <li key={index} onClick={() => handleUserSelect(index)}>
                            <img src={avatar1} alt={chat.name} className="avatar" />
                            <div className="user-info">
                                <p className="user-name">{chat.name}</p>
                                <p className="user-last-message">{chat.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Окно чата */}
            {messages[selectedChat] && (
                <div className="chat-window">
                    <div className="chat-header">
                        <img
                            src={avatar1}
                            alt={messages[selectedChat].name}
                            className="avatar"
                        />
                        <h2>{messages[selectedChat].name}</h2>
                    </div>
                    <div className="chat-messages">
                        {messages[selectedChat].messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.isUser ? 'user-message' : 'contact-message'
                                }`}
                            >
                                <p>{message.text}</p>
                                <span className="message-time">{message.time}</span>
                            </div>
                        ))}
                    </div>

                    {/* Ввод нового сообщения и кнопки для файлов и смайликов */}
                    <div className="chat-input">
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
                        <button
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            📎 Файл
                        </button>
                        <button onClick={() => setNewMessage(newMessage + '😊')}>
                            😀 Смайлики
                        </button>
                        <button onClick={handleSendMessage}>Відправити</button>
                    </div>
                </div>
            )}

            {/* Информация о заказе */}
            {messages[selectedChat] && (
                <div className="order-info">
                    <h3>Про {messages[selectedChat].name}</h3>
                    <p>{messages[selectedChat].about}</p>
                    <div className="deadline">
                        <p>Крайній термін:</p>
                        <p>
                            {messages[selectedChat].deadline.day} /{' '}
                            {messages[selectedChat].deadline.month} /{' '}
                            {messages[selectedChat].deadline.year} о{' '}
                            {messages[selectedChat].deadline.time}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
