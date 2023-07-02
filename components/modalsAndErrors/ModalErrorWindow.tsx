import { useEffect, useRef } from 'react'
import Modal from 'react-modal'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
  errorMessage: string 
}
Modal.setAppElement('#__next')

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }: Props) => {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);
  
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999900,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      minWidth: '300px',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      onAfterOpen={() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }}
    >
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <h3 style={{ marginBottom: '10px' }}>
          Error
        </h3>
        <p style={{ textAlign: 'center' }}>
          {errorMessage}
        </p>
        <button onClick={onRequestClose} style={{ marginTop: '20px', padding: '5px 20px', cursor: 'pointer' }}
          ref={closeButtonRef}
        >
          OK
        </button>
      </div>
    </Modal>
  )
}

export default ErrorModal
