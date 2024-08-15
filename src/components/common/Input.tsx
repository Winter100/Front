import styles from './styles/Input.module.css';
const Input = () => {
  return (
    <input className={styles.input} placeholder="메시지를 입력해주세요." />
  );
};

export default Input;
