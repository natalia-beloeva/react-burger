import styles from './error-message.module.css';

type TErrorMessageProps = {
  title: string;
  details?: string;
};

export const ErrorMessage = ({
  title,
  details,
}: TErrorMessageProps): React.JSX.Element => {
  return (
    <div className={styles.error}>
      <p className="text text_type_main-medium text_color_error">{title}</p>

      {details && (
        <p className="text text_type_main-default text_color_inactive mt-4">{details}</p>
      )}
    </div>
  );
};
