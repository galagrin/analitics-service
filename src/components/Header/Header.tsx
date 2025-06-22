import logo from '../../assets/LogoSS.png';
import generator from '../../assets/generator.svg';
import upload from '../../assets/upload.svg';
import history from '../../assets/history.svg';
import styles from './Header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header>
            <div className={styles.logowrap}>
                <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
                <p className={styles.title}>Межгалактическая аналитика</p>
            </div>
            <nav>
                <ul>
                    <li onClick={() => navigate('/')} className={location.pathname === '/' ? styles.active : ''}>
                        <img src={upload} alt="upload file" />
                        <span>CSV Аналитик</span>
                    </li>
                    <li
                        onClick={() => navigate('/generator')}
                        className={location.pathname === '/generator' ? styles.active : ''}
                    >
                        <img src={generator} alt="generate file" />
                        <span>CSV Генератор</span>
                    </li>
                    <li
                        onClick={() => navigate('/history')}
                        className={location.pathname === '/history' ? styles.active : ''}
                    >
                        <img src={history} alt="history" />
                        <span>История</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
