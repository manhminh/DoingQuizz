import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash'

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateUser();
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //update state
            console.log(dataView);
            dataView.email ? setEmail(dataView.email) : setEmail("");
            dataView.password ? setPassword(dataView.password) : setPassword("");
            dataView.username ? setUsername(dataView.username) : setUsername("");
            dataView.role ? setRole(dataView.role) : setRole("USER")
            dataView.image ? setPreviewImage(`data:image/jpeg;base64,${dataView.image}`) : setPreviewImage("");
        }
    }, [dataView])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0])
        }
    }

    const handleSubmitUpdateUser = async () => {
        // validate

        let data = await putUpdateUser(dataView.id, username, role, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsers();
        } else {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" >Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" >Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled={true}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                disabled={true}
                                onChange={(e) => { setRole(e.target.value) }}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />
                                <span>Upload File Image</span>
                            </label>
                            <input
                                type='file'
                                hidden
                                disabled={true}
                                id='labelUpload'
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {dataView
                                ? <img src={previewImage} alt="" />
                                : <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;