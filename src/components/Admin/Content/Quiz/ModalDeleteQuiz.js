import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListQuiz();
        } else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='l'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you confirm to delete this quiz. id =
                    <b>{dataDelete?.id}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;