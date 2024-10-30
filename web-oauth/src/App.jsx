import { useGoogleLogin } from '@react-oauth/google';
import './App.css';
import MyCustomButton from './MyCustomButton';
import axios from 'axios';
import { useState } from 'react';
import CodeWithCopy from './Code';
import ReactJson from 'react-json-view';

function App() {
  const [code, setCode] = useState(null);
  const [tokens, setTokens] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { data } = await axios.post('http://localhost:3000/auth/google', {
        code: codeResponse.code,
      });

      setTokens(data.data.tokens);
    },

    flow: 'auth-code',
  });

  const getAuthCode = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setCode(codeResponse.code);
    },
    flow: 'auth-code',
  });

  return (
    <div className='text-xs align-middle py-4  px-8 border rounded text-white flex flex-col gap-4 max-w-[600px] mt-8'>
      <h1 className='text-xl'>Ticketera</h1>
      <MyCustomButton onClick={() => getAuthCode()}>Generate Code</MyCustomButton>
      {code ? <CodeWithCopy code={code} /> : null}
      <MyCustomButton onClick={() => login()}>Authorization Code Flow</MyCustomButton>
      {tokens ? <ReactJson src={tokens} theme={'tomorrow'} displayDataTypes={false} name={null} /> : null}
    </div>
  );
}

export default App;
