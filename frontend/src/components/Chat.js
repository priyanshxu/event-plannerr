import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT); // Ensure to set this in your .env file

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser ] = useState('');

    // Fetch initial messages from the server (if applicable)
    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/chat'); // Adjust the endpoint as necessary
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Send message to the server
    const sendMessage = (e) => {
        e.preventDefault();
        if (message && user) {
            const newMessage = { user, message };
            socket.emit('sendMessage', newMessage);
            setMessage(''); // Clear input after sending
        }
    };

    // Listen for incoming messages
    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Fetch messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="chat-container">
            <h2>Chat Room</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="chat-form">
                <input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser (e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;