module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\.(css|less|scss)$': 'identity-obj-proxy'
    }
};

module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
};  