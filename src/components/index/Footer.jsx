import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer>
		    <svg viewBox="0 0 1440 320">
			    <path fill="#f3f4f5" fillOpacity="1" d="M0,192L80,202.7C160,213,320,235,480,240C640,245,800,235,960,202.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
		    </svg>
            <div className="additional-info">
			    <NavLink to="/">О проекте</NavLink>
                <p>all copyrights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;