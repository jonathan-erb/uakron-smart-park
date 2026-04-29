import{ax as Nt,fs as We,aO as kt,_ as Wt,v as E,iZ as wt,bb as bt,an as _,ec as yt,ea as Pt,Z as Yt,eK as $t,at as St,ba as Xt,ef as Zt,dH as Kt,av as Qt,oU as Jt,oi as eo,lX as to,d2 as oo,oV as no,oW as so,oX as io,iU as ao,iS as ro,iT as lo,hc as co,e9 as Je}from"./index-Cd8_p_JB.js";import{n as Ye,r as zt}from"./vec2f64-rIxtbMRN.js";import{o as oe,E as re,A as L,c as Y,g as G,s as N,r as be,p as Ot,u as q,R as uo,N as fo,P as Xe,_ as ne}from"./vec32-VETYHOu5.js";import{a as po,r as ho,u as et,n as Ve,e as tt,t as vo,s as go}from"./vec4f64-DPb6J-GU.js";import{s as At,g as mo}from"./BufferView-HOdJvPnh.js";import{u as Ct,Q as xo,w as wo,a2 as Ze,i as Me,O as bo,an as Mt,v as Dt,a7 as yo,g as Vt,ao as Po,R as $o,U as So,a6 as zo,V as ot,x as _e,ap as Oo,o as te,T as Ao,F as Co,Y as Mo,Z as Do,ai as Vo,ah as jo,aj as To,ak as U,s as _o,aq as Fo,ar as Ro,am as Eo,as as Uo,at as Io,au as Ho,b as nt,av as Bo,aw as st,ax as it,ay as Go,az as Lo,aA as at,n as Z,m as k}from"./Texture-DW_VPLAG.js";import{t as qo}from"./Intersector-CiT9nvWH.js";import{r as Be,i as No,g as rt,o as jt,p as Fe}from"./Emissions.glsl-DqzhrWXc.js";import{g as ko,r as Wo,l as Yo,f as Xo}from"./VertexColor.glsl-BDtv_zhR.js";import{Q as Tt,t as Zo}from"./InterleavedLayout-br6BkSaO.js";import{_ as lt}from"./enums-DQOO6RKE.js";import{T as Ko,d as Qo,c as Jo}from"./renderState-C6Fc3Ut3.js";import{t as en}from"./VertexAttributeLocations-BfZbt_DV.js";import{m as tn,s as on}from"./vec42-BA6HlmQU.js";import{$ as nn}from"./projectionUtils-azzYKFIU.js";import{u as sn}from"./meshVertexSpaceUtils-CYF-QoCc.js";import{t as Ke}from"./projectVectorToVector-KGTC6iqG.js";import{o as an,x as rn}from"./hydratedFeatures-CW_GHrP9.js";import{r as H,n as X,t as ct}from"./vec3f32-WCVSSNPR.js";import{A as ln,U as _t}from"./Indices-DqwhNpoY.js";import{j as cn,U as un,K as fn}from"./plane-BAnInlVS.js";import{k as pn}from"./sphere-C3pIbUU1.js";import{t as C}from"./orientedBoundingBox-C_YFKTl4.js";import{t as $,n as I}from"./glsl-B5bJgrnA.js";import{s as dn}from"./ShaderBuilder-CrcLTys_.js";function hn(o){return o instanceof Float32Array&&o.length>=16}function vn(o){return Array.isArray(o)&&o.length>=16}function gn(o){return hn(o)||vn(o)}const Ft=.5;function mn(o,e){o.include(Ct),o.attributes.add("position","vec3"),o.attributes.add("normal","vec3"),o.attributes.add("centerOffsetAndDistance","vec4");const n=o.vertex;xo(n,e),wo(n,e),n.uniforms.add(new Ze("viewport",t=>t.camera.fullViewport),new Be("polygonOffset",t=>t.shaderPolygonOffset),new Me("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),e.hasVerticalOffset&&ko(n),n.code.add($`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),n.code.add($`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${e.terrainDepthTest?$.float(0):$`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),e.draped&&!e.hasVerticalOffset||bo(n),e.draped||(n.uniforms.add(new Me("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),n.code.add($`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${$.float(Ft)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),e.screenCenterOffsetUnitsEnabled&&Mt(n),e.hasScreenSizePerspective&&Dt(n),n.code.add($`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${e.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${e.hasScreenSizePerspective&&(e.hasVerticalOffset||e.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${e.hasVerticalOffset?e.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${e.hasVerticalOffset?$`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${e.screenCenterOffsetUnitsEnabled?"":$`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${e.screenCenterOffsetUnitsEnabled?e.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${e.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Qe(o){o.uniforms.add(new Wo("alignPixelEnabled",e=>e.alignPixelEnabled)),o.code.add($`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),o.code.add($`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function xn(o,e){const{vertex:n,fragment:t}=o;o.include(yo,e),n.include(Qe),n.main.add($`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),t.main.add($`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function wn(o){o.vertex.uniforms.add(new Me("renderTransparentlyOccludedHUD",e=>e.hudRenderStyle===0?1:e.hudRenderStyle===1?0:.75),new Ze("viewport",e=>e.camera.fullViewport),new Vt("hudVisibilityTexture",e=>e.hudVisibility?.getTexture())),o.vertex.include(Qe),o.vertex.code.add($`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}let bn=class extends No{constructor(e,n,t){super(e,"vec4",2,(s,a,i)=>s.setUniform4fv(e,n(a,i),t))}};function Rt(o){const e=new dn,{signedDistanceFieldEnabled:n,occlusionTestEnabled:t,horizonCullingEnabled:s,pixelSnappingEnabled:a,hasScreenSizePerspective:i,debugDrawLabelBorder:l,hasVVSize:h,hasVVColor:r,hasRotation:p,occludedFragmentFade:c,sampleSignedDistanceFieldTexelCenter:f}=o;e.include(mn,o),e.vertex.include(Po,o);const{occlusionPass:b,output:y,oitPass:m}=o;if(b)return e.include(xn,o),e;const{vertex:d,fragment:v}=e;e.include(Ct),e.include($o,o),e.include(So,o),t&&e.include(wn),v.include(zo),e.varyings.add("vcolor","vec4"),e.varyings.add("vtc","vec2"),e.varyings.add("vsize","vec2");const x=y===9,g=x&&t;g&&e.varyings.add("voccluded","float"),d.uniforms.add(new Ze("viewport",P=>P.camera.fullViewport),new ot("screenOffset",(P,B)=>We($e,2*P.screenOffset[0]*B.camera.pixelRatio,2*P.screenOffset[1]*B.camera.pixelRatio)),new ot("anchorPosition",P=>ge(P)),new _e("materialColor",P=>P.color),new Be("materialRotation",P=>P.rotation),new rt("tex",P=>P.texture)),Mt(d),n&&(d.uniforms.add(new _e("outlineColor",P=>P.outlineColor)),v.uniforms.add(new _e("outlineColor",P=>ut(P)?P.outlineColor:po),new Be("outlineSize",P=>ut(P)?P.outlineSize:0))),s&&d.uniforms.add(new bn("pointDistanceSphere",(P,B)=>{const w=B.camera.eye,j=P.origin;return ho(j[0]-w[0],j[1]-w[1],j[2]-w[2],kt.radius)})),a&&d.include(Qe),i&&(Oo(d),Dt(d)),l&&e.varyings.add("debugBorderCoords","vec4"),e.attributes.add("uv0","vec2"),e.attributes.add("uvi","vec4"),e.attributes.add("color","vec4"),e.attributes.add("size","vec2"),e.attributes.add("rotation","float"),(h||r)&&e.attributes.add("featureAttribute","vec4"),d.code.add(s?$`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:$`bool behindHorizon(vec3 posModel) { return false; }`),d.main.add($`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${I(i,$`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,$`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${I(h,$`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${I(t,$`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${I(l,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${I(g,$`voccluded = visible ? 0.0 : 1.0;`)}
  `);const A=$`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${Pn})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${I(p,$`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,u=a?n?$`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:$`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:$`posProj += quadOffset;`;d.main.add($`
    ${A}
    ${r?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${I(y===10,$`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${$.float(te)};
    ${I(n,`alphaDiscard = alphaDiscard && outlineColor.a < ${$.float(te)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${u}
      gl_Position = posProj;
    }

    vtc = uv;

    ${I(l,$`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),v.uniforms.add(new rt("tex",P=>P.texture)),c&&!x&&v.uniforms.add(new Vt("depthMap",P=>P.mainDepth),new Me("occludedOpacity",P=>P.hudOccludedFragmentOpacity));const z=l?$`(isBorder > 0.0 ? 0.0 : ${$.float(te)})`:$.float(te),O=$`
    ${I(l,$`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${I(f,$`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${n?$`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${z} ||
          fillPixelColor.a + outlinePixelColor.a < ${$.float(te)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${I(!x,$`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${z}) {
          discard;
        }

        ${I(!x,$`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:$`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${z}) {
            discard;
          }
          ${I(!x,$`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${I(c&&!x,$`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${I(!x&&l,$`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(y){case 0:case 1:e.outputs.add("fragColor","vec4",0),y===1&&e.outputs.add("fragEmission","vec4",1),m===1&&e.outputs.add("fragAlpha","float",y===1?2:1),v.main.add($`
        ${O}
        ${I(m===2,$`fragColor.rgb /= fragColor.a;`)}
        ${I(y===1,$`fragEmission = vec4(0.0);`)}
        ${I(m===1,$`fragAlpha = fragColor.a;`)}`);break;case 10:v.main.add($`
        ${O}
        outputObjectAndLayerIdColor();`);break;case 9:e.include(Ao,o),v.main.add($`
        ${O}
        outputHighlight(${I(g,$`voccluded == 1.0`,$`false`)});`)}return e}function ut(o){return o.outlineColor[3]>0&&o.outlineSize>0}function ge(o){return o.textureIsSignedDistanceField?yn(o.anchorPosition,o.distanceFieldBoundingBox,$e):Nt($e,o.anchorPosition),$e}function yn(o,e,n){We(n,o[0]*(e[2]-e[0])+e[0],o[1]*(e[3]-e[1])+e[1])}const $e=Ye(),ye=32e3,Pn=$.float(ye),$n=Object.freeze(Object.defineProperty({__proto__:null,build:Rt,calculateAnchorPosition:ge,fullUV:ye},Symbol.toStringTag,{value:"Module"}));class Sn extends Mo{constructor(e,n){super(e,n,new Do($n,()=>Wt(()=>Promise.resolve().then(()=>ts),void 0)),en([Et,It()].map(Zo))),this.primitiveType=n.occlusionPass?lt.POINTS:lt.TRIANGLE_STRIP}initializePipeline(e){const{oitPass:n,hasPolygonOffset:t,draped:s,output:a,depthTestEnabled:i,occlusionPass:l}=e,h=i&&!s&&n!==1&&!l&&a!==9;return Ko({blending:jt(a)?jo(n,!0):null,depthTest:i&&!s?{func:515}:null,depthWrite:h?Jo:null,drawBuffers:Vo(n,a),colorWrite:Qo,polygonOffset:t?zn:null})}}const zn={factor:0,units:-4},Et=Tt().vec2u8("uv0",{glNormalized:!0}),Ut=Tt().vec3f("position").vec3f("normal").vec4i16("uvi").vec4u8("color").vec2f("size").f32("rotation").vec4f("centerOffsetAndDistance").vec4f("featureAttribute"),On=Ut.clone().vec4u8("olidColor");function It(){return Co()?On:Ut}class F extends To{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1}}E([U()],F.prototype,"screenCenterOffsetUnitsEnabled",void 0),E([U()],F.prototype,"occlusionTestEnabled",void 0),E([U()],F.prototype,"signedDistanceFieldEnabled",void 0),E([U()],F.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),E([U()],F.prototype,"hasVVSize",void 0),E([U()],F.prototype,"hasVVColor",void 0),E([U()],F.prototype,"hasVerticalOffset",void 0),E([U()],F.prototype,"hasScreenSizePerspective",void 0),E([U()],F.prototype,"hasRotation",void 0),E([U()],F.prototype,"debugDrawLabelBorder",void 0),E([U()],F.prototype,"hasPolygonOffset",void 0),E([U()],F.prototype,"depthTestEnabled",void 0),E([U()],F.prototype,"pixelSnappingEnabled",void 0),E([U()],F.prototype,"draped",void 0),E([U()],F.prototype,"terrainDepthTest",void 0),E([U()],F.prototype,"cullAboveTerrain",void 0),E([U()],F.prototype,"occlusionPass",void 0),E([U()],F.prototype,"occludedFragmentFade",void 0),E([U()],F.prototype,"horizonCullingEnabled",void 0),E([U()],F.prototype,"isFocused",void 0);class Cs extends _o{constructor(e,n){super(e,Tn),this.produces=new Map([[13,t=>Fe(t)&&!this.parameters.drawAsLabel],[14,t=>Fe(t)&&this.parameters.drawAsLabel],[12,()=>this.parameters.occlusionTest],[18,t=>this.parameters.draped&&Fe(t)]]),this._visible=!0,this._configuration=new F(n)}getConfiguration(e,n){const t=this.parameters.draped;return super.getConfiguration(e,n,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=t,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=n.slot===12,this._configuration.occludedFragmentFade=!t&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||n.slot===12,jt(e)&&(this._configuration.debugDrawLabelBorder=!!qo.LABELS_SHOW_BORDER),this._configuration.oitPass=n.oitPass,this._configuration.terrainDepthTest=n.terrainDepthTest,this._configuration.cullAboveTerrain=n.cullAboveTerrain,this._configuration}intersect(e,n,t,s,a,i){const{options:{selectionMode:l,hud:h,excludeLabels:r},point:p,camera:c}=t,{parameters:f}=this;if(!l||!h||r&&f.isLabel||!e.visible||!p||!c)return;const b=e.attributes.get("featureAttribute"),y=b==null?null:et(b.data,qe),{scaleX:m,scaleY:d}=Ne(y,f,c.pixelRatio);wt(Se,n),e.attributes.has("featureAttribute")&&Mn(Se);const v=e.attributes.get("position"),x=e.attributes.get("size"),g=e.attributes.get("normal"),A=e.attributes.get("rotation"),u=e.attributes.get("centerOffsetAndDistance");At(v.size>=3);const z=ge(f),O=this.parameters.centerOffsetUnits==="screen";for(let P=0;P<v.data.length/v.size;P++){const B=P*v.size;oe(M,v.data[B],v.data[B+1],v.data[B+2]),re(M,M,n),re(M,M,c.viewMatrix);const w=P*u.size;if(oe(T,u.data[w],u.data[w+1],u.data[w+2]),!O&&(M[0]+=T[0],M[1]+=T[1],T[2]!==0)){const V=T[2];L(T,M),Y(M,M,G(T,T,V))}const j=P*g.size;if(oe(ae,g.data[j],g.data[j+1],g.data[j+2]),Ge(ae,Se,c,we),ke(this.parameters,M,we,c,pe),c.applyProjection(M,D),D[0]>-1){O&&(T[0]||T[1])&&(D[0]+=T[0]*c.pixelRatio,T[1]!==0&&(D[1]+=pe.alignmentEvaluator.apply(T[1])*c.pixelRatio),c.unapplyProjection(D,M)),D[0]+=this.parameters.screenOffset[0]*c.pixelRatio,D[1]+=this.parameters.screenOffset[1]*c.pixelRatio,D[0]=Math.floor(D[0]),D[1]=Math.floor(D[1]);const V=P*x.size;R[0]=x.data[V],R[1]=x.data[V+1],pe.evaluator.applyVec2(R,R);const K=Gt*c.pixelRatio;let le=0;f.textureIsSignedDistanceField&&(le=Math.min(f.outlineSize,.5*R[0])*c.pixelRatio/2),R[0]*=m,R[1]*=d;const Q=P*A.size,W=f.rotation+A.data[Q];if(Le(p,D[0],D[1],R,K,le,W,f,z)){const se=t.ray;if(re(De,M,yt(Bt,c.viewMatrix)),D[0]=p[0],D[1]=p[1],c.unprojectFromRenderScreen(D,M)){const S=_();N(S,se.direction);const me=1/be(S);G(S,S,me),i(Ot(se.origin,M)*me,S,-1,De)}}}}}intersectDraped(e,n,t,s,a){const i=e.attributes.get("position"),l=e.attributes.get("size"),h=e.attributes.get("rotation"),r=this.parameters,p=ge(r),c=e.attributes.get("featureAttribute"),f=c==null?null:et(c.data,qe),{scaleX:b,scaleY:y}=Ne(f,r,e.screenToWorldRatio),m=Vn*e.screenToWorldRatio;for(let d=0;d<i.data.length/i.size;d++){const v=d*i.size,x=i.data[v],g=i.data[v+1],A=d*l.size;R[0]=l.data[A],R[1]=l.data[A+1];let u=0;r.textureIsSignedDistanceField&&(u=Math.min(r.outlineSize,.5*R[0])*e.screenToWorldRatio/2),R[0]*=b,R[1]*=y;const z=d*h.size,O=r.rotation+h.data[z];Le(t,x,g,R,m,u,O,r,p)&&s(a.distance,a.normal,-1)}}createBufferWriter(){return new _n}applyShaderOffsetsView(e,n,t,s,a,i,l){const h=Ge(n,t,a,we);return this._applyVerticalGroundOffsetView(e,h,a,l),ke(this.parameters,l,h,a,i),this._applyPolygonOffsetView(l,h,s[3],a,l),this._applyCenterOffsetView(l,s,l),l}applyShaderOffsetsNDC(e,n,t,s,a){return this._applyCenterOffsetNDC(e,n,t,s),a!=null&&N(a,s),this._applyPolygonOffsetNDC(s,n,t,s),s}_applyPolygonOffsetView(e,n,t,s,a){const i=s.aboveGround?1:-1;let l=Math.sign(t);l===0&&(l=i);const h=i*l;if(this.parameters.shaderPolygonOffset<=0)return N(a,e);const r=Yt(Math.abs(n.cosAngle),.01,1),p=1-Math.sqrt(1-r*r)/r/s.viewport[2];return G(a,e,h>0?p:1/p),a}_applyVerticalGroundOffsetView(e,n,t,s){const a=be(e),i=t.aboveGround?1:-1,l=t.computeRenderPixelSizeAtDist(a)*Ft,h=G(M,n.normal,i*l);return q(s,e,h),s}_applyCenterOffsetView(e,n,t){const s=this.parameters.centerOffsetUnits!=="screen";return t!==e&&N(t,e),s&&(t[0]+=n[0],t[1]+=n[1],n[2]&&(L(ae,t),uo(t,t,G(ae,ae,n[2])))),t}_applyCenterOffsetNDC(e,n,t,s){const a=this.parameters.centerOffsetUnits!=="screen";return s!==e&&N(s,e),a||(s[0]+=n[0]/t.fullWidth*2,s[1]+=n[1]/t.fullHeight*2),s}_applyPolygonOffsetNDC(e,n,t,s){const a=this.parameters.shaderPolygonOffset;if(e!==s&&N(s,e),a){const i=t.aboveGround?1:-1,l=i*Math.sign(n[3]);s[2]-=(l||i)*a}return s}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:n,outlineColor:t}=this.parameters,s=e[3]>=te||n>=te&&t[3]>=te;return this._visible&&s}createGLMaterial(e){return new An(e)}calculateRelativeScreenBounds(e,n,t=$t()){return Cn(this.parameters,e,n,t),t[2]=t[0]+e[0],t[3]=t[1]+e[1],t}}class An extends Xo{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Sn,e)}}function Cn(o,e,n,t){t[0]=o.anchorPosition[0]*-e[0]+o.screenOffset[0]*n,t[1]=o.anchorPosition[1]*-e[1]+o.screenOffset[1]*n}function Ge(o,e,n,t){return gn(e)&&(e=wt(Dn,e)),fo(t.normal,o,e),re(t.normal,t.normal,n.viewInverseTransposeMatrix),t.cosAngle=Xe(Ht,jn),t}function Mn(o){const e=o[0],n=o[1],t=o[2],s=o[3],a=o[4],i=o[5],l=o[6],h=o[7],r=o[8],p=1/Math.sqrt(e*e+n*n+t*t),c=1/Math.sqrt(s*s+a*a+i*i),f=1/Math.sqrt(l*l+h*h+r*r);return o[0]=e*p,o[1]=n*p,o[2]=t*p,o[3]=s*c,o[4]=a*c,o[5]=i*c,o[6]=l*f,o[7]=h*f,o[8]=r*f,o}function Le(o,e,n,t,s,a,i,l,h){let r=e-s-t[0]*h[0],p=r+t[0]+2*s,c=n-s-t[1]*h[1],f=c+t[1]+2*s;const b=l.distanceFieldBoundingBox;return l.textureIsSignedDistanceField&&b!=null&&(r+=t[0]*b[0],c+=t[1]*b[1],p-=t[0]*(1-b[2]),f-=t[1]*(1-b[3]),r-=a,p+=a,c-=a,f+=a),We(ft,e,n),Xt(xe,o,ft,Zt(i)),xe[0]>r&&xe[0]<p&&xe[1]>c&&xe[1]<f}const pe=new Fo,M=_(),ae=_(),D=Ve(),Ht=_(),De=_(),xe=Ye(),ft=Ye(),Se=bt(),Dn=bt(),Bt=Pt(),Pe=Ve(),T=_(),Re=_(),qe=Ve(),we={normal:Ht,cosAngle:0},Gt=1,Vn=2,R=zt(0,0),jn=St(0,0,1);class Tn extends Yo{constructor(){super(...arguments),this.renderOccluded=1,this.isDecoration=!1,this.color=tt(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=zt(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=tt(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=Ve(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class _n{constructor(){this.layout=Et,this.instanceLayout=It()}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,n,t,s,a,i){const{position:l,normal:h,color:r,size:p,rotation:c,centerOffsetAndDistance:f,featureAttribute:b,uvi:y}=a;Uo(t.get("position"),e,l,i),Io(t.get("normal"),n,h,i);const m=t.get("position").indices.length;let d=0,v=0,x=ye,g=ye;const A=t.get("uvi")?.data;A&&A.length>=4&&(d=A[0],v=A[1],x=A[2],g=A[3]);for(let u=0;u<m;++u){const z=i+u;y.setValues(z,d,v,x,g)}if(Ho(t.get("color"),4,r,i),nt(t.get("size"),p,i),Bo(t.get("rotation"),c,i),t.get("centerOffsetAndDistance")?st(t.get("centerOffsetAndDistance"),f,i):it(f,i,m),t.get("featureAttribute")?st(t.get("featureAttribute"),b,i):it(b,i,m),s!=null){const u=t.get("position")?.indices;if(u){const z=u.length,O=a.getField("olidColor",mo);Go(s,O,z,i)}}return{numVerticesPerItem:1,numItems:m}}writeBaseInstance(e,n){const{uv0:t}=n;nt(e.get("uv0"),t,0)}intersect(e,n,t,s,a,i,l){const{options:{selectionMode:h,hud:r,excludeLabels:p},point:c,camera:f}=s;if(!h||!r||p&&n.isLabel||!c)return;const b=this.instanceLayout.createView(e),{position:y,normal:m,rotation:d,size:v,featureAttribute:x,centerOffsetAndDistance:g}=b,A=n.centerOffsetUnits==="screen",u=ge(n);if(y==null||m==null||d==null||v==null||g==null||f==null)return;const z=x==null?null:x.getVec(0,qe),{scaleX:O,scaleY:P}=Ne(z,n,f.pixelRatio),B=y.count;for(let w=0;w<B;w++){if(y.getVec(w,M),t!=null&&q(M,M,t),re(M,M,f.viewMatrix),g.getVec(w,Pe),oe(T,Pe[0],Pe[1],Pe[2]),!A&&(M[0]+=T[0],M[1]+=T[1],T[2]!==0)){const j=T[2];L(T,M),Y(M,M,G(T,T,j))}if(m.getVec(w,ae),Ge(ae,Se,f,we),ke(n,M,we,f,pe),f.applyProjection(M,D),D[0]>-1){A&&(T[0]||T[1])&&(D[0]+=T[0]*f.pixelRatio,T[1]!==0&&(D[1]+=pe.alignmentEvaluator.apply(T[1])*f.pixelRatio),f.unapplyProjection(D,M)),D[0]+=n.screenOffset[0]*f.pixelRatio,D[1]+=n.screenOffset[1]*f.pixelRatio,D[0]=Math.floor(D[0]),D[1]=Math.floor(D[1]),v.getVec(w,R),pe.evaluator.applyVec2(R,R);const j=Gt*f.pixelRatio;let V=0;n.textureIsSignedDistanceField&&(V=Math.min(n.outlineSize,.5*R[0])*f.pixelRatio/2),R[0]*=O,R[1]*=P;const K=d.get(w),le=n.rotation+K;if(Le(c,D[0],D[1],R,j,V,le,n,u)){const Q=s.ray;if(re(De,M,yt(Bt,f.viewMatrix)),D[0]=c[0],D[1]=c[1],f.unprojectFromRenderScreen(D,M)){const W=_();N(W,Q.direction);const se=1/be(W);G(W,W,se),l(Ot(Q.origin,M)*se,W,w,De)}}}}}}function Ne(o,e,n){return o==null||e.vvSize==null?{scaleX:n,scaleY:n}:(Ro(Re,e,o),{scaleX:Re[0]*n,scaleY:Re[1]*n})}function ke(o,e,n,t,s){if(!o.verticalOffset?.screenLength){const h=be(e);return s.update(n.cosAngle,h,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),e}const a=be(e),i=o.screenSizePerspectiveAlignment??o.screenSizePerspective,l=Eo(t,a,o.verticalOffset,n.cosAngle,i,o.screenSizePerspectiveMinPixelReferenceSize);return s.update(n.cosAngle,a,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),G(n.normal,n.normal,l),q(e,e,n.normal)}function Ms(o,e){if(o.type==="point")return ee(o,e,!1);if(an(o))switch(o.type){case"extent":return ee(o.center,e,!1);case"polygon":return ee(dt(o),e,!1);case"polyline":return ee(pt(o),e,!0);case"mesh":return ee(sn(o.vertexSpace,o.spatialReference)??o.extent.center,e,!1);case"multipoint":return}else switch(o.type){case"extent":return ee(Fn(o),e,!0);case"polygon":return ee(dt(o),e,!0);case"polyline":return ee(pt(o),e,!0);case"multipoint":return}}function pt(o){const e=o.paths[0];if(!e||e.length===0)return null;const n=Jt(e,eo(e)/2);return Ke(n[0],n[1],n[2],o.spatialReference)}function Fn(o){return Ke(.5*(o.xmax+o.xmin),.5*(o.ymax+o.ymin),o.zmin!=null&&o.zmax!=null&&isFinite(o.zmin)&&isFinite(o.zmax)?.5*(o.zmax+o.zmin):void 0,o.spatialReference)}function dt(o){const e=o.rings[0];if(!e||e.length===0)return null;const n=to(o.rings,!!o.hasZ);return Ke(n[0],n[1],n[2],o.spatialReference)}function ee(o,e,n){const t=n?o:rn(o);return e&&o?nn(o,t,e)?t:null:t}function Ds(o){if(!o)return 0;switch(o.type){case"point":return o.z;case"extent":return o.zmax;case"polygon":return o.hasZ?o.rings.reduce((e,n)=>n.reduce((t,s)=>Math.max(t,s[2]),e),-1/0):void 0;case"polyline":return o.hasZ?o.paths.reduce((e,n)=>n.reduce((t,s)=>Math.max(t,s[2]),e),-1/0):void 0;case"mesh":return o.extent.zmax;case"multipoint":return}}function Vs(o,e,n,t=0){if(o){e||(e=$t());const s=o;let a=.5*s.width*(n-1),i=.5*s.height*(n-1);return s.width<1e-7*s.height?a+=i/20:s.height<1e-7*s.width&&(i+=a/20),on(e,s.xmin-a-t,s.ymin-i-t,s.xmax+a+t,s.ymax+i+t),e}return null}function js(o,e,n=null){const t=vo(go);return o!=null&&(t[0]=o[0],t[1]=o[1],t[2]=o[2],o.length>3&&(t[3]=o[3])),e!=null&&(t[3]=e),n&&tn(t,t,n),t}function Ts(o,e,n,t,s,a){for(let i=0;i<3;++i)a[i]=o?.[i]!=null?o[i]:n?.[i]!=null?n[i]:s[i];return a[3]=e??t??s[3],a}function _s(o=Kt,e,n,t=1){const s=new Array(3);if(e==null||n==null)s[0]=1,s[1]=1,s[2]=1;else{let a,i=0;for(let l=2;l>=0;l--){const h=o[l],r=h!=null,p=l===0&&!a&&!r,c=n[l];let f;h==="symbol-value"||p?f=c!==0?e[l]/c:1:r&&h!=="proportional"&&isFinite(h)&&(f=c!==0?h/c:1),f!=null&&(s[l]=f,a=f,i=Math.max(i,Math.abs(f)))}for(let l=2;l>=0;l--)s[l]==null?s[l]=a:s[l]===0&&(s[l]=.001*i)}for(let a=2;a>=0;a--)s[a]/=t;return Qt(s)}function Rn(o){return o.isPrimitive!=null}function Fs(o){return En(Rn(o)?[o.width,o.depth,o.height]:o)?null:"Symbol sizes may not be negative values"}function En(o){const e=n=>n==null||n>=0;return Array.isArray(o)?o.every(e):e(o)}function Rs(o,e,n,t=Pt()){return o&&ao(t,t,-o/180*Math.PI),e&&ro(t,t,e/180*Math.PI),n&&lo(t,t,n/180*Math.PI),t}function Es(o,e,n){if(n.minDemResolution!=null)return n.minDemResolution;const t=oo(e),s=no(o)*t,a=so(o)*t,i=io(o)*(e.isGeographic?1:t);return s===0&&a===0&&i===0?n.minDemResolutionForPoints:.01*Math.max(s,a,i)}function ht(o,e){const n=o[e],t=o[e+1],s=o[e+2];return Math.sqrt(n*n+t*t+s*s)}function Un(o,e){const n=o[e],t=o[e+1],s=o[e+2],a=1/Math.sqrt(n*n+t*t+s*s);o[e]*=a,o[e+1]*=a,o[e+2]*=a}function vt(o,e,n){o[e]*=n,o[e+1]*=n,o[e+2]*=n}function In(o,e,n,t,s,a=e){(s=s||o)[a]=o[e]+n[t],s[a+1]=o[e+1]+n[t+1],s[a+2]=o[e+2]+n[t+2]}function Hn(){return gt??=Bn(),gt}function Bn(){const n=new C([0,0,0,255,255,0,255,255],[0,1,2,3],2,!0);return new Lo([["uv0",n]])}let gt=null;const Ee=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],Gn=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],Ln=[0,0,1,0,1,1,0,1],qn=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Lt=new Array(36);for(let o=0;o<6;o++)for(let e=0;e<6;e++)Lt[6*o+e]=o;const ie=new Array(36);for(let o=0;o<6;o++)ie[6*o]=0,ie[6*o+1]=1,ie[6*o+2]=2,ie[6*o+3]=2,ie[6*o+4]=3,ie[6*o+5]=0;function Us(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(24);for(let t=0;t<8;t++)n[3*t]=Ee[t][0]*e[0],n[3*t+1]=Ee[t][1]*e[1],n[3*t+2]=Ee[t][2]*e[2];return new k(o,[["position",new C(n,qn,3,!0)],["normal",new C(Gn,Lt,3)],["uv0",new C(Ln,ie,2)]])}const Ue=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],Nn=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],kn=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Wn=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function Is(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(18);for(let t=0;t<6;t++)n[3*t]=Ue[t][0]*e[0],n[3*t+1]=Ue[t][1]*e[1],n[3*t+2]=Ue[t][2]*e[2];return new k(o,[["position",new C(n,kn,3,!0)],["normal",new C(Nn,Wn,3)]])}const ze=H(-.5,0,-.5),Oe=H(.5,0,-.5),Ae=H(0,0,.5),Ce=H(0,.5,0),ce=X(),ue=X(),de=X(),he=X(),ve=X();Y(ce,ze,Ce),Y(ue,ze,Oe),ne(de,ce,ue),L(de,de),Y(ce,Oe,Ce),Y(ue,Oe,Ae),ne(he,ce,ue),L(he,he),Y(ce,Ae,Ce),Y(ue,Ae,ze),ne(ve,ce,ue),L(ve,ve);const Ie=[ze,Oe,Ae,Ce],Yn=[0,-1,0,de[0],de[1],de[2],he[0],he[1],he[2],ve[0],ve[1],ve[2]],Xn=[0,1,2,3,1,0,3,2,1,3,0,2],Zn=[0,0,0,1,1,1,2,2,2,3,3,3];function Hs(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(12);for(let t=0;t<4;t++)n[3*t]=Ie[t][0]*e[0],n[3*t+1]=Ie[t][1]*e[1],n[3*t+2]=Ie[t][2]*e[2];return new k(o,[["position",new C(n,Xn,3,!0)],["normal",new C(Yn,Zn,3)]])}function Bs(o,e,n,t,s={uv:!0}){const a=-Math.PI,i=2*Math.PI,l=-Math.PI/2,h=Math.PI,r=Math.max(3,Math.floor(n)),p=Math.max(2,Math.floor(t)),c=(r+1)*(p+1),f=Z(3*c),b=Z(3*c),y=Z(2*c),m=[];let d=0;for(let g=0;g<=p;g++){const A=[],u=g/p,z=l+u*h,O=Math.cos(z);for(let P=0;P<=r;P++){const B=P/r,w=a+B*i,j=Math.cos(w)*O,V=Math.sin(z),K=-Math.sin(w)*O;f[3*d]=j*e,f[3*d+1]=V*e,f[3*d+2]=K*e,b[3*d]=j,b[3*d+1]=V,b[3*d+2]=K,y[2*d]=B,y[2*d+1]=u,A.push(d),++d}m.push(A)}const v=new Array;for(let g=0;g<p;g++)for(let A=0;A<r;A++){const u=m[g][A],z=m[g][A+1],O=m[g+1][A+1],P=m[g+1][A];g===0?(v.push(u),v.push(O),v.push(P)):g===p-1?(v.push(u),v.push(z),v.push(O)):(v.push(u),v.push(z),v.push(O),v.push(O),v.push(P),v.push(u))}const x=[["position",new C(f,v,3,!0)],["normal",new C(b,v,3,!0)]];return s.uv&&x.push(["uv0",new C(y,v,2,!0)]),s.offset&&(x[0][0]="offset",x.push(["position",new C(Float64Array.from(s.offset),_t(v.length),3,!0)])),new k(o,x)}function Gs(o,e,n,t){const s=Kn(e,n,t);return new k(o,s)}function Kn(o,e,n){const t=o;let s,a;if(n)s=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],a=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];else{const r=t*(1+Math.sqrt(5))/2;s=[-t,r,0,t,r,0,-t,-r,0,t,-r,0,0,-t,r,0,t,r,0,-t,-r,0,t,-r,r,0,-t,r,0,t,-r,0,-t,-r,0,t],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1]}for(let r=0;r<s.length;r+=3)vt(s,r,o/ht(s,r));let i={};function l(r,p){r>p&&([r,p]=[p,r]);const c=r.toString()+"."+p.toString();if(i[c])return i[c];let f=s.length;return s.length+=3,In(s,3*r,s,3*p,s,f),vt(s,f,o/ht(s,f)),f/=3,i[c]=f,f}for(let r=0;r<e;r++){const p=a.length,c=new Array(4*p);for(let f=0;f<p;f+=3){const b=a[f],y=a[f+1],m=a[f+2],d=l(b,y),v=l(y,m),x=l(m,b),g=4*f;c[g]=b,c[g+1]=d,c[g+2]=x,c[g+3]=y,c[g+4]=v,c[g+5]=d,c[g+6]=m,c[g+7]=x,c[g+8]=v,c[g+9]=d,c[g+10]=v,c[g+11]=x}a=c,i={}}const h=at(s);for(let r=0;r<h.length;r+=3)Un(h,r);return[["position",new C(at(s),a,3,!0)],["normal",new C(h,a,3,!0)]]}function Ls(o,{normal:e,position:n,color:t,rotation:s,size:a,centerOffsetAndDistance:i,uvi:l,featureAttribute:h,olidColor:r=null}={}){const p=n?Je(n):_(),c=e?Je(e):St(0,0,1),f=t?[t[0],t[1],t[2],t.length>3?t[3]:255]:[255,255,255,255],b=a!=null&&a.length===2?a:[1,1],y=s!=null?[s]:[0],m=_t(1),d=[["position",new C(p,m,3,!0)],["normal",new C(c,m,3,!0)],["color",new C(f,m,4,!0)],["size",new C(b,m,2)],["rotation",new C(y,m,1,!0)]];if(l&&d.push(["uvi",new C(l,m,l.length)]),i!=null){const v=[i[0],i[1],i[2],i[3]];d.push(["centerOffsetAndDistance",new C(v,m,4)])}if(h){const v=[h[0],h[1],h[2],h[3]];d.push(["featureAttribute",new C(v,m,4)])}return new k(o,d,null,1,r,void 0,Hn())}const Qn=[[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]];function qs(o,e=Qn){const n=new Array(12);for(let r=0;r<4;r++)for(let p=0;p<3;p++)n[3*r+p]=e[r][p];const t=[0,1,2,2,3,0],s=[0,0,1],a=[0,0,0,0,0,0],i=[0,0,1,0,1,1,0,1],l=[255,255,255,255],h=[["position",new C(n,t,3,!0)],["normal",new C(s,a,3,!0)],["uv0",new C(i,t,2,!0)],["color",new C(l,a,4,!0)]];return new k(o,h)}function Jn(o,e,n,t,s=!0,a=!0){let i=0;const l=e,h=o;let r=H(0,i,0),p=H(0,i+h,0),c=H(0,-1,0),f=H(0,1,0);t&&(i=h,p=H(0,0,0),r=H(0,i,0),c=H(0,1,0),f=H(0,-1,0));const b=[p,r],y=[c,f],m=n+2,d=Math.sqrt(h*h+l*l);if(t)for(let u=n-1;u>=0;u--){const z=u*(2*Math.PI/n),O=H(Math.cos(z)*l,i,Math.sin(z)*l);b.push(O);const P=H(h*Math.cos(z)/d,-l/d,h*Math.sin(z)/d);y.push(P)}else for(let u=0;u<n;u++){const z=u*(2*Math.PI/n),O=H(Math.cos(z)*l,i,Math.sin(z)*l);b.push(O);const P=H(h*Math.cos(z)/d,l/d,h*Math.sin(z)/d);y.push(P)}const v=new Array,x=new Array;if(s){for(let u=3;u<b.length;u++)v.push(1),v.push(u-1),v.push(u),x.push(0),x.push(0),x.push(0);v.push(b.length-1),v.push(2),v.push(1),x.push(0),x.push(0),x.push(0)}if(a){for(let u=3;u<b.length;u++)v.push(u),v.push(u-1),v.push(0),x.push(u),x.push(u-1),x.push(1);v.push(0),v.push(2),v.push(b.length-1),x.push(1),x.push(2),x.push(y.length-1)}const g=Z(3*m);for(let u=0;u<m;u++)g[3*u]=b[u][0],g[3*u+1]=b[u][1],g[3*u+2]=b[u][2];const A=Z(3*m);for(let u=0;u<m;u++)A[3*u]=y[u][0],A[3*u+1]=y[u][1],A[3*u+2]=y[u][2];return[["position",new C(g,v,3,!0)],["normal",new C(A,x,3,!0)]]}function Ns(o,e,n,t,s,a=!0,i=!0){return new k(o,Jn(e,n,t,s,a,i))}function ks(o,e,n,t,s,a,i){const l=s?ct(s):H(1,0,0),h=a?ct(a):H(0,0,0);i??=!0;const r=X();L(r,l);const p=X();G(p,r,Math.abs(e));const c=X();G(c,p,-.5),q(c,c,h);const f=H(0,1,0);Math.abs(1-Xe(r,f))<.2&&oe(f,0,0,1);const b=X();ne(b,r,f),L(b,b),ne(f,b,r);const y=2*t+(i?2:0),m=t+(i?2:0),d=Z(3*y),v=Z(3*m),x=Z(2*y),g=new Array(3*t*(i?4:2)),A=new Array(3*t*(i?4:2));i&&(d[3*(y-2)]=c[0],d[3*(y-2)+1]=c[1],d[3*(y-2)+2]=c[2],x[2*(y-2)]=0,x[2*(y-2)+1]=0,d[3*(y-1)]=d[3*(y-2)]+p[0],d[3*(y-1)+1]=d[3*(y-2)+1]+p[1],d[3*(y-1)+2]=d[3*(y-2)+2]+p[2],x[2*(y-1)]=1,x[2*(y-1)+1]=1,v[3*(m-2)]=-r[0],v[3*(m-2)+1]=-r[1],v[3*(m-2)+2]=-r[2],v[3*(m-1)]=r[0],v[3*(m-1)+1]=r[1],v[3*(m-1)+2]=r[2]);const u=(w,j,V)=>{g[w]=j,A[w]=V};let z=0;const O=X(),P=X();for(let w=0;w<t;w++){const j=w*(2*Math.PI/t);G(O,f,Math.sin(j)),G(P,b,Math.cos(j)),q(O,O,P),v[3*w]=O[0],v[3*w+1]=O[1],v[3*w+2]=O[2],G(O,O,n),q(O,O,c),d[3*w]=O[0],d[3*w+1]=O[1],d[3*w+2]=O[2],x[2*w]=w/t,x[2*w+1]=0,d[3*(w+t)]=d[3*w]+p[0],d[3*(w+t)+1]=d[3*w+1]+p[1],d[3*(w+t)+2]=d[3*w+2]+p[2],x[2*(w+t)]=w/t,x[2*w+1]=1;const V=(w+1)%t;u(z++,w,w),u(z++,w+t,w),u(z++,V,V),u(z++,V,V),u(z++,w+t,w),u(z++,V+t,V)}if(i){for(let w=0;w<t;w++){const j=(w+1)%t;u(z++,y-2,m-2),u(z++,w,m-2),u(z++,j,m-2)}for(let w=0;w<t;w++){const j=(w+1)%t;u(z++,w+t,m-1),u(z++,y-1,m-1),u(z++,j+t,m-1)}}const B=[["position",new C(d,g,3,!0)],["normal",new C(v,A,3,!0)],["uv0",new C(x,g,2,!0)]];return new k(o,B)}function Ws(o,e,n,t,s,a){t=t||10,s=s==null||s,At(e.length>1);const i=[[0,0,0]],l=[],h=[];for(let r=0;r<t;r++){l.push([0,-r-1,-(r+1)%t-1]);const p=r/t*2*Math.PI;h.push([Math.cos(p)*n,Math.sin(p)*n])}return es(o,h,e,i,l,s,a)}function es(o,e,n,t,s,a,i=H(0,0,0)){const l=e.length,h=Z(n.length*l*3+(6*t.length||0)),r=Z(n.length*l*3+(t?6:0)),p=new Array,c=new Array;let f=0,b=0;const y=_(),m=_(),d=_(),v=_(),x=_(),g=_(),A=_(),u=_(),z=_(),O=_(),P=_(),B=_(),w=_(),j=cn();oe(z,0,1,0),Y(m,n[1],n[0]),L(m,m),a?(q(u,n[0],i),L(d,u)):oe(d,0,0,1),mt(m,d,z,z,x,d,xt),N(v,d),N(B,x);for(let S=0;S<t.length;S++)G(g,x,t[S][0]),G(u,d,t[S][2]),q(g,g,u),q(g,g,n[0]),h[f++]=g[0],h[f++]=g[1],h[f++]=g[2];r[b++]=-m[0],r[b++]=-m[1],r[b++]=-m[2];for(let S=0;S<s.length;S++)p.push(s[S][0]>0?s[S][0]:-s[S][0]-1+t.length),p.push(s[S][1]>0?s[S][1]:-s[S][1]-1+t.length),p.push(s[S][2]>0?s[S][2]:-s[S][2]-1+t.length),c.push(0),c.push(0),c.push(0);let V=t.length;const K=t.length-1;for(let S=0;S<n.length;S++){let me=!1;S>0&&(N(y,m),S<n.length-1?(Y(m,n[S+1],n[S]),L(m,m)):me=!0,q(O,y,m),L(O,O),q(P,n[S-1],v),un(n[S],O,j),fn(j,pn(P,y),u)?(Y(u,u,n[S]),L(d,u),ne(x,O,d),L(x,x)):mt(O,v,B,z,x,d,xt),N(v,d),N(B,x)),a&&(q(u,n[S],i),L(w,u));for(let J=0;J<l;J++)if(G(g,x,e[J][0]),G(u,d,e[J][1]),q(g,g,u),L(A,g),r[b++]=A[0],r[b++]=A[1],r[b++]=A[2],q(g,g,n[S]),h[f++]=g[0],h[f++]=g[1],h[f++]=g[2],!me){const je=(J+1)%l;p.push(V+J),p.push(V+l+J),p.push(V+je),p.push(V+je),p.push(V+l+J),p.push(V+l+je);for(let Te=0;Te<6;Te++){const qt=p.length-6;c.push(p[qt+Te]-K)}}V+=l}const le=n[n.length-1];for(let S=0;S<t.length;S++)G(g,x,t[S][0]),G(u,d,t[S][1]),q(g,g,u),q(g,g,le),h[f++]=g[0],h[f++]=g[1],h[f++]=g[2];const Q=b/3;r[b++]=m[0],r[b++]=m[1],r[b++]=m[2];const W=V-l;for(let S=0;S<s.length;S++)p.push(s[S][0]>=0?V+s[S][0]:-s[S][0]-1+W),p.push(s[S][2]>=0?V+s[S][2]:-s[S][2]-1+W),p.push(s[S][1]>=0?V+s[S][1]:-s[S][1]-1+W),c.push(Q),c.push(Q),c.push(Q);const se=[["position",new C(h,p,3,!0)],["normal",new C(r,c,3,!0)]];return new k(o,se)}function Ys(o,e,n,t,s){const a=co(3*e.length),i=new Array(2*(e.length-1));let l=0,h=0;for(let p=0;p<e.length;p++){for(let c=0;c<3;c++)a[l++]=e[p][c];p>0&&(i[h++]=p-1,i[h++]=p)}const r=[["position",new C(a,i,3,!0)]];if(n&&n.length===e.length&&n[0].length===3){const p=Z(3*n.length);let c=0;for(let f=0;f<e.length;f++)for(let b=0;b<3;b++)p[c++]=n[f][b];r.push(["normal",new C(p,i,3,!0)])}return t&&r.push(["color",new C(t,ln(t.length/4),4)]),new k(o,r,null,2)}function Xs(o,e,n,t,s,a=0){const i=new Array(18),l=[[-n,a,s/2],[t,a,s/2],[0,e+a,s/2],[-n,a,-s/2],[t,a,-s/2],[0,e+a,-s/2]],h=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let r=0;r<6;r++)i[3*r]=l[r][0],i[3*r+1]=l[r][1],i[3*r+2]=l[r][2];return new k(o,[["position",new C(i,h,3,!0)]])}function Zs(o,e){const n=o.getMutableAttribute("position").data;for(let t=0;t<n.length;t+=3){const s=n[t],a=n[t+1],i=n[t+2];oe(fe,s,a,i),re(fe,fe,e),n[t]=fe[0],n[t+1]=fe[1],n[t+2]=fe[2]}}function Ks(o,e=o){const n=o.attributes,t=n.get("position").data,s=n.get("normal").data;if(s){const a=e.getMutableAttribute("normal").data;for(let i=0;i<s.length;i+=3){const l=s[i+1];a[i+1]=-s[i+2],a[i+2]=l}}if(t){const a=e.getMutableAttribute("position").data;for(let i=0;i<t.length;i+=3){const l=t[i+1];a[i+1]=-t[i+2],a[i+2]=l}}}function He(o,e,n,t,s){return!(Math.abs(Xe(e,o))>s)&&(ne(n,o,e),L(n,n),ne(t,n,o),L(t,t),!0)}function mt(o,e,n,t,s,a,i){return He(o,e,s,a,i)||He(o,n,s,a,i)||He(o,t,s,a,i)}const xt=.99619469809,fe=_(),ts=Object.freeze(Object.defineProperty({__proto__:null,build:Rt,calculateAnchorPosition:ge,fullUV:ye},Symbol.toStringTag,{value:"Module"}));export{Xs as A,Ts as B,_s as D,Us as E,Es as G,Ys as M,Is as Q,Ds as S,Vs as U,Fs as Z,Ls as a,ks as b,qs as c,js as d,Qe as e,Ns as f,Ws as g,mn as h,Cs as i,Ks as j,Gs as k,Bs as l,es as m,wn as n,Rs as o,Jn as p,mt as q,Hs as r,En as s,bn as t,Kn as u,Ms as w,Zs as y};
