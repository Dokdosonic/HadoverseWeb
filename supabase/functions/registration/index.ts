// Supabase Edge Function: all credentials stay server-side.
const allowedOrigins = new Set(['https://www.hadoverse.kro.kr','https://hadoverse.kro.kr','https://dokdosonic.github.io']);
const url = Deno.env.get('SUPABASE_URL');
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
function response(data,status=200,origin=''){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','vary':'Origin',...(allowedOrigins.has(origin)?{'access-control-allow-origin':origin}: {})}})}
Deno.serve(async req=>{
  const origin=req.headers.get('origin')||'';
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:{'access-control-allow-origin':allowedOrigins.has(origin)?origin:'null','access-control-allow-methods':'POST, OPTIONS','access-control-allow-headers':'content-type','vary':'Origin'}});
  if(!allowedOrigins.has(origin))return response({error:'허용되지 않은 사이트입니다.'},403,origin);
  if(req.method!=='POST')return response({error:'POST 요청만 지원합니다.'},405,origin);
  if(!url||!serviceKey)return response({error:'서버 환경 변수가 누락되었습니다.'},500,origin);
  let body;try{body=await req.json()}catch{return response({error:'잘못된 요청입니다.'},400,origin)}
  if(!body||!['count','register'].includes(body.action))return response({error:'허용되지 않은 요청입니다.'},400,origin);
  let name, params={};
  if(body.action==='count')name='hado_registration_count';
  else{
    const id=body.deviceId, nickname=body.nickname;
    if(typeof id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)||typeof nickname!=='string'||nickname.trim().length<2||nickname.trim().length>20)return response({error:'닉네임 또는 식별자 형식이 잘못되었습니다.'},400,origin);
    name='hado_register';params={p_device_id:id,p_nickname:nickname.trim()};
  }
  try{
    const upstream=await fetch(`${url}/rest/v1/rpc/${name}`,{method:'POST',headers:{'Content-Type':'application/json',apikey:serviceKey,Authorization:`Bearer ${serviceKey}`},body:JSON.stringify(params)});
    if(!upstream.ok){console.error('Registration RPC failed',upstream.status);return response({error:'신청 서버 처리에 실패했습니다.'},502,origin)}
    const result=await upstream.json();
    return response(body.action==='count'?{count:result}:result,200,origin);
  }catch(e){console.error('Registration server error',String(e));return response({error:'신청 서버에 연결하지 못했습니다.'},502,origin)}
});
