import React, { useState, useEffect } from 'react';
import module from './carousel.module.scss';
import back from './icons/back.png'
import forward from './icons/forward.png'
import { themeDirectory } from '../../theme.data';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerScreen, setCardsPerScreen] = useState(getCardsPerScreen());

  useEffect(() => {
    function handleResize() {
      setCardsPerScreen(getCardsPerScreen());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getCardsPerScreen() {
    if (window.innerWidth >= 700) {
      return 3;
    } else if (window.innerWidth >= 480) {
      return 2;
    } else {
      return 1;
    }
  }

  const endIndex = startIndex + cardsPerScreen;

  const showNextCards = () => setStartIndex((startIndex + 1) % themeDirectory.length);
  const showPrevCards = () => setStartIndex((startIndex + themeDirectory.length - 1) % themeDirectory.length);

  return (
    <div className={module.container}>
      <div className={module.header}>
        <span>Путь Front End Developer</span>
        <button className={module.buttonHide}>Cкрыть пройденные</button>
        <div className={module.buttons}>
          <button onClick={showPrevCards} className={module.buttonNavig}><img src={back}/></button>
          <button onClick={showNextCards} className={module.buttonNavig}><img src={forward}/></button>
        </div>
      </div>
      <div className={module.cardList}>
        
        {themeDirectory.slice(startIndex, endIndex).map(theme => (
            <div key={theme.id} className={module.card}>
            <span className={module.cardTitle}>{theme.title}</span>
            <span className={module.cardHeader}>{theme.header}</span>
            <span className={module.cardText}>{theme.text}</span>
            <div className={module.flex}>
            <button>{theme.buttonProgress}</button>
            <div className={module.progressBarContainer}>
              {theme.completedTasks > 0 && (
                <>
                  <div className={module.completedTasks}>
                    {`${theme.completedTasks}/${theme.totalTasks} заданий`}
                  </div>
                  <div className={module.progressBar}>
                    <CircularProgressbar
                      value={theme.completedTasks / theme.totalTasks * 100}
                      styles={buildStyles({
                        strokeLinecap: 'square',
                        pathColor: '#24C38E',
                        trailColor: '#f2f2f2',
                      })}
                      strokeWidth={8}
                      className={module.circularProgressBar}
                    />
                  </div>
                </>
              )}
              {theme.completedTasks === 0 && (
                <div className={module.completedTasks}>
                  {`${theme.totalTasks} заданий`}
                </div>
              )}
            </div>
            
          </div>
          </div>
        ))}
        {endIndex >= themeDirectory.length && (
          themeDirectory.slice(0, cardsPerScreen - (themeDirectory.length - startIndex)).map(theme => (
            <div key={theme.id} className={module.card}>
            <span className={module.cardTitle}>{theme.title}</span>
            <span className={module.cardHeader}>{theme.header}</span>
            <span className={module.cardText}>{theme.text}</span>
            <div className={module.flex}>
            <button>{theme.buttonProgress}</button>
            <div className={module.progressBarContainer}>
              {theme.completedTasks > 0 && (
                <>
                  <div className={module.completedTasks}>
                    {`${theme.completedTasks}/${theme.totalTasks} заданий`}
                  </div>
                  <div className={module.progressBar}>
                    <CircularProgressbar
                      value={theme.completedTasks / theme.totalTasks * 100}
                      styles={buildStyles({
                        strokeLinecap: 'square',
                        pathColor: '#24C38E',
                        trailColor: '#f2f2f2',
                      })}
                      strokeWidth={8}
                      className={module.circularProgressBar}
                    />
                  </div>
                </>
              )}
              {theme.completedTasks === 0 && (
                <div className={module.completedTasks}>
                  {`${theme.totalTasks} заданий`}
                </div>
              )}
            </div>
            
          </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Carousel;