// CRA's jest config sets resetMocks: true, so implementations are set inside the test.
const mockRender = jest.fn();
const mockCreateRoot = jest.fn();
jest.mock('react-dom/client', () => ({ createRoot: (...a) => mockCreateRoot(...a) }));
jest.mock('./reportWebVitals', () => jest.fn());

test('index.js mounts <App/> inside StrictMode on #root', () => {
  mockCreateRoot.mockReturnValue({ render: mockRender });
  document.body.innerHTML = '<div id="root"></div>';
  require('./index');
  expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'));
  const tree = mockRender.mock.calls[0][0];
  expect(tree.type).toBe(require('react').StrictMode);
  expect(tree.props.children.type).toBe(require('./App').default);
  expect(require('./reportWebVitals')).toHaveBeenCalled();
});
