import { Link, useNavigate } from "react-router-dom";
import NavStyle from "../Nav/Nav.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NotificationComponent from "../Notification/Notification";

const Nav = () => {
    const Profileid = useSelector((state) => state?.user?.loaduser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const { notification } = useSelector((state) => state.user);

    const handleLogout = async () => {
        setLoading(true);
        localStorage.removeItem('user');
        setLoading(false);
        navigate("/login");
    };

    const handleNotificationClick = () => {
        setSidebarVisible(true);
    };

    const handleCloseSidebar = () => {
        setSidebarVisible(false);
    };

    return (
        <div className={NavStyle.navContainer}>
            <Link className={NavStyle.logo} to={'/'}>Tal_To_Me</Link>

            <div className={NavStyle.profile}>
                {loading ? (
                    <Box display="flex" alignItems="center">
                        <CircularProgress size={24} />
                        <span style={{ marginLeft: '8px' }}>Logging out...</span>
                    </Box>
                ) : (
                    <>
                        <div className={NavStyle.notificationContainer}
                            onClick={handleNotificationClick}
                        >
                            <i
                                className="fa fa-bell"
                                aria-hidden="true"
                            ></i>
                            <span className={NavStyle.notificationCount}>{notification.length}</span>
                        </div>

                        <span className={NavStyle.navItem} onClick={handleLogout}>Logout</span>
                        <Link to={`/profile/${Profileid?._id}`} className={NavStyle.linkProfile}>
                            <img
                                src={Profileid?.userimage.url}
                                alt="Profile"
                                className={NavStyle.profilePic}
                            />
                        </Link>
                    </>
                )}
            </div>


            <div className={isSidebarVisible ? NavStyle.openside : NavStyle.closesid}>
                {isSidebarVisible && (
                    <>
                        <NotificationComponent onClose={handleCloseSidebar} />
                        <button className={NavStyle.sidebarCloseButton} onClick={handleCloseSidebar}>
                            ×
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Nav;
