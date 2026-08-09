export default function TruckSolid({ size = 24, className }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <rect x="1" y="5" width="13" height="12.5" rx="1.5" />
            <path d="M14 17.5V9h4l4 5v3.5z" />
            <circle cx="5.5" cy="18.5" r="2.3" />
            <circle cx="18.5" cy="18.5" r="2.3" />
        </svg>
    );
}
