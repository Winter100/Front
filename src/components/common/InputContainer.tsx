import styles from './styles/InputContainer.module.css';
const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default InputContainer;
