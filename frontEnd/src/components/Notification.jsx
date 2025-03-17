import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useEffect, useState } from 'react';
import { getNotifications, updateNotification } from '../services/notificationService';
import { replace, useNavigate } from 'react-router-dom';

function Notification({userLoggedIn = null}) {

    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(null);
    useEffect(() => {
        const FetchNotifications = async () => {
            const NotificationsFound = await getNotifications(userLoggedIn);
            setNotifications(NotificationsFound.data);
        }
        FetchNotifications();

    },[userLoggedIn]);

    const handleCheckNotification = async (notification) => {

        const NotificationUpdated = await updateNotification(notification.NotificationId, !notification.Status);

        if(NotificationUpdated.status)
            navigate(`/Post/${notification.PostId}`);

        setNotifications(notifications.filter(n => n.NotificationId !== notification.NotificationId));
    }

    return (
        <div className='relative'>
        {notifications?.length > 0 &&
            <div className='absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary rounded-full'>
                <p className='text-xs'>{notifications.length}</p>
            </div>
        }
            <Popover>
                <PopoverButton>
                    <NotificationsOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]' />
                </PopoverButton>
                {notifications?.length > 0 &&
                <PopoverPanel className="absolute right-0 w-60 h-auto bg-[var(--background-color)] shadow-sm border-2 border-solid border-[var(--primary-color)] rounded-sm p-2 z-50 text-xs flex flex-col space-y-1">
                    {notifications && notifications.map(notification => (
                        <div 
                            className="flex flex-wrap items-center cursor-pointer text-[var(--text-color)] hover:bg-[var(--hover-color)] p-1 rounded-sm"
                            onClick={() => handleCheckNotification(notification)} 
                            key={notification.NotificationId}
                        >
                            <span className='font-bold mr-1'>{notification.emitter.Username}</span>
                            <span className="whitespace-nowrap mr-1">{notification.Matter} on</span>
                            <span className='font-bold whitespace-nowrap'>{notification.posts.Post_Name}</span>
                        </div>
                    ))}
                </PopoverPanel>
                }
            </Popover>
        </div>
    );
}

export default Notification;