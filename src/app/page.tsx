import Image from 'next/image';
import styles from './page.module.css';
import Header from '@/components/Header';
import Body from '@/components/ContentContainer';



export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Body />
    </main>
  );
}
