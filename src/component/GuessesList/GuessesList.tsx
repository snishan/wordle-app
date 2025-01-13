import React from 'react';
import { Row, Col } from 'antd';
import { InputTypes } from '../../helper/types/types';
import './styles.scss'


interface GuessesListProps {
  guessesList: InputTypes[][];
}

const GuessesList: React.FC<GuessesListProps> = ({ guessesList }) => {
  return (
    <div className="guesses-container">
      {guessesList?.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="guess-row" align="middle" gutter={[8, 16]}>
          <Col className="guess-number">
            {rowIndex + 1}.
          </Col>
          {row.map((cell:InputTypes, colIndex:number) => (
            <Col key={`cell-${rowIndex}-${colIndex}`}>
              <div
                className={`guess-cell ${cell.isRightLetterAndRightPosition ? 'green' :cell.isRightLetterAndWrongPosition?'yellow': 'filled'}`}
              >
                {cell.letter}
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default GuessesList;