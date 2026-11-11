(()=>{'use strict';
const form=document.querySelector('#registration-form');if(!form)return;
const cfg=window.HADO_REGISTRATION||{};
const field=document.querySelector('#registration-name'),consent=document.querySelector('#registration-consent'),submit=document.querySelector('#registration-submit'),receipt=document.querySelector('#registration-receipt'),count=document.querySelector('#registration-count'),message=document.querySelector('#registration-message');
const info=document.querySelector('.registration-info');
const endpoint=typeof cfg.url==='string'?cfg.url.replace(/\/$/,''):'';
const key=typeof cfg.anonKey==='string'?cfg.anonKey:'';
const ready=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(endpoint)&&key.length>30;
let busy=false;
const idKey='hadoverse.registration.device.v2';
const headers={'Content-Type':'application/json','apikey':key,'Authorization':'Bearer '+key};
function deviceId(){let id=localStorage.getItem(idKey);if(id&&/^[0-9a-f-]{36}$/i.test(id))return id;id=crypto.randomUUID();localStorage.setItem(idKey,id);return id}
function setText(s){message.textContent=s}
async function rpc(name,args={}){const res=await fetch(endpoint+'/rest/v1/rpc/'+name,{method:'POST',headers,body:JSON.stringify(args),cache:'no-store'});const body=await res.json().catch(()=>null);if(!res.ok)throw Error(body?.message||'서버 응답 오류');return body}
async function refresh(){if(!ready){count.textContent='연결 전';return}try{const n=await rpc('hado_registration_count');count.textContent=Number(n).toLocaleString('ko-KR')+'건'}catch{count.textContent='조회 실패'}}
function renderSaved(record){form.hidden=true;receipt.hidden=false;document.querySelector('#registration-saved-name').textContent='닉네임: '+record.nickname;document.querySelector('#registration-saved-date').textContent='신청 일시: '+new Date(record.createdAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'});}
async function init(){if(info){info.querySelector('.eyebrow').textContent='TOTAL REGISTRATIONS';info.querySelector('h3').textContent='전체 신청 현황';info.querySelectorAll('p').forEach((p,i)=>p.textContent=i===0?'공용 서버에 접수된 신청 건수만 공개됩니다. 개별 닉네임과 신청 내역은 공개되지 않습니다.':'동일 브라우저 중복 신청을 방지하지만, 브라우저 데이터 삭제나 다른 기기 이용까지 완전히 막지는 못합니다.');}
if(!ready){submit.disabled=true;setText('신청 서버가 아직 연결되지 않았습니다. 관리자 설정 후 신청할 수 있습니다.');await refresh();return}
try{const prior=JSON.parse(localStorage.getItem('hadoverse.registration.receipt.v2')||'null');if(prior?.nickname&&prior?.createdAt)renderSaved(prior)}catch{}
await refresh()}
form.addEventListener('submit',async e=>{e.preventDefault();if(!ready||busy)return;const nickname=field.value.trim();if(nickname.length<2||nickname.length>20||!consent.checked){setText('닉네임 2~20자를 입력하고 신청 안내를 확인해 주세요.');return}busy=true;submit.disabled=true;setText('신청 정보를 접수하고 있습니다…');try{const result=await rpc('hado_register',{p_device_id:deviceId(),p_nickname:nickname});if(result?.already_registered){setText('이 브라우저 식별자로 이미 신청된 기록이 있습니다. 새 신청은 생성되지 않았습니다.');await refresh();return}if(!result||!result.created_at)throw Error('접수 응답을 확인할 수 없습니다');const receiptRecord={nickname:result.nickname,createdAt:result.created_at};localStorage.setItem('hadoverse.registration.receipt.v2',JSON.stringify(receiptRecord));renderSaved(receiptRecord);setText(result.already_registered?'이미 접수된 브라우저의 신청입니다.':'공용 데이터베이스에 사전 신청이 접수되었습니다. 참가 확정은 아닙니다.');await refresh()}catch(err){setText('신청하지 못했습니다: '+err.message)}finally{busy=false;if(!form.hidden)submit.disabled=false}});
init();window.addEventListener('pageshow',refresh);
})();
