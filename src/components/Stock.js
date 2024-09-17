import { useEffect } from "react";

const Stock = ({name, price}) => {
    
    return <div>
        <span>{name}</span> : <span>{price}</span>
    </div>
};
export default Stock;