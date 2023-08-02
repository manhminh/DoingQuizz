import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import "./SideBar.scss"
import { Link } from 'react-router-dom';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <div>
            <>
                <ProSidebar
                    image={sidebarBg}
                    collapsed={collapsed}
                    toggled={toggled}
                    breakPoint="md"
                    onToggle={handleToggleSidebar}
                >
                    <SidebarHeader>
                        <div
                            style={{
                                padding: '24px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 16,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <DiReact fontSize={'3em'} color='00bfff' />
                            FPT
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <Menu iconShape="circle">
                            <MenuItem
                                icon={<MdDashboard />}
                                suffix={<span className="badge red">Main</span>}
                            >
                                Dashboard
                                <Link to="/admin" />
                            </MenuItem>
                        </Menu>
                        <Menu iconShape="circle">
                            <SubMenu
                                icon={<FaGem />}
                                title={"Features"}
                            >
                                <MenuItem>
                                    Quản lý Users
                                    <Link to="/admin/manage-users" />
                                </MenuItem>
                                <MenuItem> Quản lý Bài Quiz </MenuItem>
                                <MenuItem> Quản lý Câu Hỏi </MenuItem>
                            </SubMenu>

                        </Menu>
                    </SidebarContent>

                    <SidebarFooter style={{ textAlign: 'center' }}>
                        <div
                            className="sidebar-btn-wrapper"
                            style={{
                                padding: '20px 24px',
                            }}
                        >
                            <a
                                href="https://github.com/minhmanh"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer"
                            >
                                <FaGithub />
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    Minh Manh
                                </span>
                            </a>
                        </div>
                    </SidebarFooter>
                </ProSidebar>
            </>
        </div>
    )
}
export default SideBar