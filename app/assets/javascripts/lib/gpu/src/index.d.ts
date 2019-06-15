export class GPU {
  static isGPUSupported: boolean;
  static isCanvasSupported: boolean;
  static isHeadlessGLSupported: boolean;
  static isWebGLSupported: boolean;
  static isWebGL2Supported: boolean;
  static isKernelMapSupported: boolean;
  static isOffscreenCanvasSupported: boolean;
  static isGPUHTMLImageArraySupported: boolean;
  static isSinglePrecisionSupported: boolean;
  constructor(settings?: IGPUSettings);
  functions: IGPUFunction[];
  nativeFunctions: IGPUNativeFunction[];
  addFunction(kernel: KernelFunction, settings?: IGPUFunctionSettings): this;
  addNativeFunction(name: string, source: string): this;
  combineKernels(...kernels: Function[]): KernelFunction;
  createKernel(kernel: KernelFunction, settings?: IKernelSettings): IKernelRunShortcut;
  createKernelMap(subKernels: Object | Array<Function>, rootKernel: Function, settings?: IKernelSettings): IKernelRunShortcut;
  destroy(): void;
  Kernel: typeof Kernel;
  mode: string;
  canvas: any;
  context: any;
}

export interface IGPUFunction extends IFunctionSettings {
  source: string;
}

export interface IGPUNativeFunction extends IGPUFunctionSettings {
  name: string;
  source: string;
  settings: object;
}

export interface INativeFunctionList {
  [functionName: string]: string
}

export type GPUMode = 'gpu' | 'cpu' | 'dev';
export type GPUInternalMode = 'webgl' | 'webgl2' | 'headlessgl';

export interface IGPUSettings {
  mode?: GPUMode | GPUInternalMode;
  canvas?: object;
  context?: object;
  functions?: KernelFunction[];
  nativeFunctions?: INativeFunctionList;
  // format: 'Float32Array' | 'Float16Array' | 'Float' // WE WANT THIS!
}

export type GPUVariableType
  = 'Array'
  | 'Array(2)'
  | 'Array(3)'
  | 'Array(4)'
  | 'HTMLImage'
  | 'HTMLImageArray'
  | 'Number'
  | 'Float'
  | 'Integer'
  | GPUTextureType;

export type GPUTextureType
  = 'NumberTexture'
  | 'ArrayTexture(4)';

export interface IGPUArgumentTypes {
  [argumentName: string]: GPUVariableType;
}

export interface IGPUFunctionSettings {
  argumentTypes?: IGPUArgumentTypes | string[],
  returnType: GPUVariableType;
}

export abstract class Kernel {
  static isSupported: boolean;
  static isContextMatch(context: any): boolean;
  static disableValidation(): void;
  static enableValidation(): void;
  static nativeFunctionArguments(source: string): IArgumentTypes;
  static nativeFunctionReturnType(source: string): string;
  static destroyContext(context: any): void;
  static features: IKernelFeatures;
  source: string | object;
  Kernel: Kernel;
  output: number[];
  debug: boolean;
  graphical: boolean;
  loopMaxIterations: number;
  constants: IConstants;
  canvas: any;
  context: WebGLRenderingContext | any;
  functions: IFunction[];
  nativeFunctions: INativeFunctionList[];
  subKernels: ISubKernel[];
  skipValidate: boolean;
  immutable: boolean;
  pipeline: boolean;
  plugins: IPlugin[];
  useLegacyEncoder: boolean;
  getPixels(flip?: boolean): number[];
  constructor(kernel: KernelFunction, settings?: IKernelSettings); // TODO: JSON support
  build(
    arg1?: KernelVariable,
    arg2?: KernelVariable,
    arg3?: KernelVariable,
    arg4?: KernelVariable,
    arg5?: KernelVariable,
    arg6?: KernelVariable,
    arg7?: KernelVariable,
    arg8?: KernelVariable,
    arg9?: KernelVariable,
    arg10?: KernelVariable,
    arg11?: KernelVariable,
    arg12?: KernelVariable,
    arg13?: KernelVariable,
    arg14?: KernelVariable,
    arg15?: KernelVariable,
    arg16?: KernelVariable,
    arg17?: KernelVariable,
    arg18?: KernelVariable,
    arg19?: KernelVariable,
    arg20?: KernelVariable): void;
  run(
    arg1?: KernelVariable,
    arg2?: KernelVariable,
    arg3?: KernelVariable,
    arg4?: KernelVariable,
    arg5?: KernelVariable,
    arg6?: KernelVariable,
    arg7?: KernelVariable,
    arg8?: KernelVariable,
    arg9?: KernelVariable,
    arg10?: KernelVariable,
    arg11?: KernelVariable,
    arg12?: KernelVariable,
    arg13?: KernelVariable,
    arg14?: KernelVariable,
    arg15?: KernelVariable,
    arg16?: KernelVariable,
    arg17?: KernelVariable,
    arg18?: KernelVariable,
    arg19?: KernelVariable,
    arg20?: KernelVariable
  ): KernelVariable;
  toString(
    arg1?: KernelVariable,
    arg2?: KernelVariable,
    arg3?: KernelVariable,
    arg4?: KernelVariable,
    arg5?: KernelVariable,
    arg6?: KernelVariable,
    arg7?: KernelVariable,
    arg8?: KernelVariable,
    arg9?: KernelVariable,
    arg10?: KernelVariable,
    arg11?: KernelVariable,
    arg12?: KernelVariable,
    arg13?: KernelVariable,
    arg14?: KernelVariable,
    arg15?: KernelVariable,
    arg16?: KernelVariable,
    arg17?: KernelVariable,
    arg18?: KernelVariable,
    arg19?: KernelVariable,
    arg20?: KernelVariable
  ): string;
  toJSON(): object;
  setOutput(flag: number[]): this;
  setOptimizeFloatMemory(flag: boolean): this;
  setArgumentTypes(flag: any): this;
  setDebug(flag: boolean): this;
  setGraphical(flag: boolean): this;
  setLoopMaxIterations(flag: number): this;
  setConstants(flag: object): this;
  setPipeline(flag: boolean): this;
  setPrecision(flag: Precision): this;
  setImmutable(flag: boolean): this;
  setCanvas(flag: any): this;
  setContext(flag: any): this;
  setFunctions(flag: IFunction[]|KernelFunction[]): this;
  addSubKernel(subKernel: ISubKernel): this;
}

