'use client'
import React, { useState } from 'react';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons';

const Chatbox = () => {
    const initialChat = { 
        name: "Dr. Mensah T.", 
        imageUrl: "https://img.freepik.com/premium-photo/tablet-black-man-portrait-doctor-healthcare-services-telehealth-analysis-hospital-network-young-medical-professional-digital-technology-clinic-research-consulting-planning_590464-213559.jpg"
    };
    
    const initialMessages = [
        {
            type: 'sent',
            file: 'https://illinoisderm.com/wp-content/uploads/2021/11/Skin-Cancer-Square-1-450x475.jpg',  // Example image URL
            text: 'Dear Dr. Mensah T,\n\nI have uploaded a picture of my mole below. Could you \nplease take a look and let me know what you think? \n\nThanks,\nAlex' 
        },
        {   
            type: 'received',
            text: "Hello Alex,\n\nAt first look, your mole has some irregularities in shape and color,\n which should be monitored closely. I recommend scheduling an\n in-person evaluation within the next 2 weeks to ensure everything\n is thoroughly assessed. Please reach out if you have any more\n questions or concerns.\n\nBest regards,\nDr. Mensah T."
        }
    ];
    

    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState('');
    const [currentChat, setCurrentChat] = useState(initialChat);
    const [showChatList, setShowChatList] = useState(false);

    const chatList = [
        initialChat,  // Reusing the same object to ensure consistency
        { name: "Dr. Bellamy N.", imageUrl: "https://media.istockphoto.com/id/138205019/photo/happy-healthcare-practitioner.jpg?s=612x612&w=0&k=20&c=b8kUyVtmZeW8MeLHcDsJfqqF0XiFBjq6tgBQZC7G0f0=" },
        { name: "Dr. Sasha Y.", imageUrl: "https://c8.alamy.com/comp/2BE42N7/smiling-asian-female-doctor-in-white-coat-2BE42N7.jpg" }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            setMessages([...messages, { text: message, type: 'sent' }]);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();  // Prevents the default action of submitting the form
            handleSendMessage(e);
        }
    };

    const selectChat = (chat) => {
        setCurrentChat(chat);
        setShowChatList(false);
        setMessages([{ text: `Starting chat with ${chat.name}`, type: 'received' }]);
    };

    const toggleChatList = () => {
        setShowChatList(!showChatList);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newMessage = {
                type: 'sent',
                file: URL.createObjectURL(file),  // Creates a temporary URL to access the file
            };
            setMessages([...messages, newMessage]);
        }
    };

    // Update message rendering to convert \n to <br />
    // Function to convert \n to <br /> for display
const renderMessageText = text => {
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};


    return (
        <div className="container">
            <div className="chatbox">
                <div className="chat-header">
                    <div className="chat-title" onClick={toggleChatList}>
                        <img src={currentChat.imageUrl} alt={currentChat.name} className="chat-image" />
                        <span>{currentChat.name}</span>
                        {showChatList && (
                            <div className="dropdown-content">
                                {chatList.map((chat, index) => (
                                    <div key={index} className="dropdown-item" onClick={() => selectChat(chat)}>
                                        <img src={chat.imageUrl} alt={chat.name} className="chat-image" />
                                        <span>{chat.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="chat-actions">
                        <button className="icon-button">
                            <FontAwesomeIcon icon={faPhone} />
                        </button>
                        <button className="icon-button">
                            <FontAwesomeIcon icon={faVideo} />
                        </button>
                    </div>
                </div>
                <div className="chat-messages">
    {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`}>
            {msg.file ? (
                <div>
                    <p>{renderMessageText(msg.text)}</p>
                    <img src={msg.file} alt="attachment" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            ) : (
                <p>{renderMessageText(msg.text)}</p>
            )}
        </div>
    ))}
</div>

                <div className="chat-input">
                    <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileSelect} />
                    <button className="icon-button attachment-button" onClick={() => document.getElementById('file-input').click()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <input type="text" placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
