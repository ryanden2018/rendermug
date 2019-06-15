const { assert, skip, test, module: describe, only } = require('qunit');
const { GPU } = require('../../../../../../src');

describe('feature: to-string unsigned precision arguments Array(3)');

function testArgument(mode, context, canvas) {
  const gpu = new GPU({ mode });
  const originalKernel = gpu.createKernel(function(a) {
    let sum = 0;
    for (let z = 0; z < 2; z++) {
      for (let y = 0; y < 2; y++) {
        sum += a[z][y][this.thread.x];
      }
    }
    return sum;
  }, {
    canvas,
    context,
    output: [2],
    precision: 'unsigned',
  });

  const a = [
    [
      [1, 2],
      [3, 4],
    ],
    [
      [5, 6],
      [7, 8],
    ]
  ];
  const expected = new Float32Array([16, 20]);
  const originalResult = originalKernel(a);
  assert.deepEqual(originalResult, expected);
  const kernelString = originalKernel.toString(a);
  const newResult = new Function('return ' + kernelString)()({ context })(a);
  assert.deepEqual(newResult, expected);
  gpu.destroy();
}

(GPU.isWebGLSupported ? test : skip)('webgl', () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl');
  testArgument('webgl', context, canvas);
});

(GPU.isWebGL2Supported ? test : skip)('webgl2', () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2');
  testArgument('webgl2', context, canvas);
});

(GPU.isHeadlessGLSupported ? test : skip)('headlessgl', () => {
  testArgument('headlessgl', require('gl')(1, 1), null);
});

test('cpu', () => {
  testArgument('cpu');
});
