import {useState} from 'react';

interface UseCVVOutput {
  formattedValue: string;
  handleTextChange: (text: string) => void;
  errorMessage?: string;
}

const useCVVInput = (): UseCVVOutput => {
  const [formattedValue, setFormattedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (text: string) => {
    let formattedText = text;

    formattedText = formattedText.replace(/[^\d]/g, '');

    setFormattedValue(formattedText);

    const cvvLength = formattedText.length;
    const isValidCVV = cvvLength === 3 || cvvLength === 4;
    if (isValidCVV) {
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid CVV');
    }
  };

  return {formattedValue, handleTextChange, errorMessage};
};

export default useCVVInput;
