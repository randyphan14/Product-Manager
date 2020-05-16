import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

export default props => {
    const [stuff, setStuff] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => setStuff(res.data));
    }, [])

    const removeFromDom = productId => {
        setStuff(stuff.filter(product => product._id != productId))
    }

    return (
        <div>
            <h1>All Products:</h1>
            {stuff.map((product, idx)=> {
                return (
                    <p key={idx}>
                        <Link to={"/" + product._id}>
                            {product.title}
                        </Link>
                        | 
                        <Link to={"/" + product._id + "/edit"}>
                            Edit
                        </Link> 
                        |
                        <DeleteButton productId={product._id} successCallback={()=>removeFromDom(product._id)}/>
                        </p>
            )})}
        </div>
    )
}