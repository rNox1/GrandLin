/**
 * OP RPG • Ponte Firebase para GitHub Pages (sem Node / bundler / backend).
 * Os dados de configuração ficam no início de firebase-config.js.
 * SDK modular servido diretamente pelo CDN oficial do Firebase.
 *
 * Os documentos estão em /characters/{codigo}. Códigos públicos permitem leitura;
 * edição é colaborativa: qualquer pessoa com o código pode alterar a ficha.
 */
const sdkVersion = '13.3.0';
const cfg = window.OP_RPG_FIREBASE_CONFIG;
const configured = !!(cfg && cfg.apiKey && cfg.projectId && cfg.appId &&
  !String(cfg.apiKey).includes('COLE_AQUI') &&
  !String(cfg.projectId).startsWith('SEU-') &&
  !String(cfg.appId).startsWith('SEU_'));
const signal = (name) => window.dispatchEvent(new CustomEvent(name));
const friendly = (error) => {
  const code=error?.code||'';
  const translations={
    'auth/email-already-in-use':'Este nome de usuário ou e-mail já está em uso.',
    'auth/invalid-email':'E-mail inválido.',
    'auth/weak-password':'A senha precisa ter pelo menos 6 caracteres.',
    'auth/invalid-credential':'Nome de usuário/e-mail ou senha incorretos.',
    'auth/popup-closed-by-user':'O login com Google foi cancelado.',
    'auth/unauthorized-domain':'Autorize o domínio do GitHub Pages em Firebase Authentication → Settings → Authorized domains.',
    'auth/operation-not-allowed':'Ative o provedor de login no Firebase Authentication.',
    'permission-denied':'O Firestore bloqueou esta alteração. Publique as regras v14 em Firestore Database → Regras.',
    'unavailable':'O Firebase está temporariamente indisponível. Sua cópia local foi mantida.',
    'resource-exhausted':'O limite de uso do Firebase foi atingido.',
  };
  return new Error(translations[code]||error?.message||String(error));
};
function makeCode(){
  const alphabet='abcdefghjkmnpqrstuvwxyz23456789';
  const nums=new Uint32Array(6);crypto.getRandomValues(nums);
  const str=Array.from(nums,x=>alphabet[x%alphabet.length]).join('');
  return str.slice(0,3)+'-'+str.slice(3);
}
/** Login por nome sem expor e-mails de usuários no Firestore.
 * O Firebase Email/Password autentica um endereço sintético reservado;
 * não há recuperação de senha por e-mail para contas criadas assim.
 * Contas antigas que usam e-mail continuam podendo entrar digitando-o.
 */
const aliasDomain='players.grandlinerpg.invalid';
function loginEmail(value,register=false){
  const v=String(value||'').trim().toLowerCase();
  if(!register&&v.includes('@'))return v;
  if(!/^[a-z0-9][a-z0-9._-]{2,23}$/.test(v)||/[._-]$/.test(v))
    throw Error('O nome de usuário deve ter 3 a 24 caracteres: letras sem acento, números, ponto, hífen ou sublinhado.');
  return v+'@'+aliasDomain;
}
function usernameOf(email){
  const suffix='@'+aliasDomain;
  return String(email||'').toLowerCase().endsWith(suffix)?String(email).slice(0,-suffix.length):'';
}
function checkSize(character){
  const bytes=new TextEncoder().encode(JSON.stringify(character)).length;
  if(bytes>860_000)throw new Error('A ficha excede o tamanho recomendado do Firestore (860 KB). Reduza as imagens do personagem ou exporte um backup JSON.');
}
/** Combinação de edições feitas sobre a mesma versão do personagem.
 * Objetos e itens de arrays com o mesmo índice são mesclados por campo.
 * Inclusões ao fim de arrays são preservadas quando ambas são append-only.
 * Se as duas pessoas modificam o mesmo valor, a última gravação vence.
 */
