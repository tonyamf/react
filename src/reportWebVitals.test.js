import { waitFor } from '@testing-library/react';
import reportWebVitals from './reportWebVitals';

const mockVitals = {
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
};
jest.mock('web-vitals', () => ({
  getCLS: (...a) => mockVitals.getCLS(...a),
  getFID: (...a) => mockVitals.getFID(...a),
  getFCP: (...a) => mockVitals.getFCP(...a),
  getLCP: (...a) => mockVitals.getLCP(...a),
  getTTFB: (...a) => mockVitals.getTTFB(...a),
}));

const flush = () => new Promise((r) => setTimeout(r, 0));

test('does nothing without a callback', async () => {
  reportWebVitals();
  await flush();
  Object.values(mockVitals).forEach((fn) => expect(fn).not.toHaveBeenCalled());
});

test('ignores a callback that is not a function', async () => {
  reportWebVitals('nope');
  await flush();
  Object.values(mockVitals).forEach((fn) => expect(fn).not.toHaveBeenCalled());
});

test('passes the callback to all five web-vitals metrics', async () => {
  // a plain function: jest.fn() fails `instanceof Function` in jsdom (different realm)
  const cb = () => {};
  reportWebVitals(cb);
  await waitFor(() => expect(mockVitals.getTTFB).toHaveBeenCalledWith(cb));
  Object.values(mockVitals).forEach((fn) => expect(fn).toHaveBeenCalledWith(cb));
});
