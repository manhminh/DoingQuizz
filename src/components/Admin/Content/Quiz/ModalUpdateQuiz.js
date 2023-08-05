import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../services/apiServices';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setImage("");
        setType("EASY")
        props.resetUpdateQuiz();

    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            dataUpdate.name ? setName(dataUpdate.name) : setName("");
            dataUpdate.description ? setDescription(dataUpdate.description) : setDescription("");
            dataUpdate.difficulty ? setType(dataUpdate.difficulty) : setType("EASY")
            dataUpdate.image ? setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`) : setPreviewImage("");
        }
    }, [dataUpdate])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0])
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        // validate
        let data = await putUpdateQuiz(dataUpdate.id, description, name, type, image);
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListQuiz();
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
                    <Modal.Title>Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" >Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" >Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;