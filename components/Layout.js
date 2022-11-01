import Head from "next/head";
import Link from 'next/link';
import { useContext, useEffect, useState } from "react";

import { Store } from "../utils/Store";
import styles from '../styles/Header.module.css';

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <section className={styles.wrapper}>
                <header className={styles.headerNavbar}>
                    <nav>
                        <div>
                            <Link href='/'>
                                Home
                            </Link>
                        </div>
                        <Link href='/products'>
                            products
                        </Link>

                        <div>
                            <Link href='/register'>Register</Link>
                        </div>
                        <Link href='/login'>Login</Link>
                    </nav>

                    <Link href='/cart' className={styles.cart}>
                        Cart

                        <span>
                            {cartItemsCount > 0 &&
                                <span className={styles.amount}>
                                    {cartItemsCount}
                                </span>
                            }
                        </span>
                    </Link>
                </header>

                <main>{children}</main>
                <footer>footer</footer>
            </section>
        </>
    )
}