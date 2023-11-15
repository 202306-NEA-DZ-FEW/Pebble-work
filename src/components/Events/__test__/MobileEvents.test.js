import React from "react";
import renderer from "react-test-renderer";
import EventsPage from "../MobileEvents";

test("EventsPage component renders correctly", () => {
    const tree = renderer.create(<EventsPage />).toJSON();
    expect(tree).toMatchSnapshot();
});
