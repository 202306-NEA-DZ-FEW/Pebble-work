import React from "react";
import renderer from "react-test-renderer";

import Chat from "../Chat";

describe("Chat component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Chat />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
