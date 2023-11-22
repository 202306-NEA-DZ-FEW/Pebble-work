import React from "react";
import renderer from "react-test-renderer";

import Bubble from "../Bubble";

describe("Bubble component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Bubble />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
