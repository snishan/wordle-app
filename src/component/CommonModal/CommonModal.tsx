import React from 'react';
import { Modal } from 'antd';
import './styles.scss';
import Confetti from 'react-confetti'

interface CommonModalProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
  subMessage?: string;
  onNewGame:()=>void;
  isWonState:boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({ isVisible, onClose, message, subMessage,onNewGame,isWonState }) => {
  return (
    <Modal
    visible={isVisible}
    onCancel={onClose}
    footer={null}
    centered
    className={`result-modal ${isWonState ? 'win-state' : 'lose-state'}`}
    closable={false}
  >
    <div className="modal-content">
      {isWonState && (
         <Confetti/>
      )}
      <div className="result-icon">
        {isWonState ? (
          <div className="congratulation-icon">🎉</div>
        ) : (
            <>
             <div className="lost-icon">😔</div>
            </>
        )}
      </div>
      
      <h2 className="result-title">{message}</h2>
      <p className="result-message">{subMessage}</p>
      
      <button 
        className={`close-button ${isWonState ? 'win-button' : 'lose-button'}`} 
        onClick={onNewGame}
      >
        {isWonState ? 'New Game' : 'Try Again'}
      </button>
    </div>
  </Modal>
  );
};

export default CommonModal;