export type Precision = 'single' | 'unsigned';

export class WebGLKernel extends Kernel {

}

export class WebGL2Kernel extends Kernel {

}

export class HeadlessGLKernel extends Kernel {

}

export interface IArgumentTypes {
  argumentTypes: string[],
  argumentNames: string[],
}

export interface IConstants {
  [constantName: string]: KernelVariable;
}

export interface IConstantTypes {
  [constantType: string]: string;
}

export interface IConstantsThis {
  [constantName: string]: ThreadKernelVariable;
}

export interface IKernelXYZ {
  x: number;
  y?: number;
  z?: number;
}

export interface IKernelSettings {
  output?: number[] | IKernelXYZ;
  precision?: 'single' | 'unsigned';
  constants?: object;
  context?: any;
  canvas?: any;
  pipeline?: boolean;
  immutable?: boolean;
  graphical?: boolean;
  onRequestFallback?: () => Kernel;
  optimizeFloatMemory?: boolean;
  dynamicOutput?: boolean;
  dynamicArguments?: boolean;
}

export interface IKernelRunShortcut extends Kernel {
  kernel: Kernel;
  (
    arg1?: KernelVariable,
    arg2?: KernelVariable,
    arg3?: KernelVariable,
    arg4?: KernelVariable,
    arg5?: KernelVariable,
    arg6?: KernelVariable,
    arg7?: KernelVariable,
    arg8?: KernelVariable,
    arg9?: KernelVariable,
    arg10?: KernelVariable,
    arg11?: KernelVariable,
    arg12?: KernelVariable,
    arg13?: KernelVariable,
    arg14?: KernelVariable,
    arg15?: KernelVariable,
    arg16?: KernelVariable,
    arg17?: KernelVariable,
    arg18?: KernelVariable,
    arg19?: KernelVariable,
    arg20?: KernelVariable
  ): KernelOutput;
  exec(): Promise<KernelOutput>;
}

export interface IKernelFeatures {
  isFloatRead: boolean;
  kernelMap: boolean;
  isIntegerDivisionAccurate: boolean;
  isTextureFloat: boolean;
  channelCount: number;
}

export interface IKernelFunctionThis {
  output: IKernelXYZ;
  thread: IKernelXYZ;
  constants: IConstantsThis;
  color(r: number): void,
  color(r: number, g: number): void,
  color(r: number, g: number, b: number): void,
  color(r: number, g: number, b: number, a: number): void,
}

export type KernelVariable =
  boolean
  | number
  | number[]
  | number[][]
  | number[][][]
  | Texture
  | Input
  | HTMLImageElement
  | HTMLImageElement[];

