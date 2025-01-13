import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ClearOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import { KeyType } from '../../helper/types/types';
import './styles.scss';

interface VirtualKeyboardProps {
  onInputChange: (value: string) => void;
  onBackspace:(value: string) => void;
  onEnter:(value: string) => void;
  clearAll:() => void;
}



const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onInputChange,onBackspace,onEnter,clearAll }) => {
  const [inputValue, setInputValue] = useState<string>('');
  
  const keyboardLayout: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  useEffect(() => {
    onInputChange(inputValue);
  }, [inputValue, onInputChange]);

  const handleKeyClick = (key: KeyType): void => {

    switch (key) {
      case 'Remove':
        setInputValue(prev => prev.slice(0, -1));
        onBackspace(inputValue.slice(0, -1));
        break;
      case 'Enter':
        onEnter(inputValue)
        setInputValue('')
        break;
      case 'Clear':
        clearAll()
        setInputValue('')
        break;
      default:
        setInputValue(prev => prev + key);
    }
  };

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-container">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <Button
                key={key}
                className="key-button"
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
        
        <div className="keyboard-row action-row">
        <Button
          className="action-button enter-button"
          onClick={() => handleKeyClick('Enter')}
          icon={<SendOutlined />}
        >
          Enter
        </Button>
        <Button
          className="action-button remove-button"
          onClick={() => handleKeyClick('Remove')}
          icon={<DeleteOutlined />}
        >
          Remove
        </Button>
        <Button
          className="action-button clear-button"
          onClick={() => handleKeyClick('Clear')}
          icon={<ClearOutlined />}
        >
          Clear All
        </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;