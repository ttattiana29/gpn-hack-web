// import Reacr from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import module from './recommend.module.scss'
import { themeDirectory } from '../../theme.data';

import React, { useState } from 'react'

const Recommend = () => {
  const styles = buildStyles({
    strokeLinecap: "square",
    pathColor: "#24C38E",
    textColor: "#002033",
    textSize: "16px",
  });
  
  
  const [showAllCards, setShowAllCards] = useState(false);
  
  const completedTasks = 8;
  const totalTasks = 10;
  const percentage = (completedTasks / totalTasks) * 100;
  
  return (
      <div className={module.content}>
        <p className={module.contentTitle}>Рекомендуемые темы</p>
        <div className={module.cards}>
          {themeDirectory.slice(0, showAllCards ? themeDirectory.length : 1).map((theme) => ( // используем slice для показа одной или всех карточек
            <div key={theme.id} className={module.card}>
              {/* Используем значения из объекта темы */}
              <div className={[module.cardProgress, module.firstChild].join(' ')}>
                <div style={{ width: "170px" }}>
                  <CircularProgressbar
                    value={(theme.completedTasks / theme.totalTasks) * 100}
                    text={`${theme.completedTasks}/${theme.totalTasks}`}
                    strokeWidth={8}
                    styles={styles}
                  />
                </div>
                <span className={module.Tasks}>заданий</span>
              </div>
              <div className={module.cardContent}>
                <span className={module.cardContentTitle}>{theme.title}</span>
                <span className={module.cardContentTheme}>{theme.header}</span>
                <span className={module.cardContentText}>{theme.text}</span>
                <button className={module.cardContentButton}>{theme.buttonProgress}</button>
              </div>
            </div>
          ))}
        </div>
        <div className={`${module.buttons} center`}>
          {!showAllCards && <button className={module.showMoreButton} onClick={() => setShowAllCards(true)}>Показать больше</button>} {/* кнопка "Показать больше" */}
          {showAllCards && <button className={module.showMoreButton} onClick={() => setShowAllCards(false)}>Скрыть все</button>} {/* кнопка "Скрыть все" */}
        </div>
      </div>
  );
};

export default Recommend;
