import React, { useEffect, useState } from 'react';
import { Modal, Steps, Button, Card, Typography } from 'antd';
import { UserOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons';
import Img1 from '../../assets/images/game-img-01.png'
import Img2 from '../../assets/images/game-img-03.png'
import Img3 from '../../assets/images/game-img-04.png'
import Img4 from '../../assets/images/game-img-05.png'
import Img5 from '../../assets/images/game-img-06.png'
import './styles.scss';

const { Title, Paragraph } = Typography;

interface IntroProps{
  showIntro:boolean,
  handleCloseInfo:()=>void,
}

const UserIntroduction:React.FC<IntroProps>= ({showIntro,handleCloseInfo}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(()=>{
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro==null) {
      setIsVisible(true)
    }
  },[])

  useEffect(()=>{
    if (showIntro) {
      setIsVisible(showIntro)
    }
   
  },[showIntro])

  const steps = [
    {
      title: 'Welcome',
      icon: <UserOutlined />,
      content: {
        title: 'Welcome to Wordle!',
        description: 'We re excited to have you here. Let s get you started with a quick tour.',
        image: Img1
      }
    },
    {
      title: 'Playground',
      icon: <RocketOutlined />,
      content: {
        title: 'Your Personal Playground',
        description:
        <>
        <p>Guess the 5-letter hidden word!</p>
        <ul>
          <li>You have 5 attempts.</li>
          <li>Use the virtual keyboard to type your word.</li>
          <li>After entering all 5 letters, click "Enter" to see results.</li>
          <li>Use "Remove" to delete letters one at a time.</li>
        </ul>
        </> ,
        image: Img1
      }
    },
    {
      title: 'Complete',
      icon: <CheckCircleOutlined />,
      content: {
        title: 'Congratulations!',
        description: 
        <>
        <p>Here’s how the results work:</p>
        <ul>
          <li>Gray background: Letter is not in the correct word.</li>
          <img className='complete-option-images' src={Img2} alt=''/>
          <li>Yellow outline: Letter is in the word but in the wrong position.</li>
          <img className='complete-option-images' src={Img3} alt=''/>
          <li>Green highlight: Letter is in the correct word and the correct position</li>
          <img className='complete-option-images' src={Img4} alt=''/>
        </ul>
        </>,
        image: Img5
      }
    }
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenIntro', 'true')
    setIsVisible(false);
    handleCloseInfo()
  };

  return (
    <Modal
      visible={isVisible}
      footer={null}
      onCancel={handleClose}
      width={800}
      className="user-intro-modal"
      maskClosable={false}
    >
      <div className="intro-container">
        <Steps 
          current={currentStep} 
          items={steps}
          className="intro-steps"
        />
        
        <Card className="intro-content">
          <img 
            src={steps[currentStep].content.image} 
            alt={steps[currentStep].title}
            className="intro-image"
          />
          
          <Title level={3} className="intro-title">
            {steps[currentStep].content.title}
          </Title>
          
          <Paragraph className="intro-description">
            {steps[currentStep].content.description}
          </Paragraph>
        </Card>

        <div className="intro-footer">
          <Button 
            onClick={handleClose}
            className="skip-button"
          >
            Skip Tour
          </Button>
          <div className="navigation-buttons">
            {currentStep > 0 && (
              <Button 
                onClick={handlePrev}
                className="prev-button"
              >
                Previous
              </Button>
            )}
            <Button 
              type="primary" 
              onClick={currentStep === steps.length - 1 ? handleClose : handleNext}
              className="next-button"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserIntroduction;