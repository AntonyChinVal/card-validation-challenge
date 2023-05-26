import {useState} from 'react';

interface UseNameOutput {
  formattedValue: string;
  handleTextChange: (text: string) => void;
  errorMessage?: string;
}

const useNameInput = (): UseNameOutput => {
  const [formattedValue, setFormattedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (text: string) => {
    let formattedText = text;

    formattedText = formattedText.replace(/[^a-zA-Z\s]/g, '');

    formattedText = formattedText.slice(0, 255);

    setFormattedValue(formattedText);

    if (formattedText === text) {
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid');
    }
  };

  return {formattedValue, handleTextChange, errorMessage};
};

export default useNameInput;
