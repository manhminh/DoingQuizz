import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from 'react-icons/fc';
import TableUserPaginate from "./TableUserPaginate";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleClickBtnView = (user) => {
        setDataView(user);
        setShowModalViewUser(true);
    }

    const handleClickBtnUpdate = (user) => {
        setDataUpdate(user);
        setShowModalUpdateUser(true);
    }

    const handleClickBtnDelete = (user) => {
        setDataDelete(user);
        setShowModalDeleteUser(true);
    }

    //componentDidmount
    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            console.log('check data', res.DT);
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const resetUpdateUser = () => {
        setDataUpdate({})
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-success" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />
                        Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUserPaginate
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        listUsers={listUsers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsersWithPaginate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchListUsers={fetchListUsers}
                    dataUpdate={dataUpdate}
                    resetUpdateUser={resetUpdateUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalViewUser
                    dataView={dataView}
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    resetUpdateUser={resetUpdateUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUsers={fetchListUsers}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;