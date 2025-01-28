import styles from '@/styles/BackgroundDesign.module.css';

export default function BackgroundDesign() {
  // Render decorative background shapes
  return (
    <div className={styles.backgroundDesign}>
      {/* Circular shapes */}
      <div className={`${styles.shape} ${styles.circle1}`}></div>
      <div className={`${styles.shape} ${styles.circle2}`}></div>
      <div className={`${styles.shape} ${styles.circle3}`}></div>
      {/* Square shape */}
      <div className={`${styles.shape} ${styles.square}`}></div>
      {/* Triangle shape */}
      <div className={`${styles.shape} ${styles.triangle}`}></div>
    </div>
  );
}
