type StatusMessageProps = {
    type: 'loading' | 'error' | 'empty';
    message: string;
};

export function StatusMessage({ type, message }: StatusMessageProps) {
    return (
        <div className={`status-message status-message--${type}`}>
            {message}
        </div>
    );
}