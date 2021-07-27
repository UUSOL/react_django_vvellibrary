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
            <img className="main-picture" src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
            <HeaderTitle />
        </header>
    );
  }
  
  export default Header;