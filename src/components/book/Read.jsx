import './Read.css';

function Read(props) {
    return (
        <iframe
            title={props.title} 
            width="90%" 
            height="700px" 
            src={props.book.url_to_read || props.book.url_to_download} 
            frameBorder="0" 
            allowFullScreen={true}>    
        </iframe>  
        )
}

export default Read;