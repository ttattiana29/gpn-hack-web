// import React, { useState } from 'react';
// import module from './carousel.module.scss';

// const cards = [
//   { id: 1, title: 'Карточка 1', text: 'Текст карточки 1' },
//   { id: 2, title: 'Карточка 2', text: 'Текст карточки 2' },
//   { id: 3, title: 'Карточка 3', text: 'Текст карточки 3' },
//   { id: 4, title: 'Карточка 4', text: 'Текст карточки 4' },
//   { id: 5, title: 'Карточка 5', text: 'Текст карточки 5' },
//   { id: 6, title: 'Карточка 6', text: 'Текст карточки 6' },
// ];

// function Carousel() {
//   const [startIndex, setStartIndex] = useState(0);
//   const endIndex = startIndex + getCardsPerScreen();
//   const showNextCards = () => setStartIndex((startIndex + 1) % cards.length);
//   const showPrevCards = () => setStartIndex((startIndex + cards.length - 1) % cards.length);

//   function getCardsPerScreen() {
//     if (window.innerWidth >= 700) {
//       return 3;
//     } else if (window.innerWidth >= 480) {
//       return 2;
//     } else {
//       return 1;
//     }
//   }

//   return (
//     <div className={module.container}>
//       <div className={module.header}>
//         <h1>Frontend</h1>
//         <div className={module.buttons}>
//           <button onClick={showPrevCards}>Назад</button>
//           <button onClick={showNextCards}>Вперед</button>
//         </div>
//       </div>
//       <div className={module.cardList}>
//         {cards.slice(startIndex, endIndex).map(card => (
//           <div key={card.id} className={module.card}>
//             <h2>{card.title}</h2>
//             <p>{card.text}</p>
//           </div>
//         ))}
//         {endIndex >= cards.length && (
//           cards.slice(0, getCardsPerScreen() - (cards.length - startIndex)).map(card => (
//             <div key={card.id} className={module.card}>
//               <h2>{card.title}</h2>
//               <p>{card.text}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Carousel;

// import React, { useState, useEffect } from 'react';
// import module from './carousel.module.scss';
// import back from './icons/back.png'
// import forward from './icons/forward.png'

// const cards = [
//   { id: 1, title: 'Карточка 1', text: 'Текст карточки 1' },
//   { id: 2, title: 'Карточка 2', text: 'Текст карточки 2' },
//   { id: 3, title: 'Карточка 3', text: 'Текст карточки 3' },
//   { id: 4, title: 'Карточка 4', text: 'Текст карточки 4' },
//   { id: 5, title: 'Карточка 5', text: 'Текст карточки 5' },
//   { id: 6, title: 'Карточка 6', text: 'Текст карточки 6' },
// ];

// function Carousel() {
//   const [startIndex, setStartIndex] = useState(0);
//   const [cardsPerScreen, setCardsPerScreen] = useState(getCardsPerScreen());

//   useEffect(() => {
//     function handleResize() {
//       setCardsPerScreen(getCardsPerScreen());
//     }

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   function getCardsPerScreen() {
//     if (window.innerWidth >= 700) {
//       return 3;
//     } else if (window.innerWidth >= 480) {
//       return 2;
//     } else {
//       return 1;
//     }
//   }

//   const endIndex = startIndex + cardsPerScreen;

//   const showNextCards = () => setStartIndex((startIndex + 1) % cards.length);
//   const showPrevCards = () => setStartIndex((startIndex + cards.length - 1) % cards.length);

//   return (
//     <div className={module.container}>
//       <div className={module.header}>
//         <span>Путь Front End Developer</span>
//         <button className={module.buttonHide}>Cкрыть пройденные</button>
//         <div className={module.buttons}>
//           <button onClick={showPrevCards} className={module.buttonNavig}><img src={back}/></button>
//           <button onClick={showNextCards} className={module.buttonNavig}><img src={forward}/></button>
//         </div>
//       </div>
//       <div className={module.cardList}>
//         {cards.slice(startIndex, endIndex).map(card => (
//           <div key={card.id} className={module.card}>
//             <h2>{card.title}</h2>
//             <p>{card.text}</p>
//           </div>
//         ))}
//         {endIndex >= cards.length && (
//           cards.slice(0, cardsPerScreen - (cards.length - startIndex)).map(card => (
//             <div key={card.id} className={module.card}>
//               <h2>{card.title}</h2>
//               <p>{card.text}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Carousel;

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