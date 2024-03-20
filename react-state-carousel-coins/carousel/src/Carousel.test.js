import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="Test title" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("moves to the previous image when left arrow is clicked", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="Test title" />);

  // Move forward first to get to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Now move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
});

it("hides the left arrow on the first image and the right arrow on the last image", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="Test title" />);

  // Initially, the left arrow should not be in the document
  expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument();

  // Move to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
    fireEvent.click(rightArrow);
  }

  // Now, the right arrow should not be in the document
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
});