function glPlain(v){return v!==null&&typeof v==='object'&&!Array.isArray(v);}
function glCopy(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function glSame(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function glMerge3(base,remote,local){
  if(glSame(local,base))return glCopy(remote);
  if(glSame(remote,base))return glCopy(local);
  if(glPlain(base)&&glPlain(remote)&&glPlain(local)){
    const out={};
    for(const k of new Set([...Object.keys(base),...Object.keys(remote),...Object.keys(local)])){
      const merged=glMerge3(base[k],remote[k],local[k]);
      if(merged!==undefined)out[k]=merged;
    }
    return out;
  }
  if(Array.isArray(base)&&Array.isArray(remote)&&Array.isArray(local)){
    if(remote.length===local.length&&remote.length===base.length)
      return base.map((v,i)=>glMerge3(v,remote[i],local[i]));
    const appendOnly=(arr)=>arr.length>=base.length && base.every((v,i)=>glSame(v,arr[i]));
    if(appendOnly(remote)&&appendOnly(local)){
      const extras=[...remote.slice(base.length),...local.slice(base.length)];
      return [...glCopy(base),...extras.filter((x,i)=>!extras.slice(0,i).some(y=>glSame(x,y))).map(glCopy)];
    }
  }
  return glCopy(local);
}
if(!configured){
  window.OPFB={configured:false,ready:false,user:null,error:'Configure o arquivo firebase-config.js para ativar a nuvem.'};
  signal('oprpg-firebase-ready');
}else{
  try{
    const [appPkg,authPkg,fs] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-firestore.js`)
    ]);
    const app=appPkg.initializeApp(cfg),auth=authPkg.getAuth(app),db=fs.getFirestore(app);
    const col=fs.collection(db,'characters');
    const api={
      configured:true,ready:true,user:null,error:null,
      async register(username,password){try{return await authPkg.createUserWithEmailAndPassword(auth,loginEmail(username,true),password)}catch(e){throw friendly(e)}},
      async login(usernameOrEmail,password){try{return await authPkg.signInWithEmailAndPassword(auth,loginEmail(usernameOrEmail),password)}catch(e){throw friendly(e)}},
      async google(){try{return await authPkg.signInWithPopup(auth,new authPkg.GoogleAuthProvider())}catch(e){throw friendly(e)}},
      async logout(){await authPkg.signOut(auth)},
      async create(character){
        if(!auth.currentUser)throw Error('Faça login para publicar uma ficha.');
        checkSize(character);
        for(let i=0;i<12;i++){
          const code=makeCode(),ref=fs.doc(col,code);
          try{
            await fs.runTransaction(db,async(tx)=>{
              const found=await tx.get(ref);
              if(found.exists())throw Error('CODE_COLLISION');
              tx.set(ref,{
                ownerId:auth.currentUser.uid, editors:[],
                character,revision:1,
                createdAt:fs.serverTimestamp(), updatedAt:fs.serverTimestamp()
              });
            });
            return await api.read(code);
          }catch(e){if(e.message==='CODE_COLLISION')continue;throw friendly(e)}
        }
        throw Error('Não foi possível gerar um código livre. Tente novamente.');
      },
      async read(rawCode){
        const code=String(rawCode||'').trim().toLowerCase();
        if(!/^[a-z0-9]{3}-[a-z0-9]{3}$/.test(code))throw Error('Código inválido. Use o formato abc-123.');
        try{
          const snap=await fs.getDoc(fs.doc(col,code));
          if(!snap.exists())throw Error('Nenhum personagem encontrado para esse código.');
          return {code,...snap.data()};
        }catch(e){throw friendly(e)}
      },
      async mine(){
        if(!auth.currentUser)return [];
        try{
          const q=fs.query(col,fs.where('ownerId','==',auth.currentUser.uid));
          const snaps=await fs.getDocs(q);
          return snaps.docs.map(s=>({code:s.id,...s.data()}));
        }catch(e){throw friendly(e)}
      },
      async update(code,character,expectedRevision,baseline=null){
        checkSize(character);
        const ref=fs.doc(col,code);
        try{
          const result=await fs.runTransaction(db,async tx=>{
            const snap=await tx.get(ref);
            if(!snap.exists())throw Error('Esta ficha não existe mais na nuvem.');
            const old=snap.data();
            if(!baseline && old.revision!==expectedRevision)throw Error('CONFLICT');
            // Mescla a alteração local com a versão mais recente dentro da transação.
            // O Firestore repete a transação se outra pessoa modificar a ficha.
            const merged=glMerge3(baseline??old.character,old.character,character);
            checkSize(merged);
            tx.update(ref,{character:merged,revision:old.revision+1,updatedAt:fs.serverTimestamp()});
            return {code,ownerId:old.ownerId,revision:old.revision+1,character:merged};
          });
          return result;
        }catch(e){throw e.message==='CONFLICT'?e:friendly(e)}
      },
      watch(rawCode,onChange,onError){
        const code=String(rawCode||'').trim().toLowerCase();
        if(!/^[a-z0-9]{3}-[a-z0-9]{3}$/.test(code))throw Error('Código de personagem inválido.');
        return fs.onSnapshot(fs.doc(col,code),snap=>{
          if(snap.metadata.hasPendingWrites)return;
          if(!snap.exists()){onError?.(new Error('Esta ficha foi removida da nuvem.'));return;}
          onChange({code,...snap.data()});
        },e=>onError?.(friendly(e)));
      },
      async remove(code){
        if(!auth.currentUser)throw Error('Faça login.');
        try{await fs.deleteDoc(fs.doc(col,code))}catch(e){throw friendly(e)}
      }
    };
    window.OPFB=api;
    signal('oprpg-firebase-ready');
    authPkg.onAuthStateChanged(auth,user=>{
      api.user=user?{uid:user.uid,email:usernameOf(user.email)?'':(user.email||''),username:usernameOf(user.email),displayName:usernameOf(user.email)||(user.displayName||'')}:null;
      signal('oprpg-firebase-auth');
    });
  }catch(e){
    window.OPFB={configured:true,ready:false,user:null,error:friendly(e).message};
    signal('oprpg-firebase-ready');
  }
}
