import './Header.css';
import HeaderNavigation from './HeaderNavigation.jsx';
import HeaderTitle from './HeaderTitle.jsx';

function Header() {
    return (
        <header className="Header">
            <svg viewBox="0 0 1440 320">
                <path 
                    d="M0,224L80,192C160,160,320,96,480,80C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                </path>
            </svg>
            <HeaderNavigation />
            <div className="image-and-title">
                <img className="main-picture" alt="People reading books" src="https://vvellibrary.s3.eu-central-1.amazonaws.com/images/header.jpg" />
                <HeaderTitle />
            </div>
        </header>
    );
  }
  
  export default Header;