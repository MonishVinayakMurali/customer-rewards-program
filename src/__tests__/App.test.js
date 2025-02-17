import { render, screen } from '@testing-library/react';
import App from '../App';
import { CUSTOMER_REWARDS_PROGRAM } from '../utils/constants';

describe('App component', () => {
  it('renders customer rewards program header', () => {
     render(<App />);
    const headerElement = screen.getByText(CUSTOMER_REWARDS_PROGRAM);
    expect(headerElement).toBeInTheDocument();
  });
});


