import Head from "next/head";
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Layout({ title, children }) {
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
                </header>

                <main>{children}</main>
                <footer>footer</footer>
            </section>
        </>
    )
}