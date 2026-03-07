import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../test/utils';

describe('Example Component Test', () => {
  it('should render without crashing', () => {
    renderWithProviders(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
