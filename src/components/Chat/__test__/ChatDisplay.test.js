import React from "react";
import renderer from "react-test-renderer";

import ChatDisplay from "../ChatDisplay";

describe("ChatDisplay", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<ChatDisplay onNewMessage={() => {}} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
