export default function UserIcon() {
  return (
    <div className="flex items-center justify-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}
