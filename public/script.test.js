const funcs = require("./myTestingFile");
// import * as testFile from 'myTestingFile.js'

test('add two numbers', () => {
    expect(funcs.sumNumbers(2,3)).toBe(8);
});

test('multiply', () => {
    expect(funcs.multiply(4,4)).toBe(16);
})
