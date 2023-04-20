// import React, { useState } from 'react';
// import module from '../navbar/navbar.module.scss'
// import avatar from './images/profile.png'
// import Union from './icons/Union.png'
// import Sun from './icons/Sun.png'
// import Subtract from './icons/Subtract.png'
// import {NavLink} from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <nav className={module.header}>
//         <div className={module.headerBrand}>
//             <h2 className={module.headerTitle}>
//                 Портал Разработчика
//             </h2>
//         </div>
//         <section className={module.headerSections}>
//             <div className="headerSection">
//                 <NavLink to="/">
//                     <p className={module.headerSectionTitle}>Моё обучение</p>
//                 </NavLink>
//             </div>
//             <div className="headerSection">
//                 <NavLink to="/tasks">
//                     <p className={module.headerSectionTitle}>Задачи</p>
//                 </NavLink>
                
//             </div>
//         </section>
//         <div className={module.headerPanel}>
//             <section className={module.panelIcons}>
//                 <img src={Union} className={module.panelIcon}/>
//                 <img src={Sun} className={module.panelIcon}/>
//                 <img src={Subtract} className={module.panelIcon}/>
//             </section>
//             <div className={module.headerProfile}>
//                 <img src={avatar} className={module.profileAvatar}/>
//                 <p className={module.profileUsername}>Михаил Романов</p>
//             </div>
//         </div>
//     </nav>

//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import module from '../navbar/navbar.module.scss'
import avatar from './images/profile.png'
import Union from './icons/Union.png'
import Sun from './icons/Sun.png'
import Subtract from './icons/Subtract.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={module.header}>
        <div className={module.headerBrand}>
            <h2 className={module.headerTitle}>
                Портал Разработчика
            </h2>
        </div>
        <section className={`${module.headerSections} ${isMenuOpen ? module.visible : ''}`}>
            <div className="headerSection">
                <NavLink to="/" onClick={toggleMenu}>
                    <p className={module.headerSectionTitle}>Моё обучение</p>
                </NavLink>
            </div>
            <div className="headerSection">
                <NavLink to="/tasks" onClick={toggleMenu}>
                    <p className={module.headerSectionTitle}>Задачи</p>
                </NavLink>
            </div>
        </section>
        <div className={`${module.headerPanel} ${isMenuOpen ? module.visible : ''}`}>
            <section className={module.panelIcons}>
                <img src={Union} className={module.panelIcon}/>
                <img src={Sun} className={module.panelIcon}/>
                <img src={Subtract} className={module.panelIcon} onClick={toggleMenu}/>
            </section>
            <div className={module.headerProfile}>
                <img src={avatar} className={module.profileAvatar}/>
                <p className={module.profileUsername}>Михаил Романов</p>
            </div>
        </div>
        <div className={`${module.mobileMenuButton} ${isMenuOpen ? module.active : ''}`} onClick={toggleMenu}>
          <div className={module.mobileMenuButtonLine}></div>
          <div className={module.mobileMenuButtonLine}></div>
          <div className={module.mobileMenuButtonLine}></div>
        </div>
    </nav>

  );
};

export default Navbar;
