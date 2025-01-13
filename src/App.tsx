import { useState, useCallback, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Row, Col, Input, message, Spin } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { InputTypes } from './helper/types/types';
import { AssignValues, getRandomWord, loadWordsSync, checkWord } from './helper/commonFunctions';
import VirtualKeyboard from './component/VirtualKeyboard/VirtualKeyboard';
import initialDataList from './helper/data/dataList.json';
import GuessesList from './component/GuessesList/GuessesList';
import CommonModal from './component/CommonModal/CommonModal';
import UserIntroduction from './component/UserIntroduction/UserIntroduction';
import Logo from '../src/assets/images/logo.png'
import '../src/assets/scss/app.scss';

function App() {
  const [keyboardValue, setKeyboardValue] = useState<InputTypes[]>(initialDataList.initialData);
  const [guessesList, setGuessesList] = useState<InputTypes[][]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWonState, setIsWonState] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(false)

  useEffect(() => {
    const initializeWords = async () => {
      const wordList = await loadWordsSync();
      setWords(wordList);
      setIsLoading(false);
      startNewGame(wordList)
    };
    initializeWords();
  }, []);

  const startNewGame = async (dataList: string[]) => {
    const word = await getRandomWord(dataList);
    setCurrentWord(word);
  };

  const handleKeyboardInput = useCallback((value: string) => {
    if (value == '') {
      setKeyboardValue(() => initialDataList.initialData);
    }
    setKeyboardValue(prevState => AssignValues(value, prevState));
  }, []);


  const handleEnter = async () => {

    if (keyboardValue.find((data) => data.letter == '')) {
      warning();
      return;
    }
    const result = await checkWord(currentWord, keyboardValue);

    if (result.filter((data) => data.isRightLetterAndRightPosition).length == 5) {
      setIsModalVisible(true)
      setIsWonState(true)
    } else if (guessesList.length == 4) {
      setIsModalVisible(true)
      setIsWonState(false)
    }

    setGuessesList(prevState => [...prevState, result]);
    setTimeout(() => {
      handleKeyboardInput('')
    }, 100);
  };

  const handleBackspace = useCallback((data: string) => {
    setKeyboardValue(AssignValues(data, keyboardValue));
  }, []);

  const handleNewGame = () => {
    startNewGame(words)
    handleKeyboardInput('')
    setGuessesList([])
    setIsModalVisible(false)
  }

  const warning = () => {
    message.warning({
      type: 'warning',
      content: 'Word should includes five letters',
    });
  };

  return (
    isLoading ? <Spin tip="Loading" className='main-loader' size="large">
      {"Loading.."}
    </Spin> :

      <div className="main-page">
        <Row justify="center" className="right-side">
          <Col sm={1}>
            <img src={Logo} className='logo-image' alt='logo' />
          </Col>
          <Col sm={isEmpty(guessesList)?22:15}>
            <Row justify="center" gutter={16} className="input-section">
              {keyboardValue.map((value, index) => (
                <Input key={index} value={value.letter} readOnly />
              ))}
            </Row>
            <Row className="mt-8">
              <VirtualKeyboard
                onInputChange={handleKeyboardInput}
                onBackspace={handleBackspace}
                onEnter={handleEnter}
                clearAll={handleNewGame}
              />
            </Row>
          </Col>
          <Col sm={isEmpty(guessesList)?1:8}>
            <InfoCircleTwoTone onClick={() => setShowIntro(true)} className='information-icon' twoToneColor="#1890ff" />
             <Row justify="center" gutter={16} className="details-section mt-8">
              <Col span={24} className="text-center text-gray-600">
                <GuessesList guessesList={guessesList} />
              </Col>
            </Row>
          </Col>

        </Row>
        <CommonModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          message={isWonState ? "Congratulations!" : "You are lost!"}
          subMessage={isWonState ? "You won the game!" : `Correct word is: ${currentWord}`}
          onNewGame={() => handleNewGame()}
          isWonState={isWonState}
        />
        <UserIntroduction showIntro={showIntro} handleCloseInfo={() => setShowIntro(false)} />
      </div>
  );
}

export default App;