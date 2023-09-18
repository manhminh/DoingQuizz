import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, dataModal } = props;

    const handleClose = () => setShow(false);
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
                    <Modal.Title>Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: <b>{dataModal.countTotal}</b></div>
                    <div>Correct Answer: <b>{dataModal.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        Show Answers
                    </Button>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalResult;