import { render, screen, fireEvent, waitFor, waitForElement, act } from '@testing-library/react';

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';

import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'

import App from './App';

import handlers from './mocks/handlers';

const server = setupServer(handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('document should contain My Daily Calorie Tracker', () => {
  render(<App />);
  expect(screen.getByText(/My Daily Calorie Tracker/i)).toBeInTheDocument();
});



test('should calculate today calorie consumed', async () => {

  render(<App />)

  fireEvent.click(screen.getByTestId('meal_breakfast_cowmilk_167'))

  fireEvent.click(screen.getByTestId('meal_morning_snack_mixedvegetable_82'))

  fireEvent.click(screen.getByTestId('meal_lunch_mixedvegetable_82'))

  fireEvent.click(screen.getByTestId('meal_evening_snack_cowmilk_167'))

  fireEvent.click(screen.getByTestId('meal_dinner_chickencurry_359'))

  await waitFor(() =>
    expect(screen.getByTestId('final_calorie_consumed_message')).toHaveTextContent(/I, Consumed 857\/1868 Cal Today/i)
  )

});
