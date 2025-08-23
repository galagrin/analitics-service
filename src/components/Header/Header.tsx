import logo from '../../assets/LogoSS.png';
import generator from '../../assets/generator.svg';
import upload from '../../assets/upload.svg';
import history from '../../assets/history.svg';
import styles from './Header.module.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';

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
                    <li className={location.pathname === '/' ? styles.active : ''}>
                        <Link to="/">
                            <img src={upload} alt="upload file" />
                            <span>CSV Аналитик</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/generator' ? styles.active : ''}>
                        <Link to="/generator">
                            <img src={generator} alt="generate file" />
                            <span>CSV Генератор</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/history' ? styles.active : ''}>
                        <Link to="/history">
                            <img src={history} alt="history" />
                            <span>История</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
