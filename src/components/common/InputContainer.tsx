import styles from './styles/InputContainer.module.css';
const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <form className={styles.container}>{children}</form>;
};

export default InputContainer;
