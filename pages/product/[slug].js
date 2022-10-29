import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';
import data from '../../utils/data';
import styles from '../../styles/ProductDetailsWrapper.module.css';

const ProductScreen = () => {
    const { query } = useRouter();
    const { slug } = query;

    const product = data.products.find((x) => x.slug === slug);

    if (!product) {
        return <div>Product Not Found</div>
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

                    <Link href="/card">add to card</Link>
                </div>
            </div>
        </Layout>
    )
}

export default ProductScreen;