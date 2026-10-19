/* Final Stage activity engine, shared navigation and browser-local persistence. */
(()=>{
        const $ = id => document.getElementById(id);
        const questions = {
            1:[
                {q:"“We discussed three solutions: extended program hours, transportation support, and better advertising.”",a:["Summary","Synthesis","Neither / primarily procedural"],correct:0,why:["This summarizes proposals already discussed without developing a new recommendation.","This lists existing ideas but does not connect them into a new direction.","This is substantive: it restates proposals, rather than managing the process."]},
                {q:"“If we combine Avery's outreach proposal with Maya's transportation pilot, we could test whether awareness and access need to improve together.”",a:["Summary","Synthesis","Neither / primarily procedural"],correct:1,why:["It goes beyond restating ideas by proposing a combined test.","This credits two ideas and develops a combined approach.","This develops the group's thinking, rather than managing procedure."]},
                {q:"“We have six minutes remaining. Should we move to our final recommendations?”",a:["Summary","Synthesis","Neither / primarily procedural"],correct:2,why:["It doesn't recap any findings.","It doesn't develop a new substantive insight.","This manages the group's process and time."]},
                {q:"“Our main concern was affordability. We agreed to recommend a small pilot and review its costs before expansion.”",a:["Summary","Synthesis","Neither / primarily procedural"],correct:0,why:["This restates the group's concern and agreed recommendation.","It reports a decision rather than forming a new connection.","It describes substantive findings rather than procedure."]},
                {q:"“Jordan raised the cost issue, and Sam suggested a phased approach. Combining those ideas, we could make cost reviews a requirement before each phase expands.”",a:["Summary","Synthesis","Neither / primarily procedural"],correct:1,why:["The speaker adds a new requirement, not just a recap.","It credits existing ideas and combines them into a developed recommendation.","This is substantive reasoning, not process management."]}
            ],
            2:[{q:"Which combination creates the clearest new direction?",a:["Repeat Maya's transportation idea without addressing the others.","Combine transportation access, cost controls, communication, and a pilot into a coordinated recommendation.","Select whichever idea was mentioned most often."],correct:1,why:["Repeating one idea overlooks the other viewpoints.","This combines proposals and concerns into a possible implementation strategy.","Frequency alone does not establish the best solution."]}],
            3:[{q:"Which is the strongest final summary?",a:["Everyone contributed good ideas, and I think we solved the task.","Our group identified transportation, affordability, and communication barriers. We agreed to recommend a limited pilot combining transportation assistance and outreach, with evaluation before expansion. We still need to clarify the funding source.","Maya said one thing, Jordan said another, Avery added something, and Sam had another idea."],correct:1,why:["This is too vague and claims success without identifying findings.","This states major issues, the agreed recommendation, and an unresolved question.","This repeats the speaking order without organizing findings."]}],
            4:[
                {context:"Five support a city-funded transportation pilot; two object over costs. The task asks for unanimity.",q:"What is the most constructive next step?",a:["Declare that five votes are enough.","Ask the concerned participants what changes would make the proposal acceptable.","Ignore objections and move to the summary."],correct:1,why:["A majority does not resolve objections when seeking unanimity.","Understanding concerns opens a path to negotiation.","Ignoring concerns prevents meaningful consensus."]},
                {context:"The two participants could support the pilot if initial costs are limited.",q:"Which response best advances consensus?",a:["Propose a limited pilot with a spending cap and evaluation before expansion.","Your concerns are holding everyone back.","Abandon transportation without discussing alternatives."],correct:0,why:["This addresses the concern while retaining the proposal.","Criticism makes negotiation harder.","A workable compromise deserves consideration first."]},
                {context:"A possible compromise has emerged, but only two minutes remain.",q:"What should happen now?",a:["Begin an extended debate on unrelated alternatives.","State the revised recommendation and ask whether substantial concerns remain.","Assume silence means everyone agrees."],correct:1,why:["This distracts from a timely decision.","A focused check tests whether the compromise is supported.","Silence alone does not establish support."]}
            ],
            5:[
                {q:"Which required element is least developed?",a:["Transportation access.","Communication.","Affordability."],correct:2,why:["The transportation pilot addresses access.","The social media campaign addresses communication.","The proposal does not explain how it remains affordable."]},
                {q:"Which revision most directly addresses the gap?",a:["Add a spending cap, identify potential funding, and evaluate costs before expansion.","Repeat the proposal more confidently.","Ask whether everyone thinks the task is solved."],correct:0,why:["These add concrete affordability considerations.","Confidence does not fill a missing requirement.","A vague question does not repair the proposal."]},
                {q:"Which closing question is most useful?",a:["Does everyone think we did a good job?","Does our revised proposal address access, communication, and affordability realistically, and can we all support it?","Can we finish now?"],correct:1,why:["This asks for an impression, not a task audit.","This checks requirements and invites meaningful confirmation.","This asks about timing rather than the deliverable."]}
            ],
            6:[
                {q:"The round ends as the judge prepares the ballot. What should you do?",a:["Stay to discuss your performance.","Gather belongings and leave promptly.","Ask how you ranked."],correct:1,why:["Lingering interferes with the judge's responsibilities.","Leaving promptly respects the judge and schedule.","The judge should not be pressed for rankings."]},
                {q:"The judge offers unsolicited verbal feedback. What is best?",a:["Politely conclude, leave, and consult your coach.","Argue about the rules.","Encourage a critique of everyone."],correct:0,why:["Your coach can determine whether follow-up is appropriate.","Students should not confront judges.","A prolonged critique at the table is inappropriate."]},
                {q:"Which response supports professional relationships?",a:["You made a thoughtful point about costs. I appreciated that perspective.","Our group would have been better without some ideas.","The judge clearly preferred my contributions."],correct:0,why:["Specific, sincere recognition builds relationships.","Criticizing others undermines professionalism.","Claiming a judge's preference is inappropriate."]}
            ],
            7:[
                {q:"Which contribution best connects the viewpoints?",a:["Maya had the best idea, so let's use that.","Building on Maya's transportation proposal, Jordan's cost concern, and Avery's communication idea, we could recommend a limited pilot paired with outreach and a cost review.","Everyone has made good points."],correct:1,why:["This discards other perspectives.","It credits multiple contributors and coordinates their ideas.","It does not develop a recommendation."]},
                {q:"Which summary accurately represents the proposed direction?",a:["We discussed possibilities and the problem matters.","Our proposed plan combines transportation assistance and improved outreach, with an initial pilot and cost evaluation before expansion.","We solved every problem affecting teen participation."],correct:1,why:["This omits the actual proposed outcome.","This identifies components without exaggeration.","This claims more than the proposal establishes."]},
                {q:"Jordan still wants a clear spending limit. What should the group do?",a:["Add a spending cap and check whether it addresses the concern.","Ignore Jordan because the others agree.","End without confirming support."],correct:0,why:["This addresses the remaining objection and supports consensus.","A majority does not erase a meaningful concern.","Support remains unconfirmed."]},
                {q:"Which closing question best evaluates the proposal?",a:["Was that a good discussion?","Does our revised proposal address access, communication, and affordability, and can everyone support it?","Did we all speak enough?"],correct:1,why:["This asks for a general impression.","This checks requirements and group support.","Speaking time is not the final task audit."]}
            ],
            8:[
                {q:"Which statement best describes synthesis?",a:["Repeat comments in speaking order.","Combine viewpoints into a new insight or recommendation.","Ask how much time remains.","Select the most popular proposal."],correct:1,why:["That is a chronological recap.","Synthesis uses connections to advance thinking.","That is procedural.","Popularity alone is not synthesis."]},
                {q:"What makes a final summary effective?",a:["Include every sentence spoken.","Focus only on your own ideas.","Organize findings, accurately identify agreements, and credit contributors.","Declare success without review."],correct:2,why:["A summary should be concise.","It represents the group's work.","It also distinguishes agreements from unresolved concerns.","Review is needed before claiming completion."]},
                {q:"A unanimous recommendation is needed, but two participants object. What next?",a:["Declare victory by majority.","Explore concerns and negotiate revisions.","Ignore objections.","End immediately."],correct:1,why:["A majority is not unanimity.","Consensus requires addressing concerns.","Their objections still matter.","This leaves the disagreement unresolved."]},
                {q:"How should the group check task completion?",a:["Ask if everyone enjoyed it.","Assume the final minutes mean success.","Compare the proposal against the required problem and deliverable components.","Recap every comment chronologically."],correct:2,why:["Enjoyment is not a task criterion.","Time elapsed does not establish completion.","A task-focused review reveals missing requirements.","Speaking order does not evaluate the deliverable."]},
                {q:"The judge offers unsolicited performance comments. What should you do?",a:["Challenge the judge publicly.","Ask for your ranking.","Respond politely, leave, and consult your coach.","Encourage a lengthy critique."],correct:2,why:["Do not confront judges.","Do not solicit rankings.","A coach can determine appropriate follow-up.","Avoid extending the interaction at the table."]}
            ]
        };
        const notes = [
            ["Maya: Transportation barriers prevent some students from attending.",0,"Transportation is an access barrier."],
            ["Jordan: The group should consider program costs.",0,"Cost is an affordability concern."],
            ["Avery: Students need clearer information about opportunities.",0,"Lack of awareness is a communication barrier."],
            ["Sam: A pilot could test the proposal before expansion.",1,"A pilot is a proposed implementation approach."],
            ["All: Recommend a limited pilot combining transportation assistance and outreach.",2,"This explicitly identifies the agreed recommendation."],
            ["All: What funding source would support the pilot?",3,"Funding remains unresolved; do not present it as settled."]
        ];
        const checkLabels = {
            2:["I connected at least two viewpoints.","I credited the people whose ideas I used.","I added a new insight or recommendation.","My contribution addresses the task.","My language is collaborative and professional."],
            7:["I accurately described the proposal.","I credited at least two participants.","I connected ideas rather than just listing them.","I addressed access, communication, and affordability.","I invited confirmation or identified an unresolved concern.","My language was concise, respectful, and professional."]
        };
        const size = (group,p) => (group[p] || new Set()).size;
        const allAnswered = p => size(state.answers,p) === questions[p].length;
        const allFields = () => ["build-1","build-2","build-3"].every(id => $(id).value.trim());


        const state={flips:{},panels:{},answers:{},quizIndex:{},completed:new Set(),assembled:false,builderModel:false,closingModel:false,checks:{},notes:{},goals:new Set(),selections:{}};
        const lesson=DSL.createLesson({id:'final',total:9,reference:9,labels:["Welcome — Why the Final Stage Matters","01 — Summary or Synthesis?","02 — Connect the Viewpoints","03 — Organize the Findings","04 — Build Genuine Consensus","05 — Check the Task","06 — Finish Professionally","07 — Practice Your Closing","08 — Knowledge Check","Quick Reference"],requirements:Array(9).fill('Complete the activities on this page to unlock Next.')});
        function complete(p){
            if(p===0)return size(state.flips,0)===3;
            if(p===1)return size(state.flips,1)===2 && allAnswered(1);
            if(p===2)return size(state.panels,2)===4 && allAnswered(2) && allFields() && state.assembled && state.builderModel && size(state.checks,2)===5;
            if(p===3)return size(state.panels,3)===2 && Object.keys(state.notes).length===6 && allAnswered(3);
            if(p===4)return size(state.flips,4)===3 && allAnswered(4);
            if(p===5)return size(state.panels,5)===3 && allAnswered(5);
            if(p===6)return size(state.panels,6)===4 && allAnswered(6);
            if(p===7)return allAnswered(7) && $('closing-text').value.trim().length>0 && state.closingModel && size(state.checks,7)===checkLabels[7].length;
            if(p===8)return allAnswered(8);
            return false;
        }
        let restoring=false;
        function persist(){
          if(restoring)return;
          const sets=obj=>Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,[...v]]));
          const fields={};document.querySelectorAll('.lesson-view textarea,.lesson-view input').forEach(el=>{if(el.id)fields[el.id]=el.type==='checkbox'?el.checked:el.value});
          const panels=Object.fromEntries([...document.querySelectorAll('details.panel')].map((el,i)=>[i,el.open]));
          lesson.record('finalState',{flips:sets(state.flips),panels:sets(state.panels),answers:sets(state.answers),checks:sets(state.checks),notes:state.notes,goals:[...state.goals],selections:state.selections,quizIndex:state.quizIndex,assembled:state.assembled,builderModel:state.builderModel,closingModel:state.closingModel,fields,panelsOpen:panels});
        }
        function refresh(){
          if(restoring)return;
          for(let p=0;p<9;p++)if(complete(p))lesson.complete(p);
          $('welcome-ready').classList.toggle('hidden',!complete(0));
          $('s1-reveal').classList.toggle('hidden',size(state.flips,1)<2);
          $('s2-reveal').classList.toggle('hidden',size(state.panels,2)<4);
          $('builder-area').classList.toggle('hidden',!allAnswered(2));
          $('s3-reveal').classList.toggle('hidden',size(state.panels,3)<2);
          $('s3-summary').classList.toggle('hidden',Object.keys(state.notes).length<6);
          $('s4-reveal').classList.toggle('hidden',size(state.flips,4)<3);
          $('s5-reveal').classList.toggle('hidden',size(state.panels,5)<3);
          $('s6-reveal').classList.toggle('hidden',size(state.panels,6)<4);
          $('closing-area').classList.toggle('hidden',!allAnswered(7));
          $('completion').classList.toggle('hidden',!complete(8));
          if(complete(8)){
             $('final-score').textContent='Final score: '+size(state.answers,8)+' / 5';
             $('complete-progress').textContent=lesson.completed.size+' of 9 lesson pages complete.';
          }
          lesson.update();persist();
        }
        function restore(){
          const saved=lesson.data().finalState;if(!saved)return;
          restoring=true;
          const load=(key)=>{for(const [p,arr] of Object.entries(saved[key]||{}))state[key][p]=new Set(arr)};
          ['flips','panels','answers','checks'].forEach(load);
          state.notes=saved.notes||{};state.goals=new Set(saved.goals||[]);state.selections=saved.selections||{};state.quizIndex=saved.quizIndex||{};
          state.assembled=!!saved.assembled;state.builderModel=!!saved.builderModel;state.closingModel=!!saved.closingModel;
          for(const [id,value] of Object.entries(saved.fields||{})){const el=$(id);if(el){if(el.type==='checkbox')el.checked=!!value;else el.value=value}}
          document.querySelectorAll('.flip').forEach(el=>{const on=state.flips[el.dataset.page]?.has(Number(el.dataset.flip));if(on){el.classList.add('flipped');el.setAttribute('aria-pressed','true');el.querySelector('.visited').textContent='✓ Explored'}});
          document.querySelectorAll('details.panel').forEach((el,i)=>{if(saved.panelsOpen?.[i]){el.open=true;el.classList.add('visited')}});
          if(state.assembled){$('assembled-area').classList.remove('hidden')}
          if(state.builderModel){$('builder-model').classList.remove('hidden');$('checklist-2').classList.remove('hidden')}
          if(state.closingModel){$('closing-model').classList.remove('hidden');$('checklist-7').classList.remove('hidden')}
          restoring=false;
        }
        function renderQuestion(p){
            const idx=state.quizIndex[p]||0, q=questions[p][idx], solved=(state.answers[p]||new Set()).has(idx), box=$("quiz-"+p);
            const key=p+":"+idx;
            const selected=state.selections[key];
            box.replaceChildren();
            const heading=document.createElement("h3");
            heading.textContent=p===8?"Knowledge check":p===7?"Final-minutes decision":p===4?"Consensus decision lab":"Practice activity";
            box.append(heading);
            const counter=document.createElement("p");counter.className="eyebrow";
            counter.textContent="Question "+(idx+1)+" of "+questions[p].length+(p===8?" · Score "+size(state.answers,8)+"/5":"");
            box.append(counter);
            if(q.context){const context=document.createElement("p");context.className="notice mt-4";context.textContent=q.context;box.append(context)}
            const prompt=document.createElement("p");prompt.className="font-bold mt-4";prompt.textContent=q.q;box.append(prompt);
            const choices=document.createElement("div");choices.setAttribute('role','group');choices.setAttribute('aria-label','Answer choices');box.append(choices);
            const feedback=document.createElement("p");feedback.className="feedback hidden";
            feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
            if(selected!==undefined){
                const correct=Number(selected)===q.correct;
                feedback.className='feedback '+(correct?'right':'wrong');
                feedback.textContent=(correct?'Correct. ':'Not quite. ')+q.why[Number(selected)]+(correct?'':' Try another option.');
            }
            q.a.forEach((text,n)=>{
                const button=document.createElement("button");button.type="button";button.className="choice";
                button.textContent=String.fromCharCode(65+n)+". "+text;
                const chosen=Number(selected)===n;
                button.classList.toggle('selected-answer',chosen);
                button.classList.toggle('selected-correct',chosen&&n===q.correct);
                button.classList.toggle('selected-incorrect',chosen&&n!==q.correct);
                button.setAttribute('aria-pressed',String(chosen));
                button.addEventListener("click",()=>{
                    state.selections[key]=n;
                    if(n===q.correct)(state.answers[p]??=new Set()).add(idx);
                    renderQuestion(p);refresh();
                });
                choices.append(button);
            });
            box.append(feedback);
            if(solved&&Number(selected)!==q.correct){
                const note=document.createElement('p');note.className='small muted';
                note.textContent='This question was already completed correctly. You may explore the other explanations without losing credit.';
                box.append(note);
            }
            const controls=document.createElement("div");controls.className="flex flex-wrap gap-2 mt-4";
            if(idx>0){
                const prev=document.createElement("button");prev.type="button";prev.className="btn secondary";
                prev.textContent="← Previous question";prev.onclick=()=>{state.quizIndex[p]=idx-1;renderQuestion(p);refresh()};controls.append(prev);
            }
            if(idx<questions[p].length-1){
                const next=document.createElement("button");next.type="button";next.className="btn primary";
                next.textContent="Next question →";next.disabled=!solved;
                next.onclick=()=>{state.quizIndex[p]=idx+1;renderQuestion(p);refresh()};controls.append(next);
            }
            box.append(controls);
        }
        function renderNotes(){
            notes.forEach(([text,correct,explanation],i)=>{
                const row=document.createElement("div");row.className="note-row";
                const label=document.createElement("label");label.className="font-semibold block";label.htmlFor="note-"+i;label.textContent=(i+1)+". "+text;
                const select=document.createElement("select");select.id="note-"+i;select.className="field";
                [["","Choose category"],["0","A · Problem / barriers"],["1","B · Proposed approach"],["2","C · Group agreement"],["3","D · Unresolved issue"]].forEach(([value,name])=>{
                    const option=document.createElement("option");option.value=value;option.textContent=name;select.append(option);
                });
                const feedback=document.createElement("p");feedback.className="small";feedback.setAttribute("role","status");
                select.addEventListener("change",()=>{
                    if(select.value==="")return;
                    const good=Number(select.value)===correct;
                    feedback.textContent=(good?"✓ Correct. ":"Try again. ")+explanation;
                    if(good){state.notes[i]=true;select.disabled=true}
                    refresh();
                });
                if(state.notes[i]){select.value=String(correct);select.disabled=true;feedback.textContent='✓ Correct. '+explanation;}
                row.append(label,select,feedback);$("note-list").append(row);
            });
        }
        function renderChecks(p){
            const wrap=$("checklist-"+p),title=document.createElement("h3");
            title.textContent="Self-assessment";title.className="mt-6";wrap.append(title);
            checkLabels[p].forEach((text,i)=>{
                const label=document.createElement("label");label.className="check";
                const input=document.createElement("input");input.type="checkbox";
                input.checked=!!state.checks[p]?.has(i);
                input.addEventListener("change",()=>{
                    const set=state.checks[p]??=new Set();
                    input.checked?set.add(i):set.delete(i);
                    refresh();
                });
                label.append(input,document.createTextNode(text));wrap.append(label);
            });
        }
        async function copyText(text,status,fallback){
            if(!text.trim()){status.textContent="Write a response before copying.";return}
            try{
                if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
                await navigator.clipboard.writeText(text);
                status.textContent="Copied to clipboard.";
            }catch{
                fallback();
                status.textContent="Clipboard unavailable. The text is selected; use your device's Copy command.";
            }
        }
        function referenceText(){
            return "FINAL STAGE QUICK REFERENCE\n\n"+Array.from($("ref-content").children).map(el=>el.innerText.trim()).join("\n\n");
        }

        document.querySelectorAll(".flip").forEach(button=>button.addEventListener("click",()=>{
            const p=Number(button.dataset.page),i=Number(button.dataset.flip);
            button.classList.toggle("flipped");
            button.setAttribute("aria-pressed",String(button.classList.contains("flipped")));
            (state.flips[p]??=new Set()).add(i);
            button.querySelector(".visited").textContent="✓ Explored";
            refresh();
        }));
        document.querySelectorAll(".panel").forEach(panel=>panel.addEventListener("toggle",()=>{
            if(panel.open){
                const siblings=Array.from(document.querySelectorAll(`.panel[data-page="${panel.dataset.page}"]`));
                (state.panels[panel.dataset.page]??=new Set()).add(siblings.indexOf(panel));
                panel.classList.add("visited");refresh();
            }
        }));
        restore();
        Object.keys(questions).forEach(p=>renderQuestion(Number(p)));
        renderNotes();renderChecks(2);renderChecks(7);

        $("complete-reference").onclick=()=>lesson.go(9);
        $("review-sections").onclick=()=>lesson.go(0);
        $("assemble").onclick=()=>{
            const fields=["build-1","build-2","build-3"].map(id=>$(id).value.trim());
            if(fields.some(value=>!value)){$("builder-status").textContent="Complete all three fields before assembling.";return}
            $("assembled").value=`Building on ${fields[0].replace(/[.!?]+$/,"")}, ${fields[1].charAt(0).toLowerCase()+fields[1].slice(1).replace(/[.!?]+$/,"")}. Therefore, ${fields[2].charAt(0).toLowerCase()+fields[2].slice(1)}`;
            state.assembled=true;
            $("assembled-area").classList.remove("hidden");
            $("builder-status").textContent="Assembled. You can edit the paragraph below.";
            refresh();
        };
        $("edit-builder").onclick=()=>{$("build-1").focus();$("builder-status").textContent="Edit your fields, then assemble again when ready."};
        $("copy-builder").onclick=()=>copyText($("assembled").value,$("builder-status"),()=>{$("assembled").focus();$("assembled").select()});
        $("model-builder-button").onclick=()=>{
            state.builderModel=true;
            $("builder-model").classList.remove("hidden");
            $("checklist-2").classList.remove("hidden");
            refresh();
        };
        ["build-1","build-2","build-3","closing-text"].forEach(id=>$(id).addEventListener("input",refresh));
        $("show-closing").onclick=()=>{
            state.closingModel=true;
            $("closing-model").classList.remove("hidden");
            $("checklist-7").classList.remove("hidden");
            refresh();
        };
        $("edit-closing").onclick=()=>$("closing-text").focus();
        $("copy-closing").onclick=()=>copyText($("closing-text").value,$("closing-status"),()=>{$("closing-text").focus();$("closing-text").select()});

        const goalTexts=["I will credit and connect multiple viewpoints.","I will help the group reach genuine consensus.","I will check the final recommendation against the task."];
        goalTexts.forEach((text,i)=>{
            const label=document.createElement("label");label.className="check";
            const input=document.createElement("input");input.type="checkbox";
            input.checked=state.goals.has(i);
            input.onchange=()=>{
                input.checked?state.goals.add(i):state.goals.delete(i);
                persist();
                $("selected-goals").textContent=state.goals.size?"My practice goals: "+[...state.goals].sort().map(n=>goalTexts[n]).join(" "):"Select a goal above to make your practice plan.";
            };
            label.append(input,document.createTextNode(text));$("goals").append(label);
        });
        $("ref-print").onclick=()=>window.print();
        lesson.init();
        refresh();
})();
