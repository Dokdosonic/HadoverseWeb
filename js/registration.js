(()=>{'use strict';
const form=document.querySelector('#registration-form');if(!form)return;
const cfg=window.HADO_REGISTRATION||{};
const endpoint=String(cfg.endpoint||'').replace(/\/$/,'');
const ready=/^https:\/\/[a-z0-9-]+\.supabase\.co\/functions\/v1\/registration$/i.test(endpoint)&&!endpoint.includes('YOUR_PROJECT_REF');
const field=document.querySelector('#registration-name'),consent=document.querySelector('#registration-consent'),submit=document.querySelector('#registration-submit'),receipt=document.querySelector('#registration-receipt'),count=document.querySelector('#registration-count'),message=document.querySelector('#registration-message');
const deviceKey='hadoverse.registration.device.v2', receiptKey='hadoverse.registration.receipt.v2';let busy=false;
function deviceId(){let id=localStorage.getItem(deviceKey);if(id&&/^[0-9a-f-]{36}$/i.test(id))return id;id=crypto.randomUUID();localStorage.setItem(deviceKey,id);return id}
function showSaved(record){form.hidden=true;receipt.hidden=false;document.querySelector('#registration-saved-name').textContent='닉네임: '+record.nickname;document.querySelector('#registration-saved-date').textContent='신청 일시: '+new Date(record.createdAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'});}
async function api(action,data={}){const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...data}),cache:'no-store'});const j=await r.json().catch(()=>({}));if(!r.ok)throw Error(j.error||'서버 요청에 실패했습니다');return j}
async function refresh(){if(!ready){count.textContent='연결 전';return}try{const r=await api('count');count.textContent=Number(r.count).toLocaleString('ko-KR')+'건'}catch{count.textContent='조회 실패'}}
async function init(){if(!ready){submit.disabled=true;message.textContent='서버 연결 주소를 먼저 설정하세요.';return refresh()}try{const record=JSON.parse(localStorage.getItem(receiptKey)||'null');if(record?.nickname&&record?.createdAt)showSaved(record)}catch{}await refresh()}
form.addEventListener('submit',async event=>{event.preventDefault();if(!ready||busy)return;const nickname=field.value.trim();if(nickname.length<2||nickname.length>20||!consent.checked){message.textContent='닉네임 2~20자와 동의 항목을 확인하세요.';return}busy=true;submit.disabled=true;message.textContent='접수 중…';try{const result=await api('register',{deviceId:deviceId(),nickname});if(result.already_registered){message.textContent='이 브라우저의 식별자로 이미 접수되어 있습니다.';return}if(!result.created_at)throw Error('접수 결과를 확인하지 못했습니다');const rec={nickname:result.nickname,createdAt:result.created_at};localStorage.setItem(receiptKey,JSON.stringify(rec));showSaved(rec);message.textContent='신청이 접수되었습니다.';await refresh()}catch(e){message.textContent='신청 실패: '+e.message}finally{busy=false;if(!form.hidden)submit.disabled=false}});
init();window.addEventListener('pageshow',refresh);
})();
