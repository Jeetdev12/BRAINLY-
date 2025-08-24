type Props = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

export function TwitterIcon({
  size = 24,
  strokeWidth = 1.8,
  className,
  title = "Twitter (outline)",
}: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <path
        d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.928 2.206-4.928 4.928 0 .39.045.765.126 1.124-4.094-.205-7.725-2.166-10.157-5.144-.424.729-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.395 0-.788-.023-1.17-.067 2.189 1.404 4.768 2.223 7.557 2.223 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.42-.016-.63.962-.695 1.8-1.562 2.46-2.549z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
