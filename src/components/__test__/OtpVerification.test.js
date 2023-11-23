import React from "react";
import renderer from "react-test-renderer";

import OtpInput from "../OtpVerification";

test("OtpInput snapshot", () => {
    const component = renderer.create(<OtpInput />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
