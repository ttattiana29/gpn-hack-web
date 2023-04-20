import React, {useState  } from 'react';
import module from './catalog.module.scss';
import { themeDirectory } from '../../theme.data';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Theme } from '../../Theme';

const Catalog: React.FC = () => {
    const [filter, setFilter] = useState<string>('Все');
    const [selectedItem, setSelectedItem] = useState<string>('Все');

  const filterTasks = (tasks: Theme[]): Theme[] => {
    switch (filter) {
      case 'Рабочая среда':
        return tasks.filter((task) => task.category === 'Рабочая среда');
      case 'Библиотеки':
        return tasks.filter((task) => task.category === 'Библиотеки');
      case 'Пройденные':
        return tasks.filter((task) => task.status === true);
      case 'Не пройденные':
        return tasks.filter((task) => task.status === false);
      default:
        return tasks;
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setFilter(item);
  };

  const getListItemClass = (item: string) => {
    if (item === selectedItem) {
      return 'selected';
    }
    return '';
  };

    return(
        <div className={module.container}>
            <span className={module.containerTitle}>Каталог тем</span>
            <ul className={module.catalog}>
                <li className={getListItemClass('Все')} onClick={() => handleItemClick('Все')}>Все</li>
                <li className={getListItemClass('Рабочая среда')} onClick={() => handleItemClick('Рабочая среда')}>Рабочая среда</li>
                <li className={getListItemClass('Библиотеки')} onClick={() => handleItemClick('Библиотеки')}>Библиотеки</li>
                <li className={getListItemClass('Пройденные')} onClick={() => handleItemClick('Пройденные')}>Пройденные</li>
                <li className={`${module.catalogLastLi} ${getListItemClass('Не пройденные')}`} onClick={() => handleItemClick('Не пройденные')}>Не пройденные</li>
            </ul>

            <div className={module.catalog2line}>
                <ul className={module.catalogFirst}>
                    <li className={getListItemClass('Все')} onClick={() => handleItemClick('Все')}>Все</li>
                    <li className={getListItemClass('Рабочая среда')} onClick={() => handleItemClick('Рабочая среда')}>Рабочая среда</li>
                    <li className={`${module.catalogLastLi} ${getListItemClass('Библиотеки')}`} onClick={() => handleItemClick('Библиотеки')}>Библиотеки</li>
                </ul>
                <ul className={module.catalogFirst}>
                    <li className={getListItemClass('Пройденные')} onClick={() => handleItemClick('Пройденные')}>Пройденные</li>
                    <li className={`${module.catalogLastLi} ${getListItemClass('Не пройденные')}`} onClick={() => handleItemClick('Не пройденные')}>Не пройденные</li>
                </ul>
            </div>

            <div className={module.themeCards}>
                {filterTasks(themeDirectory).map((theme) => (
                    <div key={theme.id} className={module.themeCard}>
                        <h2 className={module.themeTitle}>{theme.title}</h2>
                        <span className={module.themeHeader}>{theme.header}</span>
                        <p className={module.themeText}>{theme.text}</p>
                        <div className="theme-footer">
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Catalog;