import Link from 'next/link';
import styles from '../styles/Card.module.css';

// this item idea is to create product card
const ProductItem = ({ product }) => {
    return (
        <div className={styles.card}>
            <div className={styles.highlighter}>
                <Link href={`/product/${product.slug}`}>
                    <h3>
                        {product.name}
                    </h3>
                    <p>
                        {product.description}
                    </p>
                    <p>
                        {product.price}$
                    </p>
                </Link>
            </div>

            <button type='button'>
                Add to card
            </button>
        </div>
    )
}

export default ProductItem;