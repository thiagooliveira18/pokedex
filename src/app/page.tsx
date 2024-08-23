import styles from './page.module.css';
import Header from '@/components/Header';
import Body from '@/components/Body';

// Comentário teste para pull request

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Body />
    </main>
  );
}
