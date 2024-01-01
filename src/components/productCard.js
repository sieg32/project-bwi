import '../stylesheets/productCard.css'
import { useNavigate } from 'react-router-dom'
export default function ProductCard(props){
    const navigate = useNavigate();

    function handleRedirect(event){
        navigate(`product/${props.data.id}`);

    }

    return(
        
            <div id={props.data.id} key={props.data.id} className="product-card" onClick={handleRedirect}>
                <div className='thumbnail-placeholder'>

                    <img src={props.data.thumbnail} alt={props.data.title}></img>  
                </div>
                <div className='information'> 

                    <h2>{props.data.title}</h2>
                    <div className='price'>
                    <h3>${props.data.price}</h3>

                    <h3>{props.data.discountPercentage}% off</h3>
                    </div>
                   
                </div>

                
            </div>

       

    )
}