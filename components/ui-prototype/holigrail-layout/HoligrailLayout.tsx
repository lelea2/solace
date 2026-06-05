"use client";

import styles from './styles.module.css';

export default function App() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>Header</header>

      <main className={styles.columns}>
        <nav className={styles.left}>Navigation</nav>
        <section className={styles.content}>Main Content</section>
        <aside className={styles.right}>Ads</aside>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}