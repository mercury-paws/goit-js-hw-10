import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as f}from"./assets/vendor-77e16229.js";const e=document.querySelector("button[data-start]"),h=document.querySelector("[data-hours]"),y=document.querySelector("[data-minutes]"),p=document.querySelector("[data-seconds]"),g=document.querySelector("[data-days]"),b=document.getElementById("datetime-picker");let r="";e.disabled=!0;m("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t[0]),r=t[0].getTime();const o=Date.now();r<=o?(f.error({color:"red",message:"Please choose a date in the future",position:"topRight",progressBarColor:"rgb(0, 255, 184)",timeout:2e3}),e.disabled=!0):e.disabled=!1,console.log(r)}});e.addEventListener("click",S);let c;function S(){c=setInterval(()=>{const t=r-Date.now();if(t<=0){clearInterval(c);return}C(k(t))},1e3),e.disabled=!0,b.setAttribute("disabled","true")}function k(t){const u=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),i=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:d,minutes:i,seconds:l}}function n(t){return String(t).padStart(2,"0")}function C({days:t,hours:o,minutes:a,seconds:s}){g.textContent=`${n(t)}`,h.textContent=`${n(o)}`,y.textContent=`${n(a)}`,p.textContent=`${n(s)}`}
//# sourceMappingURL=commonHelpers.js.map