export type ThreadKernelVariable = boolean | number | number[] | number[][] | number[][][];
export type KernelFunction = ((
  this: IKernelFunctionThis,
  arg1?: ThreadKernelVariable,
  arg2?: ThreadKernelVariable,
  arg3?: ThreadKernelVariable,
  arg4?: ThreadKernelVariable,
  arg5?: ThreadKernelVariable,
  arg6?: ThreadKernelVariable,
  arg7?: ThreadKernelVariable,
  arg8?: ThreadKernelVariable,
  arg9?: ThreadKernelVariable,
  arg10?: ThreadKernelVariable,
  arg11?: ThreadKernelVariable,
  arg12?: ThreadKernelVariable,
  arg13?: ThreadKernelVariable,
  arg14?: ThreadKernelVariable,
  arg15?: ThreadKernelVariable,
  arg16?: ThreadKernelVariable,
  arg17?: ThreadKernelVariable,
  arg18?: ThreadKernelVariable,
  arg19?: ThreadKernelVariable,
  arg20?: ThreadKernelVariable,
) => KernelOutput) | object | string;

export type KernelOutput = void | KernelVariable;

export interface IFunction {
  source: string;
  settings: IFunctionSettings;
}

export interface IFunctionSettings {
  name?: string;
  debug?: boolean;
  argumentNames?: string[];
  argumentTypes?: string[];
  argumentSizes?: number[];

  constants?: IConstants;
  constantTypes?: IConstantTypes;

  output?: number[];
  loopMaxIterations?: number;
  returnType?: string;
  isRootKernel?: boolean;
  isSubKernel?: boolean;
  onNestedFunction?(source: string, returnType: string): void;
  lookupReturnType?(functionName: string, ast: any, node: FunctionNode): void;
  plugins?: any[];

  useLegacyEncoder?: boolean;
}

export interface ISubKernel {
  name: string;
  source: string;
  property: string | number;
  returnType: string;
}


export class FunctionBuilder {
  static fromKernel(kernel: IKernelSettings, FunctionNode: FunctionNode, extraNodeOptions?: any): FunctionBuilder;
  constructor(settings: IFunctionBuilderSettings);
  addFunctionNode(functionNode: FunctionNode): void;
  traceFunctionCalls(functionName: string): string[];
  getStringFromFunctionNames(functionName?: string[]): string;
  getPrototypesFromFunctionNames(functionName?: string[]): string[];
  getString(functionName: string): string;
  getPrototypeString(functionName: string): string;
}


export interface IFunctionBuilderSettings {
  kernel: Kernel;
  rootNode: FunctionNode;
  functionNodes?: FunctionNode[];
  nativeFunctions?: INativeFunctionList;
  subKernelNodes?: FunctionNode[];
}

// These are mostly internal
export class FunctionNode implements IFunctionSettings {
  constructor(source: string, settings?: IFunctionSettings);
}

export class WebGLFunctionNode extends FunctionNode {}
export class WebGL2FunctionNode extends WebGLFunctionNode {}
export class CPUFunctionNode extends FunctionNode {}

export interface IGPUTextureSettings {
  texture: WebGLTexture;
  size: number[];
  dimensions: number[];
  output: number[];
  context: WebGLRenderingContext;
  gpu?: GPU;
  type?: GPUTextureType;
}

export class Texture {
  constructor(settings: IGPUTextureSettings)
  toArray(gpu?: GPU): TextureArrayOutput
  delete(): void;
}

export type TextureArrayOutput = number[] | number[][] | number[][][];

export interface IPlugin {
  source: string;
  name: string;
  functionMatch: string;
  functionReplace: string;
  functionReturnType: GPUVariableType;
  onBeforeRun: (kernel: Kernel) => void;
}

export type OutputDimensions = [number, number, number];
export type TextureDimensions = [number, number];

export class Input {
  value: number[];
  size: number[];
  constructor(value: number[], size: OutputDimensions);
}

export type input = (value: number[], size: OutputDimensions) => Input;

export function alias(name: string, source: KernelFunction):KernelFunction;

export class KernelArgument {
  constructor(settings: IKernelArgumentSettings);
  getSource(value: any): string;
  setup(): void;
  updateValue(value: any)
}

export interface IKernelArgumentSettings {
  kernel: Kernel;
  name: string;
  type: GPUVariableType;
  size: number[],
  index: number;
  context: any;
  contextHandle: number;
}

export interface IKernelConstantSettings extends IKernelArgumentSettings {

}

export class WebGLKernelArgument {
  constructor(value: any, settings: IWebGLKernelArgumentSettings);
}

export interface IWebGLKernelArgumentSettings extends IKernelArgumentSettings {
  texture: any;
}

export interface IWebGLKenelConstantSettings extends IWebGLKernelArgumentSettings {

}
