// Kakama demo: simulated prices + virtual money. No network calls.
const start={'BTC/USDT':65000,'ETH/USDT':3200,'SOL/USDT':150,'XRP/USDT':0.6};
const $=id=>document.getElementById(id);
const hist={},cur={};
let balance=10000,pos=[];
for(const p in start){cur[p]=start[p];hist[p]=[];for(let i=0;i<120;i++){cur[p]*=1+(Math.random()-.5)*.003;hist[p].push(cur[p])}}
const fmt=n=>n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:n<10?4:2});
const pnl=q=>(q.side==='Buy'?1:-1)*(cur[q.pair]/q.entry-1)*q.size;
function draw(){
  const c=$('cv'),x=c.getContext('2d'),w=c.width=c.clientWidth,h=c.height=c.clientHeight,d=hist[$('pair').value];
  const lo=Math.min(...d),hi=Math.max(...d),r=hi-lo||1;
  x.clearRect(0,0,w,h);x.beginPath();
  d.forEach((v,i)=>{const px=i/(d.length-1)*w,py=h-12-(v-lo)/r*(h-24);i?x.lineTo(px,py):x.moveTo(px,py)});
  x.strokeStyle='#f2a93b';x.lineWidth=2;x.stroke();
}
function render(){
  const p=$('pair').value;
  $('price').textContent=fmt(cur[p]);$('bal').textContent='$'+fmt(balance);
  $('rows').innerHTML=pos.length?pos.map((q,i)=>{const v=pnl(q);return `<tr><td>${q.pair}</td><td>${q.side}</td><td>$${fmt(q.size)}</td><td>${fmt(q.entry)}</td><td class="${v>=0?'up':'down'}">${v>=0?'+':''}$${fmt(v)}</td><td><button class="btn ghost" onclick="closePos(${i})">Close</button></td></tr>`}).join(''):'<tr><td colspan="6" style="color:var(--mute)">No open positions. Choose an amount and press Buy or Sell.</td></tr>';
  draw();
}
function open(side){
  const size=+$('amt').value;
  if(!(size>=10)){$('msg').textContent='Enter at least $10.';return}
  if(size>balance){$('msg').textContent='Not enough balance. Lower the amount or reset the demo.';return}
  balance-=size;const pair=$('pair').value;
  pos.push({pair,side,size,entry:cur[pair]});$('msg').textContent=side+' position opened.';render();
}
window.closePos=i=>{const q=pos[i];balance+=q.size+pnl(q);pos.splice(i,1);$('msg').textContent='Position closed.';render()};
$('buy').onclick=()=>open('Buy');$('sell').onclick=()=>open('Sell');
$('reset').onclick=()=>{balance=10000;pos=[];$('msg').textContent='Demo reset to $10,000.';render()};
$('pair').onchange=render;window.onresize=draw;
setInterval(()=>{for(const p in cur){cur[p]*=1+(Math.random()-.5)*.003;hist[p].push(cur[p]);hist[p].shift()}render()},1000);
render();
