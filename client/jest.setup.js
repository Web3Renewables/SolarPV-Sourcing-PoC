// @testing-library/jest-dom includes a set of convenient custom matchers 
// such as .toBeInTheDocument() making it easier to write tests. 
// We import the custom matchers for every test
import '@testing-library/jest-dom/extend-expect';

process.env.NEXT_PUBLIC_SWITCHBOARD_ROOT_NAMESPACE = "testnamespace.ewc"
process.env.NEXT_PUBLIC_SWITCHBOARD_ORG_NAME =  "testorg"

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }))
});
