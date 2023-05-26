import React from 'react';

interface UseDateOutput {
  formattedValue: string;
  handleTextChange: (text: string) => void;
  errorMessage?: string;
}

const useDateInput = (): UseDateOutput => {
  const [formattedValue, setFormattedValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleTextChange = (text: string) => {
    let formattedText = text;

    formattedText = formattedText.replace(/[^\d]/g, '');

    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
    }

    setFormattedValue(formattedText);

    // Validate if the entered date is greater than the current date and a valid date
    const currentDate = new Date();
    const enteredDate = new Date(
      +`20${formattedText.slice(3, 5)}`,
      Number(formattedText.slice(0, 2)) - 1,
    );

    if (
      enteredDate <= currentDate ||
      enteredDate.getMonth() !== Number(formattedText.slice(0, 2)) - 1
    ) {
      setErrorMessage('Invalid date');
    } else {
      setErrorMessage('');
    }
  };

  return {formattedValue, handleTextChange, errorMessage};
};

export default useDateInput;
