import styles from './styles/MessageItemContainer.module.css';

interface MessageItemProps {
  children: React.ReactNode;
}

const MessageItemContainer = ({ children }: MessageItemProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default MessageItemContainer;
