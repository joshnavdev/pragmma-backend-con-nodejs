export default function MyCustomButton({ children, onClick }) {
  return (
    <button
      className='text-xs border rounded p-2 bg-white text-black font-semibold hover:bg-gray-200'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
