import React from "react";
import renderer from "react-test-renderer";
import SmallScreenEvents from "../SmallScreenEvents";

test("SmallScreenEvents component renders correctly", () => {
    const tree = renderer.create(<SmallScreenEvents />).toJSON();
    expect(tree).toMatchSnapshot();
});
