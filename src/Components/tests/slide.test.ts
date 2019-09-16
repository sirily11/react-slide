import { SliderObj, Image, Text, Page } from "../slides/SliderObj";

test("slide test 1", () => {
  let slider = new SliderObj();
  let pageOne: Page = {
    image: {
      src: "some src",
      fullscreen: false
    },
    text: {
      text: "hello",
      isOverlay: false
    }
  };
  slider.fromJSON(JSON.stringify([pageOne, pageOne]), page => {
    expect(page).toBe([pageOne, pageOne]);
  });
  expect(slider.toJSON()).toBe(JSON.stringify([pageOne, pageOne]));
});
