import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignInContainer from "../../components/SignInContainer";

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      
      // render the SignInContainer component, fill the text inputs and press the submit button
      const { getByPlaceholderText, getByTestId } = render(
        <SignInContainer onSubmit={onSubmit} />,
      );

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('Password'), 'secret-password');
      fireEvent.press(getByTestId('submit'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'secret-password',
        });
      });
    });
  });
});
