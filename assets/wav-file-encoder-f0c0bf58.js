function D(a,f){const u=a.numberOfChannels,o=a.length,i=a.sampleRate,l=Array(u);for(let s=0;s<u;s++)if(l[s]=a.getChannelData(s),l[s].length!=o)throw new Error("Unexpected channel data array size.");return O(l,i,f)}function O(a,f,u){const o=a.length;if(o<1)throw new Error("No audio channels.");const i=a[0].length;let l,s,c,h;switch(u){case 0:{l=16,s=1,c=16,h=C;break}case 1:{l=32,s=3,c=18,h=A;break}default:throw new Error}const p=Math.ceil(l/8),g=o*p,S=f*o*p,w=20+c+8,U=o*i*p,b=w+U,d=new ArrayBuffer(b),e=new DataView(d);return y(),h(),d;function y(){m(0,"RIFF"),e.setUint32(4,b-8,!0),m(8,"WAVE"),m(12,"fmt "),e.setUint32(16,c,!0),e.setUint16(20,s,!0),e.setUint16(22,o,!0),e.setUint32(24,f,!0),e.setUint32(28,S,!0),e.setUint16(32,g,!0),e.setUint16(34,l,!0),c>16&&e.setUint16(36,0,!0);const t=20+c;m(t,"data"),e.setUint32(t+4,U,!0)}function C(){let t=w;for(let r=0;r<i;r++)for(let n=0;n<o;n++){const F=a[n][r],V=N(F);e.setInt16(t,V,!0),t+=2}}function A(){let t=w;for(let r=0;r<i;r++)for(let n=0;n<o;n++){const F=a[n][r];e.setFloat32(t,F,!0),t+=4}}function N(t){return Math.max(-32768,Math.min(32767,Math.round(t*32768)))}function m(t,r){for(let n=0;n<r.length;n++)e.setUint8(t+n,r.charCodeAt(n))}}export{D as e};