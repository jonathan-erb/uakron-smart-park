import{_ as h,v as d}from"./index-Cd8_p_JB.js";import{p as v,W as F,f as T,e as O,Y as A,Z as x,_ as y,ai as f,aB as $,ak as p}from"./Texture-DW_VPLAG.js";import{T as m,d as _,l as M,r as P}from"./renderState-C6Fc3Ut3.js";import{t as n,n as R}from"./glsl-B5bJgrnA.js";import"./vec2f64-rIxtbMRN.js";import{s as B}from"./ShaderBuilder-CrcLTys_.js";import{g as C,r as w}from"./Emissions.glsl-DqzhrWXc.js";function E(t){t.code.add(n`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),t.code.add(n`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),t.code.add(n`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`),t.code.add(n`const vec3 uninterpolatedRGBToFloatFactors = vec3(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBToFloat(vec3 rgb) {
return (dot(round(rgb * 255.0), uninterpolatedRGBToFloatFactors) - 0.5) * 2.0;
}`)}class g extends v{constructor(){super(...arguments),this.opacity=1}}function b(t){const e=new B,{blitEmissiveMode:o,blitMode:a,hasOpacityFactor:r}=t;e.include(F),e.fragment.uniforms.add(new C("tex",c=>c.texture)),r&&e.fragment.uniforms.add(new w("opacity",c=>c.opacity));const i=a===3;i&&(e.fragment.uniforms.add(new T("nearFar",c=>c.camera.nearFar)),e.fragment.include(O),e.fragment.include(E));const s=o===1;return s&&(e.outputs.add("fragColor","vec4",0),e.outputs.add("fragEmission","vec4",1)),e.fragment.main.add(n`
    ${i?n`
          float normalizedLinearDepth = (-linearDepthFromTexture(tex, uv) - nearFar[0]) / (nearFar[1] - nearFar[0]);
          fragColor = float2rgba(normalizedLinearDepth);`:n`
          fragColor = texture(tex, uv) ${r?"* opacity":""};`}
    ${R(s,"fragEmission = vec4(0.0, 0.0, 0.0, fragColor.a);")}`),e}const G=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:g,build:b},Symbol.toStringTag,{value:"Module"}));class l extends A{constructor(e,o){super(e,o,new x(G,()=>h(()=>Promise.resolve().then(()=>S),void 0)),y)}initializePipeline(e){const{blitMode:o,blitEmissiveMode:a}=e,r=a?1:0;switch(o){case 0:case 3:return m({colorWrite:_,drawBuffers:f(0,r)});case 1:return m({blending:P,colorWrite:_,drawBuffers:f(0,r)});default:return m({blending:M,colorWrite:_,drawBuffers:f(0,r)})}}}let u=class extends ${constructor(){super(...arguments),this.blitMode=0,this.blitEmissiveMode=0,this.hasOpacityFactor=!1}};d([p({count:4})],u.prototype,"blitMode",void 0),d([p({count:4})],u.prototype,"blitEmissiveMode",void 0),d([p()],u.prototype,"hasOpacityFactor",void 0);class X{constructor(e,o=0){this._techniques=e,this._parameters=new g,this._configuration=new u,this._configuration.blitMode=o,e.precompile(l,this._configuration),this._configuration.hasOpacityFactor=!0,e.precompile(l,this._configuration),this._configuration.hasOpacityFactor=!1}blit(e,o,a,r){this.blitTexture(e,o.getTexture(),a,r)}blitTexture(e,o,a,r){e.bindFramebuffer(a.fbo),e.setClearColor(0,0,0,1),e.clear(16384),this._parameters.texture=o;const i=this._techniques.get(l,this._configuration);e.bindTechnique(i,r,this._parameters),e.screen.draw()}blend(e,o,a,r,i=1){this._configuration.hasOpacityFactor=i<1;const s=this._techniques.get(l,this._configuration);return!!s.compiled&&(e.bindFramebuffer(a.fbo),this._parameters.texture=o.getTexture(),this._parameters.opacity=i,e.bindTechnique(s,r,this._parameters),e.screen.draw(),!0)}}function V(t){t.code.add(`
  vec4 blendColorsPremultiplied(vec4 source, vec4 dest) {
    float oneMinusSourceAlpha = 1.0 - source.a;
    return source + dest * oneMinusSourceAlpha;
  }
  `)}function N(t,e){return t[0]=e[0]*e[3],t[1]=e[1]*e[3],t[2]=e[2]*e[3],t[3]=e[3],t}const S=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:g,build:b},Symbol.toStringTag,{value:"Module"}));export{u as a,l as c,V as e,g as m,N as n,X as r,E as t};
