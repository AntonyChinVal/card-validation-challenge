import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../../App';

describe('App', () => {
  it('renders without errors', () => {
    render(<App />);
  });
  it('should call handleSubmit when the button is pressed and form is valid', () => {
    const handleSubmitMock = jest.fn();

    const {getByText, getByPlaceholderText} = render(
      <App submit={handleSubmitMock} />,
    );

    const cardNumberInput = getByPlaceholderText('Card Number');
    const expirationInput = getByPlaceholderText('MM/YY');
    const cvvInput = getByPlaceholderText('CVV');
    const nameInput = getByPlaceholderText('Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const submitButton = getByText('SUBMIT PAYMENT');

    fireEvent.changeText(cardNumberInput, '4111111111111111');
    fireEvent.changeText(expirationInput, '12/24');
    fireEvent.changeText(cvvInput, '123');
    fireEvent.changeText(nameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');

    fireEvent.press(submitButton);

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it('should not call handleSubmit when the button is pressed and form is invalid', () => {
    const handleSubmitMock = jest.fn();

    const {getByText} = render(<App submit={handleSubmitMock} />);

    const submitButton = getByText('SUBMIT PAYMENT');

    fireEvent.press(submitButton);

    expect(handleSubmitMock).not.toHaveBeenCalled();
  });
});
