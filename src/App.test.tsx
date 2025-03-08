import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./components/Home/Home', () => ({
  Home: () => <div data-testid='home-page'>Home Page</div>,
}));

describe('App Routing', () => {
  test('renders Home page on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
