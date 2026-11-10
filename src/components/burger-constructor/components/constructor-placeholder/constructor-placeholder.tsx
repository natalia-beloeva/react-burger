import styles from './constructor-placeholder.module.css';

const positionClasses = {
  top: styles.top,
  bottom: styles.bottom,
};

type TConstructorPlaceholderProps = {
  text: string;
  type?: 'top' | 'bottom';
};

export const ConstructorPlaceholder = ({
  text,
  type,
}: TConstructorPlaceholderProps): React.JSX.Element => {
  const positionClass = type ? positionClasses[type] : '';

  return (
    <div className={`${styles.placeholder} ${positionClass}`}>
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};
