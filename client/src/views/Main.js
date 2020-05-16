import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
export default () => {
    const [stuff, setStuff] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res =>{ 
                setStuff(res.data)
                setLoaded(true);
            });
    }, [])
    const removeFromDom = productId => {
        setStuff(stuff.filter(product => product._id != productId));
    }
    const createProduct = product => {
        axios.post('http://localhost:8000/api/product', product)
            .then(res=>{
                setStuff([...stuff, res.data]);
            })
    }
    return (
        <div>
            <ProductForm onSubmitProp={createProduct} initialTitle="" initialPrice={0} intialDescription=""/>
            <hr/>
            {loaded && <ProductList stuff={stuff} removeFromDom={removeFromDom}/>}
        </div>
    )
}
