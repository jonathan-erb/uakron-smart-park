import{j3 as Je,ea as me,an as z,K as Tt,bC as Jt,c5 as qt,i0 as Xt,p5 as Qt,h8 as Le,iz as at,j4 as Yt,at as qe,oC as Zt,gP as Kt,go as ei,fM as ti,cF as st,c4 as ii,ec as ai,mJ as si,_ as ri,v as P,Z as Ve,ax as ni,kD as le,mo as oi}from"./index-Cd8_p_JB.js";import{f as li}from"./computeTranslationToOriginAndRotation-Dtxu2exU.js";import{o as Xe}from"./projectionUtils-azzYKFIU.js";import{t as ci}from"./dehydratedFeatureUtils-1rrRm6hF.js";import{t as di,a as $e}from"./ElevationProvider-aS5xrHHy.js";import{u as pi}from"./hydratedFeatures-CW_GHrP9.js";import{I as hi,E as K,p as Ze,o as ee,u as Oe,H as ui,s as ae,c as ve,P as rt,g as Me,r as fi}from"./vec32-VETYHOu5.js";import{a as mi,n as Ke,s as vi,r as gi}from"./vec4f64-DPb6J-GU.js";import{t as Si}from"./orientedBoundingBox-C_YFKTl4.js";import{aE as bi,aF as _i,a as yi,u as xi,ap as $i,w as Pt,aG as Ti,aH as nt,R as Pi,i as et,an as tt,x as De,a3 as wi,U as Ci,a7 as zi,Q as Oi,h as Di,f as Ai,a2 as Li,S as Ri,a9 as Ei,a6 as Wi,o as ce,F as wt,Y as Fi,Z as Vi,aI as Mi,ac as ot,ad as ji,ae as lt,af as Te,ab as Ii,ag as ki,ah as Ui,ai as Ni,aJ as Bi,aK as ct,aL as Hi,aM as Gi,aN as dt,aj as Ji,ak as w,s as qi,aO as Xi,k as Qi,aP as pt,m as Yi}from"./Texture-DW_VPLAG.js";import{N as Zi,I as Ki,P as ea}from"./sphere-C3pIbUU1.js";import{m as ta}from"./mathUtils-xZipbDWP.js";import{s as ia,c as aa,t as sa}from"./BufferView-HOdJvPnh.js";import{S as ra}from"./Octree-DWAq7LVx.js";import{s as ge}from"./vec42-BA6HlmQU.js";import{M as na,b as je,v as Ct,B as oa}from"./lineSegment-RajVrDHu.js";import{w as Pe,j as Re,X as Y,k as ht}from"./plane-BAnInlVS.js";import{r as q,a as he,g as la,o as fe,t as ca,q as da,s as ut,u as pa}from"./Emissions.glsl-DqzhrWXc.js";import{Q as ha}from"./InterleavedLayout-br6BkSaO.js";import{N as zt,E as Ot,_ as ft}from"./enums-DQOO6RKE.js";import{T as we,d as Ie,r as mt}from"./renderState-C6Fc3Ut3.js";import{t as c,n as j}from"./glsl-B5bJgrnA.js";import"./Intersector-CiT9nvWH.js";import{A as Dt,h as At}from"./Texture-BAdE8xi0.js";import"./vec2f64-rIxtbMRN.js";import{s as ua}from"./ShaderBuilder-CrcLTys_.js";import{f as fa}from"./sdfPrimitives-C-clUzAg.js";function Vs(a,e,t,i,s,r,o,l,n,d,p){const g=xa[p.mode];let m,u,f=0;if(Xe(a,e,t,i,n.spatialReference,s,l))return g?.requiresAlignment(p)?(f=g.applyElevationAlignmentBuffer(i,s,r,o,l,n,d,p),m=r,u=o):(m=i,u=s),Xe(m,n.spatialReference,u,r,d.spatialReference,o,l)?f:void 0}function Lt(a,e,t,i,s){const r=(ci(a)?a.z:di(a)?a.array[a.offset+2]:a[2])||0;switch(t.mode){case"on-the-ground":{const o=$e(e,a,"ground")??0;return s.verticalDistanceToGround=0,s.sampledElevation=o,void(s.z=o)}case"relative-to-ground":{const o=$e(e,a,"ground")??0,l=t.geometryZWithOffset(r,i);return s.verticalDistanceToGround=l,s.sampledElevation=o,void(s.z=l+o)}case"relative-to-scene":{const o=$e(e,a,"scene")??0,l=t.geometryZWithOffset(r,i);return s.verticalDistanceToGround=l,s.sampledElevation=o,void(s.z=l+o)}case"absolute-height":{const o=t.geometryZWithOffset(r,i),l=$e(e,a,"ground")??0;return s.verticalDistanceToGround=o-l,s.sampledElevation=l,void(s.z=o)}default:return void(s.z=0)}}function Ms(a,e,t,i){return Lt(a,e,t,i,de),de.z}function js(a,e,t){return e==="on-the-ground"&&t==="on-the-ground"?a.staysOnTheGround:e===t||e!=="on-the-ground"&&t!=="on-the-ground"?e==null||t==null?a.definedChanged:1:a.onTheGroundChanged}function Is(a){return a==="relative-to-ground"||a==="relative-to-scene"}function ks(a){return a!=="absolute-height"}function Us(a,e,t,i,s){Lt(e,t,s,i,de),ma(a,de.verticalDistanceToGround);const r=de.sampledElevation,o=Je($a,a.transformation);return Ce[0]=e.x,Ce[1]=e.y,Ce[2]=de.z,li(e.spatialReference,Ce,o,i.spatialReference)?a.transformation=o:console.warn("Could not locate symbol object properly, it might be misplaced"),r}function ma(a,e){for(let t=0;t<a.geometries.length;++t){const i=a.geometries[t].getMutableAttribute("centerOffsetAndDistance");i&&i.data[3]!==e&&(i.data[3]=e,a.geometryVertexAttributeUpdated(a.geometries[t],"centerOffsetAndDistance"))}}function va(a,e,t,i,s,r){let o=0;const l=r.spatialReference;e*=3,i*=3;for(let n=0;n<s;++n){const d=a[e],p=a[e+1],g=a[e+2],m=r.getElevation(d,p,g,l,"ground")??0;o+=m,t[i]=d,t[i+1]=p,t[i+2]=m,e+=3,i+=3}return o/s}function ga(a,e,t,i,s,r,o,l){let n=0;const d=l.calculateOffsetRenderUnits(o),p=l.featureExpressionInfoContext,g=r.spatialReference;e*=3,i*=3;for(let m=0;m<s;++m){const u=a[e],f=a[e+1],_=a[e+2],b=r.getElevation(u,f,_,g,"ground")??0;n+=b,t[i]=u,t[i+1]=f,t[i+2]=p==null?_+b+d:b+d,e+=3,i+=3}return n/s}function Sa(a,e,t,i,s,r,o,l){let n=0;const d=l.calculateOffsetRenderUnits(o),p=l.featureExpressionInfoContext,g=r.spatialReference;e*=3,i*=3;for(let m=0;m<s;++m){const u=a[e],f=a[e+1],_=a[e+2],b=r.getElevation(u,f,_,g,"scene")??0;n+=b,t[i]=u,t[i+1]=f,t[i+2]=p==null?_+b+d:b+d,e+=3,i+=3}return n/s}function ba(a){const e=a.meterUnitOffset,t=a.featureExpressionInfoContext;return e!==0||t!=null}function _a(a,e,t,i,s,r,o,l){const n=l.calculateOffsetRenderUnits(o),d=l.featureExpressionInfoContext;e*=3,i*=3;for(let p=0;p<s;++p){const g=a[e],m=a[e+1],u=a[e+2];t[i]=g,t[i+1]=m,t[i+2]=d==null?u+n:n,e+=3,i+=3}return 0}class ya{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}const xa={"absolute-height":{applyElevationAlignmentBuffer:_a,requiresAlignment:ba},"on-the-ground":{applyElevationAlignmentBuffer:va,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:ga,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:Sa,requiresAlignment:()=>!0}},$a=me(),de=new ya,Ce=z(),Ta=()=>Tt.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function Pa(a){return{cachedResult:a.cachedResult,arcade:a.arcade?{func:a.arcade.func,context:a.arcade.modules.arcadeUtils.createExecContext(null,{sr:a.arcade.context.spatialReference}),modules:a.arcade.modules}:null}}function Ns(a){const e=a?.expression;if(typeof e=="string"){const t=Et(e);if(t!=null)return{cachedResult:t}}return null}async function Bs(a,e,t,i){const s=a?.expression;if(typeof s!="string")return null;const r=Et(s);if(r!=null)return{cachedResult:r};const o=await Jt();qt(t);const l=o.arcadeUtils,n=l.createSyntaxTree(s);return l.dependsOnView(n)?(i?.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0}):{arcade:{func:l.createFunction(n),context:l.createExecContext(null,{sr:e}),modules:o}}}function wa(a,e,t){return a.arcadeUtils.createFeature(e.attributes,e.geometry,t)}function Ca(a,e){if(a!=null&&!Rt(a)){if(!e||!a.arcade)return void Ta().errorOncePerTick("Arcade support required but not provided");const t=e;t._geometry&&(t._geometry=pi(t._geometry)),a.arcade.modules.arcadeUtils.updateExecContext(a.arcade.context,e)}}function za(a){if(a!=null){if(Rt(a))return a.cachedResult;const e=a.arcade;let t=e?.modules.arcadeUtils.executeFunction(e.func,e.context);return typeof t!="number"&&(a.cachedResult=0,t=0),t}return 0}function Hs(a,e=!1){let t=a?.featureExpressionInfo;const i=t?.expression;return e||i==="0"||(t=null),t??null}const Gs={cachedResult:0};function Rt(a){return a.cachedResult!=null}function Et(a){return a==="0"?0:null}let Js=class Wt{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=Xt(e)}get requiresSampledElevationInfo(){return this.mode!=="absolute-height"}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,t){const i=this.calculateOffsetRenderUnits(t);return this.featureExpressionInfoContext!=null?i:e+i}calculateOffsetRenderUnits(e){let t=this._meterUnitOffset;const i=this.featureExpressionInfoContext;return i!=null&&(t+=za(i)*this._metersPerElevationInfoUnit),t/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=Qt(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,t,i){e.arcade?(this._featureExpressionInfoContext=Pa(e),this.updateFeatureExpressionFeature(t,i)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,t){const i=this.featureExpressionInfoContext;i?.arcade&&(i.cachedResult=void 0,Ca(this._featureExpressionInfoContext,e.geometry?wa(i.arcade.modules,e,t):null))}static fromElevationInfo(e){const t=new Wt;return e!=null&&t.setFromElevationInfo(e),t}};function Oa(a){return a==="position"}function Da(a,e){return a==null&&(a=[]),a.push(e),a}function Aa(a,e){if(a==null)return null;const t=a.filter(i=>i!==e);return t.length===0?null:t}function qs(a,e,t,i,s){ze[0]=a.get(e,0),ze[1]=a.get(e,1),ze[2]=a.get(e,2),bi(ze,ne,3),t.set(s,0,ne[0]),i.set(s,0,ne[1]),t.set(s,1,ne[2]),i.set(s,1,ne[3]),t.set(s,2,ne[4]),i.set(s,2,ne[5])}const ze=z(),ne=new Float32Array(6);let La=class{constructor(e={}){this.id=Le(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerViewUid=e.layerViewUid,e.isElevationSource&&(this.lastValidElevationBB=new Ft),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(e){ia(this._layer==null||e==null,"Object3D can only be added to a single Layer"),this._layer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e);for(const t of this._highlightIds)e.addHighlight(t);this._emit("geometryAdded",{object:this,geometry:e}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];if(t){for(const i of this._highlightIds)t.removeHighlight(i);this._emit("geometryRemoved",{object:this,geometry:t}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,i=!1){this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),Oa(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const t of this._geometries)t.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new _i;for(const t of this._geometries)t.occludees=Da(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=Aa(t.occludees,e);this._emit("occlusionChanged",this)}highlight(e){const t=new yi(e);for(const i of this._geometries)i.addHighlight(t);return this._emit("highlightChanged",this),this._highlightIds.add(t),t}removeHighlight(e){this._highlightIds.delete(e);for(const t of this._geometries)t.removeHighlight(e);this._emit("highlightChanged",this)}removeStateID(e){e.channel===0?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return at(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=me()){return at(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new vt,this._validateBoundingVolume(this._bvWorldSpace,0)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new vt,this._validateBoundingVolume(this._bvObjectSpace,1)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=t===1;for(const s of this._geometries){const r=s.boundingInfo;r&&Ra(r,e,i?s.transformation:this.getCombinedShaderTransformation(s))}Zi(e.bounds,hi(ke,e.min,e.max,.5));for(const s of this._geometries){const r=s.boundingInfo;if(r==null)continue;const o=i?s.transformation:this.getCombinedShaderTransformation(s),l=ta(o);K(ke,r.center,o);const n=Ze(ke,Ki(e.bounds)),d=r.radius*l;e.bounds[3]=Math.max(e.bounds[3],n+d)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&e&&this.layer.notifyObjectBBChanged(this,e)}_emit(e,t){this.layer?.events.emit(e,t)}get geometries(){return this._geometries}get transformation(){return this._transformation??Yt}set transformation(e){this._transformation=Je(this._transformation??me(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?Je(this._shaderTransformation??me(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}};class Ft{constructor(){this._data=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]}get min(){return qe(this._data[0],this._data[1],this._data[2])}get max(){return qe(this._data[3],this._data[4],this._data[5])}minWith(e){const{_data:t}=this;t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.min(t[2],e[2])}maxWith(e){const{_data:t}=this;t[3]=Math.max(t[3],e[0]),t[4]=Math.max(t[4],e[1]),t[5]=Math.max(t[5],e[2])}assignMinMax(e,t){for(let i=0;i<3;++i)this._data[0+i]=e[i],this._data[3+i]=t[i]}isEmpty(){return this._data[3]<this._data[0]&&this._data[4]<this._data[1]&&this._data[5]<this._data[2]}}class vt extends Ft{constructor(){super(...arguments),this.bounds=ea()}}function Ra(a,e,t){const i=a.bbMin,s=a.bbMax;if(Zt(t)){const r=ee(Ea,t[12],t[13],t[14]);return Oe(N,i,r),Oe(J,s,r),e.minWith(N),void e.maxWith(J)}if(K(N,i,t),ui(i,s))return e.minWith(N),void e.maxWith(N);K(J,s,t),e.minWith(N),e.minWith(J),e.maxWith(N),e.maxWith(J);for(let r=0;r<3;++r)ae(N,i),ae(J,s),N[r]=s[r],J[r]=i[r],K(N,N,t),K(J,J,t),e.minWith(N),e.minWith(J),e.maxWith(N),e.maxWith(J)}const Ea=z(),N=z(),J=z(),ke=z(),Wa=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];let Fa=class{constructor(e,t,i=""){this.stage=e,this.apiLayerViewUid=i,this.id=Le(),this.events=new Kt,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Array,this._handles=new ei,this._objects=new Map,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??0,e.addLayer(this);for(const s of Wa)this._handles.add(this.events.on(s,r=>e.handleEvent(s,r)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(e){return ti(this._objects.get(e))}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.set(e.id,e),e.layer=this,this.events.emit("layerObjectAdded",e),this._octree!=null&&this._objectsAdded.push(e)}remove(e){this._objects.delete(e.id)&&(this.events.emit("layerObjectRemoved",e),e.layer=null,this._octree!=null&&(st(this._objectsAdded,e)||this._octree.remove([e])))}addMany(e){for(const t of e)this._objects.set(t.id,t),t.layer=this;this.events.emit("layerObjectsAdded",e),this._octree!=null&&this._objectsAdded.push(...e)}removeMany(e){const t=new Array;for(const i of e)this._objects.delete(i.id)&&t.push(i);if(t.length!==0&&(this.events.emit("layerObjectsRemoved",t),t.forEach(i=>i.layer=null),this._octree!=null)){for(let i=0;i<t.length;)st(this._objectsAdded,t[i])?(t[i]=t[t.length-1],t.length-=1):++i;this._octree.remove(t)}}commit(){this.stage.commitLayer(this)}sync(){this.updatePolicy!==1&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){this._octree==null||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return this._octree==null&&this._objects.size>50?(this._octree=new ra(e=>e.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.values())):this._octree!=null&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=ii(this._octree),this._objectsAdded.length=0}get test(){}},Va=class{constructor(e,t){this.vec3=e,this.id=t}};function gt(a,e,t,i){return new Va(qe(a,e,t),i)}const St=8;function Ma(a,e){const{vertex:t,attributes:i}=a;t.uniforms.add(new q("intrinsicWidth",o=>o.width));const{hasScreenSizePerspective:s,spherical:r}=e;s?(a.include(xi,e),$i(t),Pt(t,e),t.uniforms.add(new Ti("inverseViewMatrix",(o,l)=>ai(bt,si(bt,l.camera.viewMatrix,o.origin)))),t.code.add(c`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${r?c`normalize(worldPos + localOrigin)`:c`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):t.code.add(c`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),e.hasVVSize?(i.add("sizeFeatureAttribute","float"),t.uniforms.add(new he("vvSizeMinSize",o=>o.vvSize.minSize),new he("vvSizeMaxSize",o=>o.vvSize.maxSize),new he("vvSizeOffset",o=>o.vvSize.offset),new he("vvSizeFactor",o=>o.vvSize.factor),new he("vvSizeFallback",o=>o.vvSize.fallback)),t.code.add(c`
    float getSize(${j(s,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${j(s,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(i.add("size","float"),t.code.add(c`
    float getSize(${j(s,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${j(s,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),e.hasVVOpacity?(i.add("opacityFeatureAttribute","float"),t.constants.add("vvOpacityNumber","int",8),t.uniforms.add(new nt("vvOpacityValues",o=>o.vvOpacity.values,St),new nt("vvOpacityOpacities",o=>o.vvOpacity.opacityValues,St),new q("vvOpacityFallback",o=>o.vvOpacity.fallback,{supportsNaN:!0})),t.code.add(c`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${j(e.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):t.code.add(c`vec4 applyOpacity(vec4 color) {
return color;
}`),e.hasVVColor?(a.include(Pi,e),i.add("colorFeatureAttribute","float"),t.code.add(c`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(i.add("color","vec4"),t.code.add(c`vec4 getColor() {
return applyOpacity(color);
}`))}const bt=me();function ja(a){a.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function Qe(a){a.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}class Ia{constructor(e,t,i){this._createTexture=e,this._parametersKey=t,this._repository=new Map,this._orphanCache=i.newCache(`procedural-texture-repository:${Le()}`,s=>s.dispose())}destroy(){for(const{texture:e}of this._repository.values())e.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){const i=this._acquire(e);return this.release(t),i}release(e){if(e==null)return;const t=this._parametersKey(e),i=this._repository.get(t);if(i&&(i.refCount--,i.refCount===0)){this._repository.delete(t);const{texture:s}=i;this._orphanCache.put(t,s)}}_acquire(e){if(e==null)return null;const t=this._parametersKey(e),i=this._repository.get(t);if(i)return i.refCount++,i.texture;const s=this._orphanCache.pop(t)??this._createTexture(e),r=new ka(s);return this._repository.set(t,r),s}}class ka{constructor(e){this.texture=e,this.refCount=1}}function Zs(a,e){return new Ia(t=>{const{data:i,textureSize:s}=Ua(t),r=new At(s,1);return r.dataType=zt.FLOAT,r.pixelFormat=6403,r.internalFormat=Ot.R16F,r.wrapMode=10497,new Dt(a,r,i)},t=>`${t.pattern.join(",")}-r${t.pixelRatio}`,e)}function Ua(a){const e=Vt(a),t=1/a.pixelRatio,i=Mt(a),s=[];let r=1;for(const l of e){for(let n=0;n<l;n++){const d=r*(Math.min(n,l-1-n)+.5)*t;s.push(d)}r=-r}const o=Math.round(e[0]/2);return{data:new Float32Array([...s.slice(o),...s.slice(0,o)]),textureSize:i}}function Vt(a){return a.pattern.map(e=>Math.round(e*a.pixelRatio))}function Mt(a){if(a==null)return 1;const e=Vt(a);return Math.floor(e.reduce((t,i)=>t+i))}function Na(a){return a==null?mi:a.length===4?a:ge(Ba,a[0],a[1],a[2],1)}const Ba=Ke();function Ha(a,e){if(!e.stippleEnabled)return void a.fragment.code.add(c`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const t=!(e.draped&&e.stipplePreferContinuous),{vertex:i,fragment:s}=a;e.draped||(Pt(i,e),i.uniforms.add(new et("worldToScreenPerDistanceRatio",({camera:r})=>1/r.perScreenPixelRatio)).code.add(c`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),a.varyings.add("vStippleDistance","float"),a.varyings.add("vStippleDistanceLimits","vec2"),a.varyings.add("vStipplePatternStretch","float"),i.code.add(c`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${c.float(Ga)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),tt(i),i.code.add(c`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${t?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),s.uniforms.add(new la("stipplePatternTexture",r=>r.stippleTexture),new q("stipplePatternPixelSizeInv",r=>1/jt(r))),e.stippleOffColorEnabled&&s.uniforms.add(new De("stippleOffColor",r=>Na(r.stippleOffColor))),a.include(Qe),s.code.add(c`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
float lineSizeInv = noPerspectiveRead(vLineSizeInv);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
u = fract(u);
float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha(float lineWidth) {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),s.code.add(c`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${j(!e.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${e.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function jt(a){const e=a.stipplePattern;return e?Mt(a.stipplePattern)/e.pixelRatio:1}const Ga=.4,Ae=64,It=Ae/2,kt=It/5,Ja=Ae/kt,Ks=.25;function er(a,e){const t=fa(a,Ae,It,kt),i=new At(Ae);return i.internalFormat=Ot.R16F,i.dataType=zt.FLOAT,i.pixelFormat=6403,i.wrapMode=33071,new Dt(e,i,t)}function qa(a,e){const t=a.vertex,i=e.hasScreenSizePerspective;tt(t),t.uniforms.get("markerScale")==null&&t.constants.add("markerScale","float",1),t.constants.add("markerSizePerLineWidth","float",Ja).code.add(c`
  float getLineWidth(${j(i,"vec3 pos")}) {
     return max(getSize(${j(i,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),e.space===2&&(t.constants.add("maxSegmentLengthFraction","float",.45),t.uniforms.add(new et("perRenderPixelRatio",s=>s.camera.perRenderPixelRatio)),t.code.add(c`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${j(i,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${j(i,"pos")})) * screenToWorldRatio;
  }
  `))}function Xa(a,e){if(!e.hasAnimation)return;const{attributes:t,varyings:i,vertex:s,fragment:r}=a;t.add("timeStamps","vec4"),i.add("vTimeStamp","float"),i.add("vFirstTime","float"),i.add("vLastTime","float"),i.add("vTransitionType","float"),s.main.add(c`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`);const{animation:o}=e;o===3&&r.constants.add("decayRate","float",2.3),r.code.add(c`
    float getTrailOpacity(float x) {
      ${Qa(o)}
    }`),r.uniforms.add(new q("timeElapsed",l=>l.timeElapsed),new q("trailLength",l=>l.trailLength),new q("speed",l=>l.animationSpeed),new De("timingOptions",l=>ge(Ya,l.startTime,l.endTime,l.fadeInTime,l.fadeOutTime))),r.code.add(c`float fadeIn(float x) {
return smoothstep(0.0, timingOptions[2], x);
}
float fadeOut(float x) {
return isinf(timingOptions[3]) ? 1.0 : smoothstep(timingOptions[3], 0.0, x);
}`),r.code.add(c`vec4 animate(vec4 color) {
float startTime = timingOptions[0];
float endTime = timingOptions[1];
float totalTime = vLastTime - vFirstTime;
float actualEndTime = int(vTransitionType) == 2 ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
animatedColor.a *= getTrailOpacity((totalTime - (vTimeStamp - vFirstTime)) / trailLength);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= fadeIn(timeElapsed - startTime);
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTime);
float vHeadRelativeToFirst = mod((timeElapsed - relativeStartTime) * speed - vFirstTime, totalTime);
float vRelativeToHead = vHeadRelativeToFirst + vFirstTime - vTimeStamp;
bool inPreviousCycle = vRelativeToHead < 0.0;
vRelativeToHead += inPreviousCycle ? totalTime : 0.0;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (vAbsoluteTime > actualEndTime) {
vRelativeToHead = (timeElapsed - relativeStartTime) * speed - vTimeStamp;
vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
}
animatedColor *= step(startTime, vAbsoluteTime);
animatedColor *= step(vAbsoluteTime, actualEndTime);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= inPreviousCycle ? fadeOut(vHeadRelativeToFirst / speed) : 1.0;
animatedColor.a *= getTrailOpacity(vRelativeToHead / trailLength);
animatedColor.a *= int(vTransitionType) == 0 ? fadeIn(vAbsoluteTime - startTime) : 1.0;
animatedColor.a *= fadeIn(vTimeStamp - vFirstTime);
return animatedColor;
}`)}function Qa(a){switch(a){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}const Ya=Ke(),Se=1;function Ut(a){const e=new ua,{attributes:t,varyings:i,vertex:s,fragment:r}=e,{applyMarkerOffset:o,draped:l,output:n,capType:d,stippleEnabled:p,falloffEnabled:g,roundJoins:m,wireframe:u,innerColorEnabled:f,hasAnimation:_,hasScreenSizePerspective:b}=a;r.include(wi),e.include(Ma,a),e.include(Ha,a),e.include(Ci,a),e.include(zi,a),e.include(Xa,a);const G=o&&!l;G&&(s.uniforms.add(new q("markerScale",v=>v.markerScale)),e.include(qa,{space:2,hasScreenSizePerspective:b})),Oi(s,a),s.uniforms.add(new Di("inverseProjectionMatrix",v=>v.camera.inverseProjectionMatrix),new Ai("nearFar",v=>v.camera.nearFar),new q("miterLimit",v=>v.join!=="miter"?0:v.miterLimit),new Li("viewport",v=>v.camera.fullViewport)),s.constants.add("LARGE_HALF_FLOAT","float",65500),t.add("position","vec3"),t.add("previousDelta","vec4"),t.add("nextDelta","vec4"),t.add("lineParameters","vec2"),t.add("u0","float"),i.add("vColor","vec4"),i.add("vpos","vec3",{invariant:!0}),i.add("vLineDistance","float"),i.add("vLineWidth","float");const X=p;X&&i.add("vLineSizeInv","float");const h=d===2,A=p&&h,L=g||A;L&&i.add("vLineDistanceNorm","float"),h&&(i.add("vSegmentSDF","float"),i.add("vReverseSegmentSDF","float")),s.code.add(c`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),s.code.add(c`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),s.code.add(c`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),tt(s),s.constants.add("aaWidth","float",p?0:1).main.add(c`bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;
float coverage = 1.0;
if (lineParameters.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
vec4 pos  = view * vec4(position, 1.0);
vec4 prev = view * vec4(prevPosition, 1.0);
vec4 next = view * vec4(nextPosition, 1.0);
bool isJoin = abs(lineParameters.y) < 3.0;`),G&&s.main.add(c`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),e.include(ja),s.main.add(c`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${j(b,"clippedPos")});
      ${j(p&&b,"float patternLineSize = getSize(clippedCenter);")}
      ${j(p&&!b,"float patternLineSize = lineSize;")}

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${X?c`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(p||h)&&s.main.add(c`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${h?c`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),s.main.add(c`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),m?s.main.add(c`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${p?c`min(1.0, subdivisionFactor * ${c.float((Se+2)/(Se+1))})`:c`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):s.main.add(c`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const R=d!==0;return s.main.add(c`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${R?c`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),s.main.add(c`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${L?c`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),h&&s.main.add(c`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),p&&(l?s.uniforms.add(new et("worldToScreenRatio",v=>1/v.screenToPCSRatio)):s.main.add(c`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),s.main.add(c`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),l?s.main.add(c`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):s.main.add(c`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),s.uniforms.add(new q("stipplePatternPixelSize",v=>jt(v))),s.main.add(c`float patternLength = patternLineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),s.main.add(c`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${u&&!l?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),e.fragment.include(Ri,a),e.include(Ei,a),r.include(Wi),r.main.add(c`discardBySlice(vpos);
discardByTerrainDepth();`),e.include(Qe),r.main.add(c`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${j(L,c`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),u?r.main.add(c`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(h&&r.main.add(c`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${c.float(ce)}) {
          discard;
        }
      `),A?r.main.add(c`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${c.float(ce)}, stippleCoverage);
      `):r.main.add(c`float stippleAlpha = getStippleAlpha(lineWidth);`),n!==10&&r.main.add(c`discardByStippleAlpha(stippleAlpha, ${c.float(ce)});`),e.include(Qe),r.uniforms.add(new De("intrinsicColor",v=>v.color)).main.add(c`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),f&&r.uniforms.add(new De("innerColor",v=>v.innerColor??v.color),new q("innerWidth",(v,T)=>v.innerWidth*T.camera.pixelRatio)).main.add(c`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),r.main.add(c`vec4 finalColor = blendStipple(color, stippleAlpha);`),g&&(r.uniforms.add(new q("falloff",v=>v.falloff)),r.main.add(c`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),p||r.main.add(c`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),_&&r.main.add(c`
        finalColor = animate(finalColor);

        ${j(n!==10,c`
            if (finalColor.a <= ${c.float(ce)}) {
              discard;
            }`)}
      `)),r.main.add(c`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),e}const Za=Object.freeze(Object.defineProperty({__proto__:null,build:Ut,ribbonlineNumRoundJoinSubdivisions:Se},Symbol.toStringTag,{value:"Module"}));class Ka extends Fi{constructor(e,t){super(e,t,new Vi(Za,()=>ri(()=>Promise.resolve().then(()=>cs),void 0)),Nt(t).locations),this.primitiveType=t.wireframe?ft.LINES:ft.TRIANGLE_STRIP}_makePipelineState(e,t){const{oitPass:i,output:s,hasOccludees:r,hasPolygonOffset:o}=e,l=i===0,n=i===2;return we({blending:fe(s)?Ui(i):null,depthTest:{func:ki(i)},depthWrite:Ii(e),drawBuffers:Te(s,Ni(i,s)),colorWrite:Ie,stencilWrite:r?lt:null,stencilTest:r?t?ot:ji:null,polygonOffset:l||n?o?_t:null:Mi})}initializePipeline(e){if(e.occluder){const t=e.hasPolygonOffset?_t:null,{output:i,hasOccludees:s}=e;this._occluderPipelineTransparent=we({blending:mt,polygonOffset:t,depthTest:ct,depthWrite:null,colorWrite:Ie,stencilWrite:null,stencilTest:s?Bi:null,drawBuffers:Te(i)}),this._occluderPipelineOpaque=we({blending:mt,polygonOffset:t,depthTest:s?ct:dt,depthWrite:null,colorWrite:Ie,stencilWrite:s?Gi:null,stencilTest:s?Hi:null,drawBuffers:Te(i)}),this._occluderPipelineMaskWrite=we({blending:null,polygonOffset:t,depthTest:dt,depthWrite:null,colorWrite:null,stencilWrite:s?lt:null,stencilTest:s?ot:null,drawBuffers:Te(i)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(e)return this._occludeePipeline;switch(t){case 11:return this._occluderPipelineTransparent??super.getPipeline();case 10:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}}const _t={factor:0,units:-4};function Nt(a){const e=ha().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return a.hasVVColor?e.f32("colorFeatureAttribute"):e.vec4u8("color",{glNormalized:!0}),a.hasVVSize?e.f32("sizeFeatureAttribute"):e.f32("size"),a.hasVVOpacity&&e.f32("opacityFeatureAttribute"),wt()&&e.vec4u8("olidColor"),a.hasAnimation&&e.vec4f16("timeStamps"),e}class $ extends Ji{constructor(e){super(),this.spherical=e,this.capType=0,this.emissionSource=0,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.animation=2,this.hasScreenSizePerspective=!1,this.textureCoordinateType=0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return this.animation!==0}}P([w({count:3})],$.prototype,"capType",void 0),P([w({count:8})],$.prototype,"emissionSource",void 0),P([w()],$.prototype,"hasPolygonOffset",void 0),P([w()],$.prototype,"writeDepth",void 0),P([w()],$.prototype,"draped",void 0),P([w()],$.prototype,"stippleEnabled",void 0),P([w()],$.prototype,"stippleOffColorEnabled",void 0),P([w()],$.prototype,"stipplePreferContinuous",void 0),P([w()],$.prototype,"roundJoins",void 0),P([w()],$.prototype,"applyMarkerOffset",void 0),P([w()],$.prototype,"hasVVSize",void 0),P([w()],$.prototype,"hasVVColor",void 0),P([w()],$.prototype,"hasVVOpacity",void 0),P([w()],$.prototype,"falloffEnabled",void 0),P([w()],$.prototype,"innerColorEnabled",void 0),P([w()],$.prototype,"hasOccludees",void 0),P([w()],$.prototype,"occluder",void 0),P([w()],$.prototype,"terrainDepthTest",void 0),P([w()],$.prototype,"cullAboveTerrain",void 0),P([w()],$.prototype,"wireframe",void 0),P([w()],$.prototype,"discardInvisibleFragments",void 0),P([w({count:4})],$.prototype,"animation",void 0),P([w()],$.prototype,"hasScreenSizePerspective",void 0);class es extends qi{constructor(e,t){super(e,is),this.produces=new Map([[2,i=>ca(i)||fe(i)&&this.parameters.renderOccluded===8],[3,i=>da(i)],[10,i=>ut(i)&&this.parameters.renderOccluded===8],[11,i=>ut(i)&&this.parameters.renderOccluded===8],[4,i=>fe(i)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[8,i=>fe(i)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[18,i=>pa(i)]]),this._configuration=new $(t)}getConfiguration(e,t){super.getConfiguration(e,t,this._configuration),this._configuration.oitPass=t.oitPass,this._configuration.draped=t.slot===18;const i=this.parameters.stipplePattern!=null&&e!==9;return this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join==="round",this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&ss(this.parameters.markerParameters),this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=t.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===8,this._configuration.terrainDepthTest=t.terrainDepthTest&&fe(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=this.hasEmissions?1:0,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration}get visible(){return this.parameters.color[3]>=ce||this.parameters.stipplePattern!=null&&(this.parameters.stippleOffColor?.[3]??0)>ce}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectDraped({attributes:e,screenToWorldRatio:t},i,s,r,o){if(!i.options.selectionMode)return;const l=e.get("size");let n=this.parameters.width;if(this.parameters.vvSize){const b=e.get("sizeFeatureAttribute").data[0];Number.isNaN(b)?n*=this.parameters.vvSize.fallback[0]:n*=Ve(this.parameters.vvSize.offset[0]+b*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else l&&(n*=l.data[0]);const d=s[0],p=s[1],g=(n/2+4)*t;let m=Number.MAX_VALUE,u=0;const f=e.get("position").data,_=Ye(this.parameters,e)?f.length-2:f.length-5;for(let b=0;b<_;b+=3){const G=f[b],X=f[b+1],h=(b+3)%f.length,A=d-G,L=p-X,R=f[h]-G,v=f[h+1]-X,T=Ve((R*A+v*L)/(R*R+v*v),0,1),E=R*T-A,W=v*T-L,Q=E*E+W*W;Q<m&&(m=Q,u=b/3)}m<g*g&&r(o.distance,o.normal,u)}intersect(e,t,i,s,r,o){const{options:l,camera:n,rayBegin:d,rayEnd:p}=i;if(!l.selectionMode||!e.visible||!n)return;if(!aa(t))return void Tt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const g=e.attributes,m=g.get("position").data;let u=this.parameters.width;if(this.parameters.vvSize){const h=g.get("sizeFeatureAttribute").data[0];Number.isNaN(h)||(u*=Ve(this.parameters.vvSize.offset[0]+h*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else g.has("size")&&(u*=g.get("size").data[0]);const f=rs;ni(f,i.point);const _=u*n.pixelRatio/2+4*n.pixelRatio;ee(ue[0],f[0]-_,f[1]+_,0),ee(ue[1],f[0]+_,f[1]+_,0),ee(ue[2],f[0]+_,f[1]-_,0),ee(ue[3],f[0]-_,f[1]-_,0);for(let h=0;h<4;h++)if(!n.unprojectFromRenderScreen(ue[h],ie[h]))return;Pe(n.eye,ie[0],ie[1],Ne),Pe(n.eye,ie[1],ie[2],Be),Pe(n.eye,ie[2],ie[3],He),Pe(n.eye,ie[3],ie[0],Ge);let b=Number.MAX_VALUE,G=0;const X=Ye(this.parameters,g)?m.length-2:m.length-5;for(let h=0;h<X;h+=3){F[0]=m[h]+t[12],F[1]=m[h+1]+t[13],F[2]=m[h+2]+t[14];const A=(h+3)%m.length;if(V[0]=m[A]+t[12],V[1]=m[A+1]+t[13],V[2]=m[A+2]+t[14],Y(Ne,F)<0&&Y(Ne,V)<0||Y(Be,F)<0&&Y(Be,V)<0||Y(He,F)<0&&Y(He,V)<0||Y(Ge,F)<0&&Y(Ge,V)<0)continue;const L=n.projectToRenderScreen(F,ns),R=n.projectToRenderScreen(V,os);if(L==null||R==null)continue;if(L[2]<0&&R[2]>0){ve(Z,F,V);const T=n.frustum,E=-Y(T[4],F)/rt(Z,ht(T[4]));if(Me(Z,Z,E),Oe(F,F,Z),!n.projectToRenderScreen(F,L))continue}else if(L[2]>0&&R[2]<0){ve(Z,V,F);const T=n.frustum,E=-Y(T[4],V)/rt(Z,ht(T[4]));if(Me(Z,Z,E),Oe(V,V,Z),!n.projectToRenderScreen(V,R))continue}else if(L[2]<0&&R[2]<0)continue;L[2]=0,R[2]=0;const v=na(je(L,R,$t),f);v<b&&(b=v,ae(yt,F),ae(xt,V),G=h/3)}if(b<_*_){let h=Number.MAX_VALUE;if(oa(je(yt,xt,$t),je(d,p,ls),oe)){ve(oe,oe,d);const A=fi(oe);Me(oe,oe,1/A),h=A/Ze(d,p)}o(h,oe,G)}}get hasEmissions(){return this.parameters.emissiveStrength>0}createBufferWriter(){return new as(Nt(this.parameters),this.parameters)}createGLMaterial(e){return new ts(e)}validateParameters(e){e.join!=="miter"&&(e.miterLimit=0),e.markerParameters!=null&&(e.markerScale=e.markerParameters.width/e.width)}update(e){const{hasAnimation:t}=this.parameters;return!!t&&(this.setParameters({timeElapsed:oi(e.time)},!1),e.dt!==0)}}class ts extends Qi{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const t=this._material.parameters.stipplePattern;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(Ka,e)}}class is extends Xi{constructor(){super(...arguments),this.width=0,this.color=vi,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=0,this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=0,this.endTime=1/0,this.fadeInTime=0,this.fadeOutTime=1/0,this.emissiveStrength=0}get transparent(){return this.color[3]<1||this.hasAnimation||this.stipplePattern!=null&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return this.animation!==0}}class as{constructor(e,t){this.layout=e,this._parameters=t;const i=t.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=i;break;case"round":this.numJoinSubdivisions=Se+i}}_isClosed(e){return Ye(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){const i=e.get("position").indices.length/2+1,s=this._isClosed(e);let r=s?2:4;return r+=((s?i:i-1)-(s?0:1))*(2*this.numJoinSubdivisions+4),r+=2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(e,t,i,s,r,o){const l=this.layout,n=i.get("position"),d=n.indices,p=n.data.length/3,g=i.get("distanceToStart")?.data;d&&d.length!==2*(p-1)&&console.warn("RibbonLineMaterial does not support indices");const m=l.fields.has("sizeFeatureAttribute");let u=1,f=null;if(m){const S=i.get("sizeFeatureAttribute");S.data.length===1?u=S.data[0]:f=S.data}else u=i.get("size")?.data[0]??1;let _=[1,1,1,1],b=0,G=null;const X=l.fields.has("colorFeatureAttribute");if(X){const S=i.get("colorFeatureAttribute");S.data.length===1?b=S.data[0]:G=S.data}else _=i.get("color")?.data??_;const h=i.get("timeStamps")?.data,A=h&&l.fields.has("timeStamps"),L=l.fields.has("opacityFeatureAttribute");let R=0,v=null;if(L){const S=i.get("opacityFeatureAttribute");S.data.length===1?R=S.data[0]:v=S.data}const T=new Float32Array(r.buffer),E=sa(r.buffer),W=new Uint8Array(r.buffer),Q=l.stride/4;let x=o*Q;const Ee=x;let I=0;const We=g?(S,H,re)=>I=g[re]:(S,H,re)=>I+=Ze(S,H),se=T.BYTES_PER_ELEMENT/E.BYTES_PER_ELEMENT,it=4/se,Bt=wt(),B=(S,H,re,U,_e,Ht,ye,Gt)=>{T[x++]=H[0],T[x++]=H[1],T[x++]=H[2],pt(S,H,E,x*se),x+=it,pt(re,H,E,x*se),x+=it,T[x++]=Gt;let te=x*se;if(E[te++]=_e,E[te++]=Ht,x=Math.ceil(te/se),X)T[x]=G?.[ye]??b;else{const k=Math.min(4*ye,_.length-4),xe=4*x;W[xe]=255*_[k],W[xe+1]=255*_[k+1],W[xe+2]=255*_[k+2],W[xe+3]=255*_[k+3]}if(x++,T[x++]=f?.[ye]??u,L&&(T[x++]=v?.[ye]??R),Bt){let k=4*x;s?(W[k++]=s[0],W[k++]=s[1],W[k++]=s[2],W[k++]=s[3]):(W[k++]=0,W[k++]=0,W[k++]=0,W[k++]=0),x=Math.ceil(.25*k)}A&&(te=x*se,E[te++]=U[0],E[te++]=U[1],E[te++]=U[2],E[te++]=U[3],x=Math.ceil(te/se))};x+=Q,ee(y,n.data[0],n.data[1],n.data[2]),A&&ge(M,h[0],h[1],h[2],h[3]),e&&K(y,y,e);const be=this._isClosed(i);if(be){const S=n.data.length-3;ee(D,n.data[S],n.data[S+1],n.data[S+2]),e&&K(D,D,e)}else ee(C,n.data[3],n.data[4],n.data[5]),e&&K(C,C,e),B(y,y,C,M,1,-4,0,0),B(y,y,C,M,1,4,0,0),ae(D,y),ae(y,C),A&&ge(M,h[4],h[5],h[6],h[7]);const Fe=be?0:1,pe=be?p:p-1;for(let S=Fe;S<pe;S++){const H=(S+1)%p*3;ee(C,n.data[H],n.data[H+1],n.data[H+2]),e&&K(C,C,e),We(D,y,S),B(D,y,C,M,0,-1,S,I),B(D,y,C,M,0,1,S,I);const re=this.numJoinSubdivisions;for(let U=0;U<re;++U){const _e=(U+1)/(re+1);B(D,y,C,M,_e,-1,S,I),B(D,y,C,M,_e,1,S,I)}if(B(D,y,C,M,1,-2,S,I),B(D,y,C,M,1,2,S,I),ae(D,y),ae(y,C),A){const U=(S+1)%p*4;ge(M,h[U],h[U+1],h[U+2],h[U+3])}}return be?(ee(C,n.data[3],n.data[4],n.data[5]),e&&K(C,C,e),I=We(D,y,pe),B(D,y,C,M,0,-1,Fe,I),B(D,y,C,M,0,1,Fe,I)):(I=We(D,y,pe),B(D,y,y,M,0,-5,pe,I),B(D,y,y,M,0,5,pe,I)),Ue(T,Ee+Q,T,Ee,Q),x=Ue(T,x-Q,T,x,Q),this._parameters.wireframe&&this._addWireframeVertices(r,Ee,x,Q),null}_addWireframeVertices(e,t,i,s){const r=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),o=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t);let l=0;const n=d=>l=Ue(o,d,r,l,s);for(let d=0;d<o.length-1;d+=2*s)n(d),n(d+2*s),n(d+1*s),n(d+2*s),n(d+1*s),n(d+3*s)}}function Ue(a,e,t,i,s){for(let r=0;r<s;r++)t[i++]=a[e++];return i}function Ye(a,e){return a.isClosed?e.get("position").indices.length>2:!1}function ss(a){return a.anchor===1&&a.hideOnShortSegments&&a.placement==="begin-end"&&a.worldSpace}const F=z(),V=z(),Z=z(),oe=z(),rs=z(),ns=le(),os=le(),yt=z(),xt=z(),$t=Ct(),ls=Ct(),D=z(),y=z(),C=z(),M=Ke(),ue=[le(),le(),le(),le()],ie=[z(),z(),z(),z()],Ne=Re(),Be=Re(),He=Re(),Ge=Re();class tr{constructor(e){this._originSR=e,this._rootOriginId="root/"+Le(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5}getOrigin(e){const t=this._origins.get(this._rootOriginId);if(t==null){const p=gt(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,p),p}const i=this._gridSize,s=Math.round(e[0]/i),r=Math.round(e[1]/i),o=Math.round(e[2]/i),l=`${s}/${r}/${o}`;let n=this._origins.get(l);const d=.5*i;if(ve(O,e,t.vec3),O[0]=Math.abs(O[0]),O[1]=Math.abs(O[1]),O[2]=Math.abs(O[2]),O[0]<d&&O[1]<d&&O[2]<d){if(n){const p=Math.max(...O);if(ve(O,e,n.vec3),O[0]=Math.abs(O[0]),O[1]=Math.abs(O[1]),O[2]=Math.abs(O[2]),Math.max(...O)<p)return n}return t}return n||(n=gt(s*i,r*i,o*i,l),this._origins.set(l,n)),n}_drawOriginBox(e,t=gi(1,1,0,1)){const i=window.view,s=i.stage,r=t.toString();if(!this._objects.has(r)){this._material=new es({width:2,color:t},!1);const u=new Fa(s,{pickable:!1}),f=new La({castShadow:!1});u.add(f),this._objects.set(r,f)}const o=this._objects.get(r),l=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],n=l.length,d=new Array(3*n),p=new Array,g=.5*this._gridSize;for(let u=0;u<n;u++)d[3*u]=e[0]+(1&l[u]?g:-g),d[3*u+1]=e[1]+(2&l[u]?g:-g),d[3*u+2]=e[2]+(4&l[u]?g:-g),u>0&&p.push(u-1,u);Xe(d,this._originSR,0,d,i.renderSpatialReference,0,n);const m=new Yi(this._material,[["position",new Si(d,p,3,!0)]],null,2);o.addGeometry(m)}get test(){}}const O=z(),cs=Object.freeze(Object.defineProperty({__proto__:null,build:Ut,ribbonlineNumRoundJoinSubdivisions:Se},Symbol.toStringTag,{value:"Module"}));export{gt as A,Ia as B,er as C,Zs as D,es as J,vt as M,La as W,Bs as a,Fa as b,Lt as c,Hs as d,qs as e,tr as f,Ns as g,ma as h,Gs as i,Us as j,js as k,Vs as l,ks as m,Oa as n,Js as o,Ja as p,Is as q,Ma as r,qa as s,ja as t,Ms as u,Ae as v,Qe as w,ya as x,It as y,Ks as z};
