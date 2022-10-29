import Layout from "../components/Layout";
import ProductItem from '../components/ProductItem';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout title="Home Page">
      {data.products.map((product) => (
        <ProductItem product={product} />
      ))}
    </Layout>
  )
}