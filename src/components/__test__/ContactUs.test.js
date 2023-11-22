import React from "react";
import renderer from "react-test-renderer";

import ContactForm from "../ContactUs";

test("ContactForm snapshot", () => {
    const component = renderer.create(<ContactForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
