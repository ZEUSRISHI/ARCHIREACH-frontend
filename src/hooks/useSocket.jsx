import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

// Create context for socket
const SocketContext = createContext(null);

// Socket server URL - change this to your server URL in production
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://archireach.onrender.com';

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const userUID = localStorage.getItem('userUID');

    useEffect(() => {
        // Only connect if user is logged in
        if (!userUID) {
            console.log('No userUID found, not connecting to socket');
            return;
        }

        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        const socket = socketRef.current;

        // Connection events
        socket.on('connect', () => {
            console.log('✅ Socket connected:', socket.id);
            setIsConnected(true);

            // Join user's room for targeted notifications
            socket.emit('join', userUID);
        });

        socket.on('disconnect', () => {
            console.log('❌ Socket disconnected');
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        // Handle incoming notifications
        socket.on('notification', (notification) => {
            console.log('📬 Notification received:', notification);

            // Add to notifications list
            setNotifications(prev => [notification, ...prev]);

            // Show toast notification
            const notificationTitle = notification.title || 'New Notification';
            const notificationMessage = notification.message || 'You have a new notification';

            toast.info(notificationMessage, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.emit('leave', userUID);
                // Prevent "WebSocket is closed before the connection is established"
                // by closing only if it was actually connected or waiting a bit before disconnect.
                if (socketRef.current.connected) {
                    socketRef.current.disconnect();
                } else {
                    // It might be in the process of connecting, let it finish or destroy it safely
                    socketRef.current.disconnect();
                }
            }
        };
    }, [userUID]);

    // Function to clear all notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    // Function to remove a specific notification
    const removeNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    // Function to get notification count
    const getNotificationCount = () => {
        return notifications.length;
    };

    const value = {
        socket: socketRef.current,
        isConnected,
        notifications,
        clearNotifications,
        removeNotification,
        getNotificationCount,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use socket
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export default useSocket;
