import { useContext } from "react";
import Layout from "../components/Layout";
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Store } from '../utils/Store';

const CartScreen = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const removeItemHandler = (item) => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
    }

    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty);

        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        })
    }

    return (
        <Layout title={`Your shopping cart has ${cartItems.length}`}>
            <h2>Cart item:</h2>

            <div>
                <button>
                    <Link href="/">go back</Link>
                </button>
            </div>

            <div>
                {cartItems.length === 0
                    ? (<div>Your shopping cart is empty.
                        <button>
                            <Link href='/'>back to shopping</Link>
                        </button>

                    </div>)
                    : (<div>
                        {cartItems.map((item) => (
                            <div key={item.slug}>
                                <div>
                                    <span>quantity:</span>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateCartHandler(item, e.target.value)}>
                                        {[...Array.from(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <Link href={`/product/${item.slug}`}>
                                        name: {item.name}  / {item.price}$
                                    </Link>
                                    <button onClick={() => removeItemHandler(item)}><b>X</b></button>
                                </div>
                            </div>
                        ))}
                    </div>)
                }
            </div>

            <ul>
                <li>
                    subtotal: {cartItems.reduce((a, c) => a + c.quantity, 0)}$
                </li>
                <li>
                    total: {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}$
                </li>

                {/* redirect to checkout */}
                <button onClick={() => router.push('/shipping')}>
                    Check Out
                </button>
            </ul>
        </Layout>
    )
}

export default CartScreen;