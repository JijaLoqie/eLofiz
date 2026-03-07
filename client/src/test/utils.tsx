import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
function AllTheProviders({ children }: WrapperProps) {
  return <>{children}</>;
}

function AllTheProviders({ children }: WrapperProps) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

function renderWithProviders(
  ui: ReactElement,
  preloadedState: PreloadedState<Record<string, unknown>> = {},
  options?: RenderOptions
) {
  const store = configureStore({
    reducer: {},
    preloadedState,
  });

  return {
    store,
    ...render(ui, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <AllTheProviders>
            {children}
          </AllTheProviders>
        </Provider>
      ),
      ...options,
    }),
  };
}

function createMockIntersectionObserver() {
  return vi.fn().mockImplementation((callback) => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

vi.stubGlobal('IntersectionObserver', createMockIntersectionObserver);

export * from '@testing-library/react';
export { renderWithProviders, createMockIntersectionObserver };
