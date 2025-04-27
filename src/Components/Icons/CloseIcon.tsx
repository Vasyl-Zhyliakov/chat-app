import './CloseIcon.css';

type Props = {
    handleClear: () => void;
};

export const CloseIcon: React.FC<Props> = ({ handleClear }) => {
    return (
        <svg
            className="chat__close-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleClear}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
};
