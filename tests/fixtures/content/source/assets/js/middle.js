
    const $=id=>document.getElementById(id);
    const ids=['view-0','view-1','view-2','view-3','view-4','view-5','view-6','view-7','view-8'];
    const names=['Welcome','01 · Structure to substance','02 · Make contributions count','03 · Support the group','04 · Communicate professionally','05 · Navigate the conversation','06 · Put it together','07 · Knowledge check','↗ · Quick reference'];
    const classification=[
        {q:'“We have about 15 minutes left. Should we move to evaluating solutions?”',answer:0,feedback:'This manages time and discussion structure.'},
        {q:'“A report on transportation access could help us assess participation barriers.”',answer:1,feedback:'This introduces research relevant to the problem. An actual contribution should cite its publication and date.'},
        {q:'“Before moving on, does anyone have another perspective?”',answer:0,feedback:'This organizes participation.'},
        {q:'“Combining transportation and outreach could address two barriers at once.”',answer:1,feedback:'This develops a solution by connecting proposals.'},
        {q:'“Our conversation is drifting away from the task.”',answer:0,feedback:'This redirects the group.'}
    ];
    const research=[
        {text:'“Transportation matters. I have seen that myself.”',feedback:'A personal observation does not use the available research.'},
        {text:'“According to the fictional Community Access Survey from May 2025, 38% of surveyed students reported missing at least one after-school activity because of transportation difficulties. We should consider whether transportation support could improve participation.”',feedback:'This identifies the source and date, describes the fictional finding, and connects it to a possible solution.'},
        {text:'“I found a transportation statistic, but we should discuss a different issue.”',feedback:'Research is less useful when it derails the conversation.'},
        {text:'“The survey proves transportation is the only barrier.”',feedback:'The survey does not establish that transportation is the only barrier.'}
    ];
    const group=[
        {title:'The quiet tablemate',q:'Several students have contributed little. The group is about to move on.',options:['“Jordan, you need to talk more.”','“Before we move on, are there any additional perspectives?”','“We have heard enough.”'],answer:1,feedback:'A broad invitation encourages participation without putting one person on the spot.'},
        {title:'The detour',q:'The transportation discussion has drifted into a long debate about lunch menus.',options:['“That has nothing to do with anything.”','“Let’s keep discussing lunch.”','“Could we return to the transportation barriers our plan needs to address?”'],answer:2,feedback:'Respectfully return to the task and offer a way forward.'},
        {title:'The clock',q:'Limited time remains, and the proposed plan is unfinished.',options:['“Could we prioritize recommendations and reserve time to review the plan?”','“I will decide the plan.”','“Time does not matter.”'],answer:0,feedback:'Time management helps the group finish without taking over its decisions.'}
    ];
    const communication=[
        {q:'You disagree with another participant.',options:['Roll your eyes while taking notes.','Keep a neutral expression and explain your concern respectfully.'],answer:1,feedback:'Body language affects collaboration.'},
        {q:'You are making a point in a noisy gym.',options:['Maintain clear volume through the final words.','Let your voice fade before finishing.'],answer:0,feedback:'An audible ending helps others hear your complete thought.'},
        {q:'You are playing a city advisory committee member.',options:['“As speech competitors, we should...”','“As an advisory committee, we should consider...”'],answer:1,feedback:'Stay within your assigned role.'},
        {q:'You are noting another speaker’s important point.',options:['Keep typing without looking up.','Write briefly and look up frequently.'],answer:1,feedback:'Note-taking and visible listening work together.'}
    ];
    const strategies=[
        {title:'Continue assertively',meaning:'Continue a brief point when voices overlap.',advantage:'May preserve a timely point.',risk:'Repeatedly talking over others can appear domineering.',example:'“Let me finish this connection briefly, and then I’d like to hear other perspectives.”'},
        {title:'Request to go first',meaning:'Acknowledge the other speaker and ask to make your point first.',advantage:'Preserves an opportunity while recognizing another person.',risk:'Repeated requests can control the floor. Honor the promised next turn.',example:'“Would you mind if I finish this point first? I’d like to hear you afterward.”'},
        {title:'Yield and request the next turn',meaning:'Let the other person go first, then ask to contribute.',advantage:'Builds trust and balances participation.',risk:'The discussion may move on before your point fits.',example:'“Go ahead. I’d like to build on that afterward.”'},
        {title:'Claim a direct connection',meaning:'Explain why your point responds immediately to the previous speaker.',advantage:'Preserves continuity.',risk:'Repeated urgency claims can dominate the floor.',example:'“Could I respond briefly to that concern before we change topics?”'}
    ];
    const speaking=[
        {title:'Simultaneous start',q:'You and Avery start speaking together. You have spoken often; Avery has not.',options:['Talk louder without acknowledging Avery.','“Go ahead, Avery. I have a related point to share afterward.”','Say your idea is more important.'],answer:1,feedback:['This risks dominating someone with fewer turns.','This supports participation while preserving your opportunity.','This creates unnecessary conflict.']},
        {title:'Direct response',q:'Jordan raises a concern your research addresses, but someone else also wants to speak.',options:['“Could I respond briefly with a relevant finding, then hear the next perspective?”','Ignore them and speak at length.','Never speak if anyone else wants a turn.'],answer:0,feedback:['This explains the connection and acknowledges others.','Relevant research still needs collaborative delivery.','Withholding useful evidence can hinder the group.']},
        {title:'Cut off mid-sentence',q:'Your voice fades and another student begins before you finish.',options:['Stop participating.','Argue over them.','“I’d like to finish this thought, then hear your point.” Finish briefly and yield.'],answer:2,feedback:['Withdrawing prevents contribution.','Escalation does not resolve the speaking order.','This preserves your turn while respecting the other speaker.']}
    ];
    const applications=[
        {options:['“Let’s talk about something else.”','“Building on Maya and Jordan, we could evaluate a small transportation pilot before a larger investment, examining cost and access together.”','“We are almost out of time.”'],answer:1,feedback:'This synthesizes ideas into a possible solution.'},
        {options:['“Sam has spoken, so no one else should.”','“Could we evaluate transportation and communication proposals, then choose final recommendations with our remaining time?”','“I will make the final decision.”'],answer:1,feedback:'This supports the deliverable without taking control from the group.'}
    ];
    const questions=[
        {q:'Which is a substantive contribution?',options:['“Begin the next item.”','“Five minutes remain.”','“Combining the proposals could address cost and accessibility.”','“Could we hear someone else?”'],answer:2,explanation:'Connecting ideas develops a possible solution.'},
        {q:'How is research most useful?',options:['Share every statistic regardless of topic.','Cite publication and date, explain the finding, and connect it to the discussion.','Replace evidence with stories.','Repeat a point for the judge.'],answer:1,explanation:'Relevant, cited, explained evidence supports problem-solving.'},
        {q:'How can you invite someone who has contributed little?',options:['Repeatedly call on them by name.','Ignore participation.','At a transition, invite any additional perspectives.','Criticize quiet participants.'],answer:2,explanation:'A broad invitation avoids putting one person on the spot.'},
        {q:'Why maintain volume through a sentence ending?',options:['It guarantees no interruption.','It helps others hear the complete thought and recognize the turn is not over.','It establishes leadership.','It avoids listening.'],answer:1,explanation:'Clear endings help turn-taking, particularly in noisy rooms.'},
        {q:'You have spoken frequently while another student has not. You start together. What is generally strongest?',options:['Talk over them.','Declare your idea more important.','Yield and ask to share your point afterward.','Stop participating entirely.'],answer:2,explanation:'Yielding balances participation while keeping a future opportunity.'}
    ];
    let current=0,quizIndex=0,selectedQuiz=null;
    const selections={};
    const completed=new Set(),flipped={welcome:new Set(),s1:new Set(),models:new Set(),speaking:new Set()};
    const evidenceOpened=new Set(),communicationOpened=new Set(),strategyOpened=new Set();
    const solved={classify:new Set(),group:new Set(),communication:new Set(),speaking:new Set(),application:new Set()};
    const positions={classify:0,group:0,communication:0,speaking:0};
    const reviewedStrategies=new Set(),openedDetails=new Set(),correctQuiz=new Set();
    let researchCorrect=false,assembled=false;
    function setText(id,value){const el=$(id);if(el.textContent!==value)el.textContent=value}
    const lesson=DSL.createLesson({id:'middle',total:8,reference:8,labels:names,requirements:Array(8).fill('Complete the activities on this page to unlock Next.')});
    let resourceOrigin=0;
    function updateCompletion(){
        const allChecked=id=>[...$(id).querySelectorAll('input')].every(input=>input.checked);
        const ready=[
            flipped.welcome.size===3,
            flipped.s1.size===2&&solved.classify.size===classification.length,
            evidenceOpened.size===4&&flipped.models.size===2&&researchCorrect&&assembled&&allChecked('research-checks'),
            openedDetails.size===4&&solved.group.size===group.length,
            communicationOpened.size===3&&solved.communication.size===communication.length,
            strategyOpened.size===strategies.length&&flipped.speaking.size===2&&solved.speaking.size===speaking.length,
            solved.application.size===2&&$('application-draft').value.trim().length>0&&allChecked('application-checks'),
            correctQuiz.size===questions.length
        ];
        ready.forEach((yes,i)=>{if(yes){completed.add(i);lesson.complete(i)}});
        persist();lesson.update();
    }
    function go(index){if(index===8&&current<8)resourceOrigin=current;if(lesson.go(index))current=index;}
    function persist(){
      const sets={flipped:Object.fromEntries(Object.entries(flipped).map(([k,v])=>[k,[...v]])),evidenceOpened:[...evidenceOpened],communicationOpened:[...communicationOpened],strategyOpened:[...strategyOpened],openedDetails:[...openedDetails],solved:Object.fromEntries(Object.entries(solved).map(([k,v])=>[k,[...v]])),correctQuiz:[...correctQuiz]};
      const fields={};document.querySelectorAll('.lesson-view input,.lesson-view textarea').forEach((el,i)=>{fields[i]=el.type==='checkbox'?el.checked:el.value});
      lesson.record('middleState',{sets,fields,positions:{...positions},researchCorrect,assembled,quizIndex,selections});
    }
    function restore(){
      const saved=lesson.data().middleState;if(!saved)return;
      const refill=(set,arr)=>{set.clear();(arr||[]).forEach(v=>set.add(v))};
      for(const [k,v] of Object.entries(flipped))refill(v,saved.sets?.flipped?.[k]);
      for(const [k,v] of Object.entries(solved))refill(v,saved.sets?.solved?.[k]);
      for(const k of ['evidenceOpened','communicationOpened','strategyOpened','openedDetails','correctQuiz'])refill({evidenceOpened,communicationOpened,strategyOpened,openedDetails,correctQuiz}[k],saved.sets?.[k]);
      Object.assign(selections,saved.selections||{});
      Object.assign(positions,saved.positions||{});researchCorrect=!!saved.researchCorrect;assembled=!!saved.assembled;quizIndex=Math.max(0,Math.min(questions.length-1,saved.quizIndex||0));
      document.querySelectorAll('.lesson-view input,.lesson-view textarea').forEach((el,i)=>{if(Object.prototype.hasOwnProperty.call(saved.fields||{},i)){if(el.type==='checkbox')el.checked=!!saved.fields[i];else el.value=saved.fields[i]}});
      document.querySelectorAll('.flip-card').forEach((card,i)=>{const set=flipped[card.dataset.flipGroup];if(set?.has(i)){card.classList.add('is-flipped');card.setAttribute('aria-pressed','true')}});
      const show=(id,yes)=>{if(yes)$(id).classList.remove('hidden')};
      show('s1-activity',flipped.s1.size===2);show('evidence-after',evidenceOpened.size===4);show('research-activity',flipped.models.size===2);
      show('group-activity',openedDetails.size===4);show('communication-activity',communicationOpened.size===3);
      show('speaking-flashcards',strategyOpened.size===strategies.length);show('speaking-activity',flipped.speaking.size===2);
      for(const key of Object.keys(positions)){const data={classify:classification,group,communication,speaking}[key];renderSequence(key,data,key==='classify'?['Procedural','Substantive']:undefined)}
      for(const key of ['classify','group','communication','speaking']){
        const n=positions[key],data={classify:classification,group,communication,speaking}[key];
        const selected=selections[`${key}-options-${n}`];
        if(selected!==undefined)showChoice(`${key}-options`,selected,data[n].answer);
      }
      if(selections['research-options']!==undefined){const n=selections['research-options'];showChoice('research-options',n,1);feedback('research-feedback',research[n].feedback,n===1)}
      for(const [suffix,n] of [['a',0],['b',1]]){const id=`application-${suffix}-options`;if(selections[id]!==undefined){const selected=selections[id];showChoice(id,selected,applications[n].answer);feedback(`application-${suffix}-feedback`,applications[n].feedback,selected===applications[n].answer)}}
      renderQuiz();
    }
    function choiceButtons(id,options,onPick){
        const box=$(id);box.replaceChildren();
        options.forEach((label,i)=>{const button=document.createElement('button');button.type='button';button.className='option';button.textContent=label;button.addEventListener('click',()=>onPick(i));box.append(button)});
    }
    function showChoice(id,selected,answer){selections[id]=selected;[...$(id).children].forEach((button,i)=>{const chosen=i===selected;button.classList.toggle('correct',chosen&&selected===answer);button.classList.toggle('incorrect',chosen&&selected!==answer);button.classList.toggle('selected-answer',chosen);button.classList.toggle('selected-correct',chosen&&selected===answer);button.classList.toggle('selected-incorrect',chosen&&selected!==answer);button.setAttribute('aria-pressed',String(chosen))})}
    function feedback(id,message,good){setText(id,`${good?'Good choice. ':'Not quite. '}${message}`);$(id).classList.toggle('bad',!good)}
    function renderSequence(key,data,labels){
        const n=positions[key],item=data[n];
        const prior=selections[`${key}-options-${n}`];
        setText(`${key}-question`,`${n+1} of ${data.length} · ${item.title?item.title+' — ':''}${item.q}`);
        choiceButtons(`${key}-options`,item.options||labels,i=>{
            showChoice(`${key}-options`,i,item.answer);
            selections[`${key}-options-${n}`]=i;
            feedback(`${key}-feedback`,key==='speaking'?item.feedback[i]:item.feedback,i===item.answer);
            if(i===item.answer){solved[key].add(n);$(`${key}-next`).hidden=false}
            setText(`${key}-count`,`${solved[key].size}/${data.length} correct`);
            updateCompletion();
        });
        if(prior!==undefined){const selected=prior;showChoice(`${key}-options`,selected,item.answer);feedback(`${key}-feedback`,key==='speaking'?item.feedback[selected]:item.feedback,selected===item.answer)}else setText(`${key}-feedback`,'');
        $(`${key}-next`).hidden=!solved[key].has(n);
        setText(`${key}-next`,n===data.length-1?'Review first →':'Next →');
        setText(`${key}-count`,`${solved[key].size}/${data.length} correct`);
    }
    function renderResearch(){
        choiceButtons('research-options',research.map(item=>item.text),i=>{
            showChoice('research-options',i,1);feedback('research-feedback',research[i].feedback,i===1);
            if(i===1)researchCorrect=true;
            updateCompletion();
        });
    }
    function renderStrategies(){
        document.querySelectorAll('#strategy-details details').forEach((detail,i)=>detail.addEventListener('toggle',()=>{
            if(detail.open){strategyOpened.add(i);if(strategyOpened.size===strategies.length)$('speaking-flashcards').classList.remove('hidden');updateCompletion()}
        }));
    }
    function renderApplications(){
        applications.forEach((item,n)=>{
            const suffix=n?'b':'a';
            choiceButtons(`application-${suffix}-options`,item.options,i=>{
                showChoice(`application-${suffix}-options`,i,item.answer);
                feedback(`application-${suffix}-feedback`,item.feedback,i===item.answer);
                if(i===item.answer)solved.application.add(suffix);
                updateCompletion();
            });
        });
    }
    function renderQuiz(){
        const item=questions[quizIndex];
        const key=`quiz-${quizIndex}`;
        const selected=selections[key];
        setText('quiz-number',`Question ${quizIndex+1} of ${questions.length}`);
        setText('quiz-question',item.q);
        choiceButtons('quiz-options',item.options,i=>{
            selections[key]=i;
            if(i===item.answer)correctQuiz.add(quizIndex);
            renderQuiz();updateCompletion();
        });
        if(selected!==undefined){
            showChoice('quiz-options',selected,item.answer);
            feedback('quiz-feedback',item.explanation+(selected===item.answer?'':' Try another option.'),selected===item.answer);
        }else{setText('quiz-feedback','');$('quiz-feedback').classList.remove('bad')}
        $('quiz-submit').hidden=true;
        $('quiz-next').hidden=!correctQuiz.has(quizIndex);
        setText('quiz-next',quizIndex===questions.length-1?'Review first →':'Next question →');
        setText('quiz-score',`Score: ${correctQuiz.size}/${questions.length} · ${correctQuiz.size*20}%`);
        const status=$('quiz-status');status.replaceChildren();
        questions.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.className='btn small';button.textContent=`${correctQuiz.has(i)?'✓ Correct':'○ Not yet correct'} · Q${i+1}`;button.addEventListener('click',()=>{quizIndex=i;renderQuiz();persist()});status.append(button)});
        if(correctQuiz.has(quizIndex)&&selected!==undefined&&selected!==item.answer){
            setText('quiz-feedback',`Previously completed correctly. ${item.explanation} You may explore other answers without losing credit.`);
        }
    }
    function addChecks(id,items,prefix,onChange){
        const box=$(id);box.replaceChildren();
        items.forEach((value,i)=>{
            const label=document.createElement('label'),input=document.createElement('input');
            input.type='checkbox';input.id=`${prefix}-${i}`;label.htmlFor=input.id;label.className='checkrow';
            input.addEventListener('change',onChange);label.append(input,document.createTextNode(value));box.append(label);
        });
    }
    async function copyText(value,statusId){
        if(!value.trim()){setText(statusId,'Nothing to copy yet. Write a response first.');return}
        try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(value);setText(statusId,'Copied to clipboard.')}
        catch{
            const status=$(statusId),area=document.createElement('textarea');area.value=value;area.rows=7;area.className='text-field copy-fallback mt-3';area.setAttribute('aria-label','Select and copy this text');
            status.replaceChildren(document.createTextNode('Clipboard unavailable. Select and copy the text below:'),area);area.focus();area.select();
        }
    }
    const referenceText=`MIDDLE STAGE QUICK REFERENCE
1. CONTRIBUTE SUBSTANCE
• Share relevant research. Cite publication and date.
• Explain why evidence matters. Use anecdotes to illustrate, not replace, evidence.
2. SUPPORT THE GROUP
• Take notes and look up regularly. Track time, invite perspectives, and redirect respectfully.
3. COMMUNICATE PROFESSIONALLY
• Address fellow discussants. Speak within your role and finish sentences audibly.
4. MANAGE SPEAKING CONFLICTS
• Balance assertiveness with collaboration. Honor promised turns.
5. YOUR GOAL
Contribute evidence. Build on others. Keep the group moving toward a solution.
These coaching strategies do not replace official tournament rules.`;
    function init(){
        lesson.init();
        document.querySelectorAll('.flip-card').forEach((card,index)=>{
            const flip=()=>{
                const active=card.classList.toggle('is-flipped');card.setAttribute('aria-pressed',String(active));
                if(card.dataset.flipGroup)flipped[card.dataset.flipGroup].add(index);
                // Speaking cards use the same explicit group tracking as other flashcards.
                // Their group is identified in HTML, not by Canva template metadata.
                if(flipped.speaking.size===2)$('speaking-activity').classList.remove('hidden');
                if(flipped.s1.size===2)$('s1-activity').classList.remove('hidden');
                if(flipped.models.size===2)$('research-activity').classList.remove('hidden');
                updateCompletion();
            };
            card.addEventListener('click',flip);
            card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();flip()}});
        });
        document.querySelectorAll('#collaboration-details details').forEach((detail,i)=>detail.addEventListener('toggle',()=>{if(detail.open){openedDetails.add(i);if(openedDetails.size===4)$('group-activity').classList.remove('hidden');updateCompletion()}}));
        document.querySelectorAll('#evidence-details details').forEach((detail,i)=>detail.addEventListener('toggle',()=>{if(detail.open){evidenceOpened.add(i);if(evidenceOpened.size===4)$('evidence-after').classList.remove('hidden');updateCompletion()}}));
        document.querySelectorAll('#communication-details details').forEach((detail,i)=>detail.addEventListener('toggle',()=>{if(detail.open){communicationOpened.add(i);if(communicationOpened.size===3)$('communication-activity').classList.remove('hidden');updateCompletion()}}));
        addChecks('research-checks',['I identified a source and date.','I explained the finding accurately.','I connected the finding to the task.','I avoided overstating what it proves.'],'research-check',updateCompletion);
        addChecks('application-checks',['I connected at least two existing ideas.','I added an insight or solution.','I stayed focused on the task.','I used a professional tone.','I did not claim unsupported evidence.'],'application-check',updateCompletion);
        $('application-draft').addEventListener('input',updateCompletion);
        renderSequence('classify',classification,['Procedural','Substantive']);
        renderSequence('group',group);renderSequence('communication',communication);renderSequence('speaking',speaking);
        ['classify','group','communication','speaking'].forEach(key=>$(key+'-next').addEventListener('click',()=>{
            const data={classify:classification,group,communication,speaking}[key];
            positions[key]=(positions[key]+1)%data.length;renderSequence(key,data,key==='classify'?['Procedural','Substantive']:undefined);
        }));
        renderResearch();renderStrategies();renderApplications();renderQuiz();
        $('assemble-button').addEventListener('click',()=>{
            const source=$('source').value.trim(),finding=$('finding').value.trim(),why=$('why').value.trim();
            if(!source||!finding||!why){setText('assembly-status','Fill in all three fields first.');return}
            $('assembled').value=`According to ${source}, ${finding.replace(/[. ]+$/,'')}. This matters to our task because ${why.replace(/[. ]+$/,'')}.`;
            assembled=true;setText('assembly-status','Assembled from your words; this response has not been fact-checked.');updateCompletion();
        });
        $('assembly-copy-button').addEventListener('click',()=>copyText($('assembled').value,'assembly-status'));
        $('research-model-button').addEventListener('click',()=>$('research-model').classList.remove('hidden'));
        $('application-model-button').addEventListener('click',()=>$('application-model').classList.remove('hidden'));
        $('application-copy-button').addEventListener('click',()=>copyText($('application-draft').value,'application-copy'));
        $('speaking-try').addEventListener('click',()=>{setText('speaking-feedback','Choose another strategy to compare its consequence.');[...$('speaking-options').children].forEach(button=>button.classList.remove('correct','incorrect'))});
        $('speaking-options').addEventListener('click',()=>{$('speaking-try').hidden=false});
        $('quiz-next').addEventListener('click',()=>{if(quizIndex===questions.length-1){quizIndex=0;renderQuiz()}else{quizIndex++;renderQuiz()}});
        $('print-reference').addEventListener('click',()=>window.print());
        restore();updateCompletion();
        if(window.lucide)lucide.createIcons();
    }
    init();
