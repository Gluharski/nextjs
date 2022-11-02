import { useContext } from "react";
import Layout from "../components/Layout";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsList } from 'react-icons/bs';

import { Store } from '../utils/Store';
import dynamic from "next/dynamic";

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
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>description</td>
                                <td>quantity</td>
                                <td>price</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        {cartItems.map((item) => (
                            <tbody>
                                <tr>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateCartHandler(item, e.target.value)}>
                                            {[...Array.from(item.countInStock).keys()]
                                                .map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        {item.price}
                                    </td>
                                    <td>
                                        <Link href={`/product/${item.slug}`}>
                                            {/* <BsList /> */}
                                            details
                                        </Link>
                                    </td>
                                    <td>
                                        <AiOutlineCloseCircle onClick={() => removeItemHandler(item)} />
                                    </td>
                                </tr>
                            </tbody>
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

                <button onClick={() => router.push('login?redirect=/shipping')}>
                    Check Out
                </button>
            </ul>
        </Layout>
    )
}

// render only in client side
export default dynamic(() => Promise.resolve((CartScreen), { ssr: false }));