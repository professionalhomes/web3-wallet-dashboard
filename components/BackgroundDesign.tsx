import styles from '@/styles/BackgroundDesign.module.css';

export default function BackgroundDesign() {
  return (
    <div className={styles.backgroundDesign}>
      <div className={`${styles.shape} ${styles.circle1}`}></div>
      <div className={`${styles.shape} ${styles.circle2}`}></div>
      <div className={`${styles.shape} ${styles.circle3}`}></div>
      <div className={`${styles.shape} ${styles.square}`}></div>
      <div className={`${styles.shape} ${styles.triangle}`}></div>
    </div>
  );
}
