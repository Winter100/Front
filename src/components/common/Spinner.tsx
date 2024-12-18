import styles from './styles/Spinner.module.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 40, color = '#3498db' }: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    />
  );
};

export default Spinner;
