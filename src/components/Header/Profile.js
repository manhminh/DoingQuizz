import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { getHistory, postChangePassword, postUpdateProfile } from '../../services/apiServices';
import Button from 'react-bootstrap/Button';
import History from './History';
import { toast } from 'react-toastify';
import { FcPlus } from 'react-icons/fc';

const Profile = (props) => {
    const { show, setShow, account } = props;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
    }

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0])
        }
    }

    const handleSaveNewPassword = async () => {
        if (!currentPassword || !newPassword) {
            toast.error('Not empty input');
            return;
        }
        let res = await postChangePassword(currentPassword, newPassword);
        if (res && res.EC === 0) {
            setCurrentPassword('');
            setNewPassword('');
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    const handleSaveProfile = async () => {
        if (!username || !image) {
            toast.error('Not empty input');
            return;
        }
        let res = await postUpdateProfile(username, image);
        if (res && res.EC === 0) {
            setUsername("");
            setImage("");
            setPreviewImage("");
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title="Main infor">
                            <div className="col-md-6">
                                <label className="form-label" >Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="col-12 mt-4">
                                <label className='form-label label-upload' htmlFor='labelUpload'>
                                    <FcPlus />
                                    <span>Upload File Image</span>
                                </label>
                                <input
                                    type='file'
                                    hidden
                                    id='labelUpload'
                                    onChange={(e) => handleUploadImage(e)}
                                />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage
                                    ? <img src={previewImage} alt="" />
                                    : <span>Preview Image</span>
                                }
                            </div>

                            <Button className='mt-4' variant="primary" onClick={() => handleSaveProfile()}>
                                Save Profile
                            </Button>
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <div className="col-md-3">
                                <label className="form-label" >Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label" >New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <Button className='mt-4' variant="primary" onClick={() => handleSaveNewPassword()}>
                                Save
                            </Button>
                        </Tab>
                        <Tab eventKey="history" title="History" >
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile;