import React from "react";
import renderer from "react-test-renderer";

import DropMenu from "../DropMenu";

test("DropMenu snapshot", () => {
    const component = renderer.create(<DropMenu />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
