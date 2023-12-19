# rendermug
Render a mug in JavaScript + GPU.JS

Can handle a [caustic](https://en.wikipedia.org/wiki/Caustic_(optics))! (Only in top-down view with the correct orientation relative to the light source - not visible below - contact me for more info.)

![Picture of rendered mug](https://ryandenlinger.files.wordpress.com/2021/05/rendermug-1.png)

**This is not production quality code.** There are no comments (or tests!), and it uses **eval** for some code generation tasks (there is no reason to do this in runtime).

The code is based on the JavaScript library [GPU.js](https://gpu.rocks/), which transpiles a **subset** of JavaScript down to WebGL; of course, fun features like closure are not allowed in this subset. (There is no way to transpile all of JavaScript to any reasonable low-level code -- Google's V8 engine, for instance, can convert JavaScript into low-level code, but each invocation of a given JavaScript function with different runtime signature results in a new low-level construct, so it is only helpful for JavaScript code that is called in the way machine code is usually called, i.e. with types that are effectively static across all invocations.)

The Ruby code is irrelevant; ignore it (the bootcamp I attended in 2019 used Ruby).

**Note:** although this repo contains no low-level code (like OpenGL or CUDA), I did write actual CUDA code once in a project for school (GPGPU). I am by no means an expert on either computer graphics or GPGPU.

**3D models:**

[Cone](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/Cone.js)

[Annulus](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/Annulus.js)

[Sphere](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/Sphere.js)

**App code**

[Matrix multiply](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/matmul.js)

[Main and keystroke capture](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/index.js)

[CPU render (slow!)](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/MugRenderer.js)

[GPU render](https://github.com/ryanden2018/rendermug/blob/8e09e191a53e6ed007bb225a82d1c73402622bd4/app/assets/javascripts/MugRendererGPU.js)
