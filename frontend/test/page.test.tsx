import AboutPage from "@/app/about/page";
import { getByText, render, waitFor } from "@testing-library/react";

it("renders homepage unchanged", async () => {
  const observeSpy = jest.fn();

  global.ResizeObserver = class MockedResizeObserver {
    constructor(cb: ResizeObserverCallback) {
      setTimeout(() => {
        cb(
          [
            {
              contentRect: {
                height,
                width,
              },
            },
          ] as ResizeObserverEntry[],
          this,
        );
      }, 150);
    }
    // Attaching spy to "observe" function.
    observe = observeSpy;
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  const { container } = render(<AboutPage />);
  await waitFor(() => {
    getByText(container, "About");
  });
  expect(container).toMatchSnapshot("fwfqw");
});
