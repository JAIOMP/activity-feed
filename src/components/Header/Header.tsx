import viteLogo from '/vite.svg';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import styles from './Header.module.css';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <a href='/' className={styles.title}>
              <img src={viteLogo} className={styles.logo} alt='Vite logo' />
              <span>Activity Feed</span>
            </a>
          </div>
          <div className={styles.content}>
            <div className={styles.contentBody}>
              <button
                type='button'
                onClick={toggleTheme}
                className={styles.themeSwitch}
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}>
        <div className='divider-line' />
      </div>
    </header>
  );
};
