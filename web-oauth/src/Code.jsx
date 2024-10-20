import { useState } from 'react';

export default function CodeWithCopy({ code }) {
  const [copyLabel, setCopyLabel] = useState('Copy');
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopyLabel('Copied!');
    setTimeout(() => {
      setCopyLabel('Copy');
    }, 1000);
  };

  return (
    <div className='text-[12px] flex gap-4 items-center justify-between'>
      <p>{code}</p>
      <button
        onClick={handleCopyClick}
        className=' text-white border rounded py-1 px-2 hover:bg-gray-800 flex gap-2 items-center'
      >
        <span>{copyLabel}</span>
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 24 24'
          height='14px'
          width='14px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path fill='none' d='M0 0h24v24H0V0z'></path>
          <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'></path>
        </svg>
      </button>
    </div>
  );
}
