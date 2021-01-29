import React from 'react';
import { useRouter } from 'next/router';

import InputBase from '../Input';
import Button from '../Button';

export default function HomeForm() {
  const router = useRouter();

  const [name, setName] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBase type="text" placeholder="Diz aí seu nome pra jogar :)" onChange={(e) => setName(e.target.value)} />
      <Button type="submit" disabled={name.length === 0}>
        Jogar
      </Button>
    </form>
  );
}
