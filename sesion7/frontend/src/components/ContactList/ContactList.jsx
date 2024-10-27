function ContactList({ contacts = [] }) {
  return (
    <ul className='bg-[#efeae2] flex-grow rounded'>
      {contacts.map((contact, index) => (
        <li key={index} className='text-black text-[14px] border-b-[1px] border-gray-400 py-2 px-3'>
          {contact.username}
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
