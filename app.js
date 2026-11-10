const tabs=[...document.querySelectorAll('nav button')];
function go(id){document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===id));tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));window.scrollTo({top:0,behavior:'smooth'})}
tabs.forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
const organData={
ovarios:['Ovários','São as gônadas femininas. Neles ocorre o desenvolvimento dos folículos e a liberação do ovócito na ovulação. Também produzem hormônios, como estrogênios e progesterona.'],
utero:['Útero','Órgão muscular onde pode ocorrer a implantação e o desenvolvimento da gestação. Seu revestimento interno, o endométrio, sofre mudanças ao longo do ciclo.'],
tubas:['Tubas uterinas','Conduzem o ovócito em direção ao útero. A fecundação, quando ocorre, geralmente acontece em uma tuba uterina.'],
vagina:['Vagina','Canal que comunica o útero ao meio externo. É por ela que ocorre a saída do fluxo menstrual.']
};
document.querySelectorAll('.organ-select').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.organ-select').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');const d=organData[btn.dataset.organ];const box=document.getElementById('organInfo');box.innerHTML='<span class="tag">ESTRUTURA SELECIONADA</span><h3>'+d[0]+'</h3><p>'+d[1]+'</p>';box.scrollIntoView({behavior:'smooth',block:'nearest'});}));
const mapExplanations={
hipotalamo:['Hipotálamo — GnRH','O hipotálamo, uma região do encéfalo, libera o hormônio GnRH em pulsos. Esse sinal estimula a hipófise anterior a liberar FSH e LH.'],
hipofise:['Hipófise anterior — FSH e LH','Em resposta ao GnRH, a hipófise anterior libera as gonadotrofinas FSH e LH na circulação. Esses hormônios chegam aos ovários e regulam a atividade ovariana.'],
fsh:['FSH — desenvolvimento folicular','O hormônio folículo-estimulante participa do recrutamento e do crescimento dos folículos ovarianos. Os folículos em desenvolvimento produzem estrogênio.'],
lh:['LH — ovulação','O hormônio luteinizante participa do amadurecimento final do folículo. Seu pico, provocado pelo feedback positivo do estrogênio elevado, desencadeia a ovulação e a formação do corpo lúteo.'],
ovarios:['Ovários — folículo e corpo lúteo','Nos ovários, os folículos amadurecem. Na ovulação, o ovócito é liberado. O folículo rompido transforma-se em corpo lúteo, que secreta principalmente progesterona e também estrogênio.'],
estrogenio:['Estrogênio — fase proliferativa','Produzido principalmente pelos folículos em desenvolvimento, o estrogênio estimula a reconstrução e o espessamento do endométrio. Quando permanece elevado no final da fase folicular, participa do feedback positivo que antecede a ovulação.'],
progesterona:['Progesterona — fase secretora','Produzida principalmente pelo corpo lúteo após a ovulação, a progesterona transforma o endométrio em um tecido secretor e ajuda a mantê-lo preparado para uma possível implantação.'],
utero:['Útero e endométrio — mudanças ao longo do ciclo','O endométrio descama durante a menstruação, reconstrói-se sob ação do estrogênio e torna-se secretor sob ação da progesterona. Essas mudanças são coordenadas pelos hormônios ovarianos.'],
menstruacao:['Menstruação — queda hormonal','Se não houver gestação, o corpo lúteo regride. A produção de progesterona e estrogênio diminui, o que desencadeia a descamação de parte do endométrio e o fluxo menstrual.']
};
document.querySelectorAll('.map-node').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.map-node').forEach(n=>n.setAttribute('aria-pressed','false'));
 btn.setAttribute('aria-pressed','true');
 const item=mapExplanations[btn.dataset.map];
 document.getElementById('mapInfo').innerHTML='<span class="tag">CONCEITO EXPLICADO</span><h3>'+item[0]+'</h3><p>'+item[1]+'</p>';
}));
const range=document.getElementById('dayRange');
function hormone(day,name){
 let v=10;
 if(name==='FSH'){v=day<5?48:day<12?25:day<16?35:day<25?12:22}
 if(name==='LH'){v=day<12?8:day===12?28:day===13?75:day===14?100:day===15?35:8}
 if(name==='Estrogênio'){v=day<5?12:day<12?25+(day-5)*6:day<14?80-(day-12)*18:day<22?35:day<25?25:12}
 if(name==='Progesterona'){v=day<14?5:day<17?15+(day-14)*15:day<22?75:day<25?65-(day-22)*15:12}
 return Math.max(6,Math.min(100,v));
}
function updateDay(){
 const d=+range.value;document.getElementById('dayNum').textContent=d;
 let phase,ov,ut,why;
 if(d<=5){phase='Menstruação / início folicular';ov='O corpo lúteo do ciclo anterior regrediu. Um novo grupo de folículos começa a se desenvolver.';ut='A queda de estrogênio e progesterona desencadeia a descamação do endométrio.';why='A redução de progesterona e estrogênio após a regressão do corpo lúteo está associada ao início da menstruação.'}
 else if(d<=13){phase='Fase folicular';ov='Um folículo se desenvolve e amadurece. As células foliculares produzem quantidades crescentes de estrogênio.';ut='O endométrio se reconstrói e aumenta de espessura, fase chamada proliferativa.';why='O estrogênio produzido pelos folículos estimula a reconstrução do endométrio. Quando permanece elevado, favorece o feedback positivo que antecede o pico de LH.'}
 else if(d===14){phase='Ovulação (referência didática)';ov='O pico de LH desencadeia a ruptura do folículo e a liberação do ovócito.';ut='O endométrio está espesso e continua sob influência dos hormônios ovarianos.';why='O pico de LH é o principal sinal hormonal que desencadeia a ovulação. O dia 14 é apenas uma referência para um ciclo de 28 dias.'}
 else {phase='Fase lútea';ov='O folículo rompido transforma-se em corpo lúteo, que produz principalmente progesterona.';ut='O endométrio entra na fase secretora e fica mais preparado para uma possível implantação.';why=d<26?'A progesterona do corpo lúteo ajuda a manter o endométrio. Se não houver gestação, o corpo lúteo tende a regredir.':'No final de um ciclo sem gestação, a regressão do corpo lúteo reduz progesterona e estrogênio, levando à descamação do endométrio.'}
 document.getElementById('dayTitle').textContent='Dia '+d+' — '+phase;
 document.getElementById('phaseTag').textContent=phase;
 document.getElementById('ovaryText').textContent=ov;document.getElementById('uterusText').textContent=ut;document.getElementById('whyText').textContent=why;
 document.getElementById('hormoneBars').innerHTML=['FSH','LH','Estrogênio','Progesterona'].map(n=>{let v=hormone(d,n);return '<div class="hormone-row"><b>'+n+'</b><div class="bar"><span style="width:'+v+'%;background:'+(n==='LH'?'#b18ab8':n==='FSH'?'#7da58c':n==='Estrogênio'?'#d5a56d':'#8199bd')+'"></span></div><span class="small">'+(v>70?'Elevado':v>35?'Intermediário':'Baixo')+'</span></div>'}).join('');
}
range.addEventListener('input',updateDay);updateDay();
const correct={q1:'b',q2:'a',q3:'c',q4:'b',q5:'c'};
const feedback={
q1:'Correto! O hipotálamo libera GnRH, que estimula a hipófise a secretar FSH e LH; esses hormônios atuam nos ovários.',
q2:'Correto! O FSH participa do recrutamento e desenvolvimento dos folículos ovarianos.',
q3:'Correto! O pico de LH desencadeia a ovulação.',
q4:'Correto! Após a ovulação, o folículo rompido forma o corpo lúteo, que secreta principalmente progesterona.',
q5:'Correto! A regressão do corpo lúteo reduz progesterona e estrogênio, levando à descamação do endométrio.'
};
function gradeQuiz(){let score=0,answered=0;for(let i=1;i<=5;i++){let q='q'+i,sel=document.querySelector('input[name='+q+']:checked'),box=document.getElementById('f'+i);box.classList.add('show');if(sel){answered++;if(sel.value===correct[q]){score++;box.innerHTML='✓ '+feedback[q];box.style.background='#edf5ee'}else{box.innerHTML='✕ Não é essa. '+feedback[q]+' Revise a relação entre as estruturas e os hormônios.';box.style.background='#fbefeb'}}else{box.innerHTML='Você não selecionou uma alternativa. Resposta correta: '+correct[q].toUpperCase()+'. '+feedback[q];box.style.background='#f8f2e7'}}document.getElementById('result').innerHTML='<div class="score">Resultado: '+score+'/5</div><p>'+ (score===5?'Excelente! Você concluiu a investigação com domínio dos conceitos.':score>=3?'Bom trabalho! Revise os feedbacks das questões que errou.':'Continue investigando. Retorne ao mapa mental e ao simulador e tente novamente.')+'</p>'}
function resetQuiz(){document.getElementById('quizForm').reset();for(let i=1;i<=5;i++){let b=document.getElementById('f'+i);b.classList.remove('show');b.textContent='';b.style.background=''}document.getElementById('result').innerHTML=''}
