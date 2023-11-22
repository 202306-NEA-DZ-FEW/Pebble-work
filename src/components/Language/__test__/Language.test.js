import React from "react";
import renderer from "react-test-renderer";

import Language from "../Language";

jest.mock("next-i18next", () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

test("Language component matches snapshot", () => {
    const tree = renderer.create(<Language />).toJSON();
    expect(tree).toMatchSnapshot();
});
