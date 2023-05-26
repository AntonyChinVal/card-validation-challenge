import {useState} from 'react';

const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
const masterCardRegex = /^5[1-5][0-9]{14}$/;
const americanExpressRegex = /^3[47][0-9]{13}$/;
const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

const isLuhnValid = (cardNumber: string): boolean => {
  let sum = 0;
  let isSecondDigit = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  return sum % 10 === 0;
};

interface UseCardOutput {
  formattedValue: string;
  handleTextChange: (text: string) => void;
  errorMessage?: string;
}

const useCardInput = (isWithLuhnValidation = false): UseCardOutput => {
  const [formattedValue, setFormattedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (text: string) => {
    let formattedText = text;

    formattedText = formattedText.replace(/[^\d]/g, '');

    const cardNumber = formattedText.trim();
    let isValid =
      visaRegex.test(cardNumber) ||
      masterCardRegex.test(cardNumber) ||
      americanExpressRegex.test(cardNumber) ||
      discoverRegex.test(cardNumber);

    if (isWithLuhnValidation) {
      isValid = isLuhnValid(cardNumber);
    }

    setFormattedValue(formattedText);

    if (isValid) {
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid card number');
    }
  };

  return {formattedValue, handleTextChange, errorMessage};
};

export default useCardInput;
