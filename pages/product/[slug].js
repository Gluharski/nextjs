import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';

import styles from '../../styles/ProductDetailsWrapper.module.css';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

const ProductScreen = () => {
    const { state, dispatch } = useContext(Store);

    const { query } = useRouter();
    const { slug } = query;

    const product = data.products.find((x) => x.slug === slug);

    if (!product) {
        return <div>Product Not Found</div>
    }

    const addToCardHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if( product.countInStock < quantity) {
            alert('Sorry, this product is out of stock!');

            return;
        }
        
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                ...product,
                quantity
            }
        })
    }

    return (
        <Layout title={product.name}>
            <button type='button'>
                <Link href="/">
                    back to products
                </Link>
            </button>

            <div className={styles['product-details-wrapper']}>
                <div>
                    <h1>{product.name}</h1>
                    <img src='#' alt={`${product.name} Image`} />
                </div>

                <div>
                    <ul>
                        <li><b>Price</b>: {product.price}$</li>
                        <li><b>Category</b>: {product.category}</li>
                        <li><b>Description</b> :{product.description}</li>
                        <li><b>Status</b>:
                            {product.countInStock > 0
                                ? ' in stock'
                                : ' unavailable'
                            }
                        </li>
                    </ul>

                    <button onClick={addToCardHandler}>
                        add to card
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default ProductScreen;