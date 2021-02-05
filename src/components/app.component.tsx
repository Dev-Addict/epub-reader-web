import React, { useState } from 'react';
import { HomeScreen, ReaderScreen } from '../screens';

export const App = () => {
  const [url, setUrl] = useState('');

  return url ?
    <ReaderScreen url={url} /> :
    <HomeScreen setUrl={setUrl} />
};
