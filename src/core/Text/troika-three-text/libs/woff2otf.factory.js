/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/
// prettier-ignore
export default function(){return function(r){"use strict";var e=Uint8Array,n=Uint16Array,t=Uint32Array,a=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),f=function(r,e){for(var a=new n(31),i=0;i<31;++i)a[i]=e+=1<<r[i-1];var o=new t(a[30]);for(i=1;i<30;++i)for(var f=a[i];f<a[i+1];++f)o[f]=f-a[i]<<5|i;return[a,o]},u=f(a,2),v=u[0],s=u[1];v[28]=258,s[258]=28;for(var l=f(i,0)[0],c=new n(32768),g=0;g<32768;++g){var h=(43690&g)>>>1|(21845&g)<<1;h=(61680&(h=(52428&h)>>>2|(13107&h)<<2))>>>4|(3855&h)<<4,c[g]=((65280&h)>>>8|(255&h)<<8)>>>1}var w=function(r,e,t){for(var a=r.length,i=0,o=new n(e);i<a;++i)++o[r[i]-1];var f,u=new n(e);for(i=0;i<e;++i)u[i]=u[i-1]+o[i-1]<<1;if(t){f=new n(1<<e);var v=15-e;for(i=0;i<a;++i)if(r[i])for(var s=i<<4|r[i],l=e-r[i],g=u[r[i]-1]++<<l,h=g|(1<<l)-1;g<=h;++g)f[c[g]>>>v]=s}else for(f=new n(a),i=0;i<a;++i)r[i]&&(f[i]=c[u[r[i]-1]++]>>>15-r[i]);return f},d=new e(288);for(g=0;g<144;++g)d[g]=8;for(g=144;g<256;++g)d[g]=9;for(g=256;g<280;++g)d[g]=7;for(g=280;g<288;++g)d[g]=8;var m=new e(32);for(g=0;g<32;++g)m[g]=5;var b=w(d,9,1),p=w(m,5,1),y=function(r){for(var e=r[0],n=1;n<r.length;++n)r[n]>e&&(e=r[n]);return e},L=function(r,e,n){var t=e/8|0;return(r[t]|r[t+1]<<8)>>(7&e)&n},U=function(r,e){var n=e/8|0;return(r[n]|r[n+1]<<8|r[n+2]<<16)>>(7&e)},k=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],T=function(r,e,n){var t=new Error(e||k[r]);if(t.code=r,Error.captureStackTrace&&Error.captureStackTrace(t,T),!n)throw t;return t},O=function(r,f,u){var s=r.length;if(!s||u&&!u.l&&s<5)return f||new e(0);var c=!f||u,g=!u||u.i;u||(u={}),f||(f=new e(3*s));var h,d=function(r){var n=f.length;if(r>n){var t=new e(Math.max(2*n,r));t.set(f),f=t}},m=u.f||0,k=u.p||0,O=u.b||0,A=u.l,x=u.d,E=u.m,D=u.n,M=8*s;do{if(!A){u.f=m=L(r,k,1);var S=L(r,k+1,3);if(k+=3,!S){var V=r[(I=((h=k)/8|0)+(7&h&&1)+4)-4]|r[I-3]<<8,_=I+V;if(_>s){g&&T(0);break}c&&d(O+V),f.set(r.subarray(I,_),O),u.b=O+=V,u.p=k=8*_;continue}if(1==S)A=b,x=p,E=9,D=5;else if(2==S){var j=L(r,k,31)+257,z=L(r,k+10,15)+4,C=j+L(r,k+5,31)+1;k+=14;for(var F=new e(C),P=new e(19),q=0;q<z;++q)P[o[q]]=L(r,k+3*q,7);k+=3*z;var B=y(P),G=(1<<B)-1,H=w(P,B,1);for(q=0;q<C;){var I,J=H[L(r,k,G)];if(k+=15&J,(I=J>>>4)<16)F[q++]=I;else{var K=0,N=0;for(16==I?(N=3+L(r,k,3),k+=2,K=F[q-1]):17==I?(N=3+L(r,k,7),k+=3):18==I&&(N=11+L(r,k,127),k+=7);N--;)F[q++]=K}}var Q=F.subarray(0,j),R=F.subarray(j);E=y(Q),D=y(R),A=w(Q,E,1),x=w(R,D,1)}else T(1);if(k>M){g&&T(0);break}}c&&d(O+131072);for(var W=(1<<E)-1,X=(1<<D)-1,Y=k;;Y=k){var Z=(K=A[U(r,k)&W])>>>4;if((k+=15&K)>M){g&&T(0);break}if(K||T(2),Z<256)f[O++]=Z;else{if(256==Z){Y=k,A=null;break}var $=Z-254;if(Z>264){var rr=a[q=Z-257];$=L(r,k,(1<<rr)-1)+v[q],k+=rr}var er=x[U(r,k)&X],nr=er>>>4;er||T(3),k+=15&er;R=l[nr];if(nr>3){rr=i[nr];R+=U(r,k)&(1<<rr)-1,k+=rr}if(k>M){g&&T(0);break}c&&d(O+131072);for(var tr=O+$;O<tr;O+=4)f[O]=f[O-R],f[O+1]=f[O+1-R],f[O+2]=f[O+2-R],f[O+3]=f[O+3-R];O=tr}}u.l=A,u.p=Y,u.b=O,A&&(m=1,u.m=E,u.d=x,u.n=D)}while(!m);return O==f.length?f:function(r,a,i){(null==a||a<0)&&(a=0),(null==i||i>r.length)&&(i=r.length);var o=new(r instanceof n?n:r instanceof t?t:e)(i-a);return o.set(r.subarray(a,i)),o}(f,0,O)},A=new e(0);var x="undefined"!=typeof TextDecoder&&new TextDecoder;try{x.decode(A,{stream:!0}),1}catch(r){}return r.convert_streams=function(r){var e=new DataView(r),n=0;function t(){var r=e.getUint16(n);return n+=2,r}function a(){var r=e.getUint32(n);return n+=4,r}function i(r){m.setUint16(b,r),b+=2}function o(r){m.setUint32(b,r),b+=4}for(var f={signature:a(),flavor:a(),length:a(),numTables:t(),reserved:t(),totalSfntSize:a(),majorVersion:t(),minorVersion:t(),metaOffset:a(),metaLength:a(),metaOrigLength:a(),privOffset:a(),privLength:a()},u=0;Math.pow(2,u)<=f.numTables;)u++;u--;for(var v=16*Math.pow(2,u),s=16*f.numTables-v,l=12,c=[],g=0;g<f.numTables;g++)c.push({tag:a(),offset:a(),compLength:a(),origLength:a(),origChecksum:a()}),l+=16;var h,w=new Uint8Array(12+16*c.length+c.reduce((function(r,e){return r+e.origLength+4}),0)),d=w.buffer,m=new DataView(d),b=0;return o(f.flavor),i(f.numTables),i(v),i(u),i(s),c.forEach((function(r){o(r.tag),o(r.origChecksum),o(l),o(r.origLength),r.outOffset=l,(l+=r.origLength)%4!=0&&(l+=4-l%4)})),c.forEach((function(e){var n,t=r.slice(e.offset,e.offset+e.compLength);if(e.compLength!=e.origLength){var a=new Uint8Array(e.origLength);n=new Uint8Array(t,2),O(n,a)}else a=new Uint8Array(t);w.set(a,e.outOffset);var i=0;(l=e.outOffset+e.origLength)%4!=0&&(i=4-l%4),w.set(new Uint8Array(i).buffer,e.outOffset+e.origLength),h=l+i})),d.slice(0,h)},Object.defineProperty(r,"__esModule",{value:!0}),r}({}).convert_streams}