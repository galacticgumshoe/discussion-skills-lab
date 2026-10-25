
    const lesson = DSL.createLesson({id:'opening-stage',total:7,reference:7,
      labels:['01 · Contributions','02 · Opening sequence','03 · Analyze the task','04 · Clarifications','05 · Give direction','06 · Research & transition','✓ · Knowledge check','↗ · Quick reference'],
      requirements:[
        'Classify all five contributions correctly to continue.',
        'Explore all six stages, then answer the sequence checkpoint correctly.',
        'Explore the five task categories and answer the WHAT/HOW question correctly.',
        'Answer the clarification decision correctly.',
        'Write a consensus question and complete the self-assessment.',
        'Answer the research and transition decision correctly.',
        'Answer all five knowledge-check questions correctly.'
      ]
    });
    lesson.init();
    const saved=lesson.data();
    function record(name,value){lesson.record(name,value);}
    const classification = [
        {text:"“Could we agree on what the task is asking us to accomplish?”",answer:"procedural",why:"This clarifies the task so the group shares a starting point."},
        {text:"“A recent study found that students receiving counseling had improved attendance.”",answer:"substantive",why:"This introduces evidence relevant to the issue."},
        {text:"“We have about 15 minutes remaining, so we should begin narrowing our recommendations.”",answer:"procedural",why:"This manages time and focuses the group."},
        {text:"“I think we can combine those two proposals into one stronger recommendation.”",answer:"substantive",why:"This synthesizes ideas into a potential solution."},
        {text:"“Our discussion seems to be moving away from the problem described in the task.”",answer:"procedural",why:"This redirects the group toward its assigned task."}
    ];
    let classificationIndex = 0;
    const classificationSeen = new Set(saved.classificationSeen||[]);
    let classificationAnswers = Array.isArray(saved.classificationAnswers)&&saved.classificationAnswers.length===classification.length?saved.classificationAnswers:Array(classification.length).fill(null);
    function renderClassification() {
        const item = classification[classificationIndex];
        document.getElementById("classify-counter").textContent = `STATEMENT ${classificationIndex + 1} OF ${classification.length}`;
        document.getElementById("classify-statement").textContent = item.text;
        const saved = classificationAnswers[classificationIndex];
        document.querySelectorAll(".classify-answer").forEach(button => {
            button.disabled = false;
            button.classList.toggle("selected", saved === button.dataset.answer);
        });
        const feedback = document.getElementById("classify-feedback");
        feedback.hidden = saved === null;
        if (saved !== null) {
            const correct = saved === item.answer;
            feedback.classList.toggle("error", !correct);
            feedback.textContent = `${correct ? "Correct." : `Not quite. This is ${item.answer}.`} ${item.why}`;
        }
        const next = document.getElementById("classify-next");
        next.hidden = saved === null;
        next.textContent = classificationIndex === classification.length - 1 ? "Review from the start ↻" : "Next statement →";
    }
    document.querySelectorAll(".classify-answer").forEach(button => button.addEventListener("click", () => {
        classificationAnswers[classificationIndex] = button.dataset.answer;
        classificationSeen.add(classificationIndex);
        record("classificationAnswers",classificationAnswers);record("classificationSeen",[...classificationSeen]);
        if(classificationSeen.size===classification.length && classificationAnswers.every((answer,i)=>answer===classification[i].answer))lesson.complete(0);
        renderClassification();
    }));
    document.getElementById("classify-next").addEventListener("click", () => {
        classificationIndex = (classificationIndex + 1) % classification.length;
        renderClassification();
    });
    renderClassification();

    const timelineSeen=new Set(saved.timelineSeen||[]);
    document.querySelectorAll(".timeline-toggle").forEach(button => button.addEventListener("click", () => {
        timelineSeen.add(button.getAttribute("aria-controls"));record("timelineSeen",[...timelineSeen]);if(timelineSeen.size===6 && saved.sequenceCorrect)lesson.complete(1);
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.querySelector("span").textContent = expanded ? "＋" : "−";
        document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
    }));

    const analysisAnswers = {
        who:"Members of the American School Counselor Association, developing a plan counselors could implement.",
        what:"The negative effects of mental health stigma on K-12 students.",
        how:"Examine the effects of stigma and craft a plan for counselors to implement.",
        where:"National convention setting; solutions implemented in K-12 schools.",
        terms:"American School Counselor Association; mental health stigma; K-12 students; effects of stigmatization."
    };
    const analysisTabs = [...document.querySelectorAll(".analysis-tab")];
    const analysisSeen=new Set(saved.analysisSeen||[]);
    function selectAnalysis(kind) {
        analysisSeen.add(kind);record("analysisSeen",[...analysisSeen]);if(analysisSeen.size===5 && saved["what-how-options"]===0)lesson.complete(2);
        analysisTabs.forEach(tab => {
            tab.setAttribute("aria-selected", String(tab.dataset.kind === kind));
            tab.tabIndex = tab.dataset.kind === kind ? 0 : -1;
        });
        document.querySelectorAll(".task-mark").forEach(mark => mark.classList.toggle("on", mark.dataset.kind === kind || kind === "terms" && ["who","what"].includes(mark.dataset.kind)));
        document.getElementById("analysis-result").textContent = `${kind === "terms" ? "SEARCH TERMS" : kind.toUpperCase()}: ${analysisAnswers[kind]}`;
        document.getElementById("terms-note").hidden = kind !== "terms";
    }
    analysisTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => selectAnalysis(tab.dataset.kind));
        tab.addEventListener("keydown", event => {
            if (!["ArrowRight","ArrowLeft","Home","End"].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === "Home" ? 0 : event.key === "End" ? analysisTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + analysisTabs.length) % analysisTabs.length;
            selectAnalysis(analysisTabs[next].dataset.kind);
            analysisTabs[next].focus();
        });
    });

    const practice = {
        whatHow: {
            container:"what-how-options", feedback:"what-how-feedback",
            options:["The negative effects of mental health stigma on K-12 students.","Craft a plan counselors can implement in their schools."],
            correct:0, explanation:"WHAT names the central problem. Crafting a plan is HOW: the action and deliverable."
        },
        clarification: {
            container:"clarification-options", feedback:"clarification-feedback",
            options:["A. Begin brainstorming programs immediately.","B. Clarify the problem and the task's required deliverable.","C. Vote on who should lead the discussion."],
            correct:1, explanation:"The group should agree on what the task requires before deciding how to organize its time."
        },
        research: {
            container:"research-options", feedback:"research-feedback",
            options:["A. Restart all clarifications.","B. Ignore the student's concern without discussion.","C. Ask whether a specific misunderstanding needs resolving, then share relevant research."],
            correct:2, explanation:"Check for a specific new misunderstanding; if there is none, move into useful background and evidence."
        }
    };
    Object.values(practice).forEach(item => {
        const holder = document.getElementById(item.container);
        item.options.forEach((text, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choice";
            button.textContent = text;
            button.addEventListener("click", () => {
                holder.querySelectorAll("button").forEach((option, i) => {
                    option.classList.toggle("correct", i === index && index === item.correct);
                    option.classList.toggle("incorrect", i === index && index !== item.correct);
                    option.classList.toggle("selected-answer", i === index);
                    option.classList.toggle("selected-correct", i === index && index === item.correct);
                    option.classList.toggle("selected-incorrect", i === index && index !== item.correct);
                    option.setAttribute("aria-pressed", String(i === index));
                });
                record(item.container,index);saved[item.container]=index;
                if(index===item.correct){if(item.container==="what-how-options" && analysisSeen.size===5)lesson.complete(2);if(item.container==="clarification-options")lesson.complete(3);if(item.container==="research-options")lesson.complete(5);}
                const feedback = document.getElementById(item.feedback);
                feedback.hidden = false;
                feedback.className = `feedback${index === item.correct ? "" : " error"}`;
                feedback.textContent = `${index === item.correct ? "Correct." : "Not quite."} ${item.explanation}`;
            });
            holder.appendChild(button);
        });
    });

    Object.values(practice).forEach(item=>{const i=saved[item.container];if(Number.isInteger(i))document.getElementById(item.container).querySelectorAll('button')[i]?.click();});
    document.querySelectorAll('.sequence-choices button').forEach(b=>b.addEventListener('click',()=>{
      const right=b.dataset.correct==='true';
      const feedback=document.getElementById('sequence-feedback');feedback.hidden=false;
      feedback.className='feedback'+(right?'':' error');
      feedback.textContent=right?'Correct. Clarify the task before setting direction.':'Not quite. The group needs shared understanding before setting direction.';
      if(right){record('sequenceCorrect',true);saved.sequenceCorrect=true;if(timelineSeen.size===6)lesson.complete(1);}
    }));
    if(saved.sequenceCorrect && timelineSeen.size===6)lesson.complete(1);
    if(saved['what-how-options']===0 && analysisSeen.size===5)lesson.complete(2);
        document.getElementById("question-builder").addEventListener("submit", event => {
        event.preventDefault();
        const problem = document.getElementById("problem-input").value.trim().replace(/[.?!]+$/,"");
        const accomplishment = document.getElementById("accomplishment-input").value.trim().replace(/[.?!]+$/,"");
        if (!problem || !accomplishment) return;
        document.getElementById("draft-input").value = `By the end of this discussion, will the group agree that we have ${accomplishment} to address ${problem}?`;
        document.getElementById("draft-input").dispatchEvent(new Event("input"));
        document.getElementById("draft-input").focus();
    });
    ['problem-input','accomplishment-input','draft-input'].forEach(id=>{
      const el=document.getElementById(id);el.value=saved[id]||'';
      el.addEventListener('input',()=>{record(id,el.value);checkQuestion();});
    });
    const selfcheck=document.getElementById('question-selfcheck');
    selfcheck.checked=!!saved.questionSelfcheck;
    selfcheck.addEventListener('change',()=>{record('questionSelfcheck',selfcheck.checked);checkQuestion();});
    function checkQuestion(){if(selfcheck.checked && document.getElementById('draft-input').value.trim().length>=35)lesson.complete(4);}
    checkQuestion();
        document.getElementById("show-model").addEventListener("click", event => {
        const model = document.getElementById("model-answer");
        model.hidden = !model.hidden;
        event.currentTarget.setAttribute("aria-expanded", String(!model.hidden));
        event.currentTarget.textContent = model.hidden ? "Show model example" : "Hide model example";
    });
    async function copyText(text, status) {
        if (!text.trim()) { status.textContent = "There is nothing to copy yet."; return; }
        try {
            await navigator.clipboard.writeText(text);
            status.textContent = "Copied to clipboard.";
        } catch {
            status.textContent = "Copy is unavailable here. Select the text and copy it manually.";
        }
    }
    document.getElementById("copy-question").addEventListener("click", () => copyText(document.getElementById("draft-input").value, document.getElementById("copy-question-status")));

    const quiz = [
        {prompt:"Which contribution is substantive?", options:["Asking the group to clarify the task","Introducing research about an issue's effects","Suggesting a time limit"],correct:1,explanation:"Research introduces evidence and develops the discussion's content."},
        {prompt:"Which opening sequence is in the right order?",options:["Read → Analyze → Clarify → Establish direction → Research","Read → Set agenda → Clarify → Research","Research → Establish direction → Read → Clarify"],correct:0,explanation:"Understand and clarify the task before setting direction; research follows."},
        {prompt:"In task analysis, what is the difference between WHAT and HOW?",options:["WHAT is a source; HOW is a citation.","WHAT is the central problem; HOW is the required action or deliverable.","WHAT is the setting; HOW is the assigned role."],correct:1,explanation:"WHAT names the problem. HOW names what the group needs to do about it."},
        {prompt:"What is the purpose of clarifications?",options:["To debate solutions before reading","To choose a permanent leader","To agree on the role, problem, required actions, and deliverable"],correct:2,explanation:"Clarification builds shared understanding before the group debates solutions."},
        {prompt:"How do an agenda and a consensus question differ?",options:["An agenda is a roadmap; a consensus question defines the destination.","An agenda states the problem; a consensus question sets speaking order.","They are identical and both require fixed time limits."],correct:0,explanation:"An agenda organizes stages; a consensus question identifies what the group should accomplish."}
    ];
    const quizAnswers = Array.isArray(saved.quizAnswers)&&saved.quizAnswers.length===quiz.length?saved.quizAnswers:Array(quiz.length).fill(null);
    const quizEarned = new Set(Array.isArray(saved.quizEarned) ? saved.quizEarned : quizAnswers.map((a,i)=>a===quiz[i].correct?i:-1).filter(i=>i>=0));
    const quizList = document.getElementById("quiz-list");
    quiz.forEach((question, index) => {
        const article = document.createElement("article");
        article.className = "card question-card";
        const heading = document.createElement("h3");
        heading.className = "font-bold mb-3";
        heading.textContent = `${index + 1}. ${question.prompt}`;
        article.appendChild(heading);
        const optionBox = document.createElement("div");
        question.options.forEach((option, optionIndex) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choice";
            button.textContent = option;
            button.addEventListener("click", () => {
                quizAnswers[index] = optionIndex;
                if(optionIndex===question.correct)quizEarned.add(index);
                record("quizAnswers",quizAnswers);
                record("quizEarned",[...quizEarned]);
                updateQuiz();
            });
            optionBox.appendChild(button);
        });
        article.appendChild(optionBox);
        const feedback = document.createElement("p");
        feedback.className = "feedback";
        feedback.hidden = true;
        feedback.setAttribute("role","status");
        article.appendChild(feedback);
        quizList.appendChild(article);
    });
    function updateQuiz() {
        [...quizList.children].forEach((article, index) => {
            const answer = quizAnswers[index];
            const buttons = article.querySelectorAll("button");
            buttons.forEach((button, i) => {
                button.disabled = false;
                button.classList.toggle("correct", answer !== null && i === answer && i === quiz[index].correct);
                button.classList.toggle("incorrect", answer !== null && i === answer && i !== quiz[index].correct);
                button.classList.toggle("selected-answer",answer === i);
                button.classList.toggle("selected-correct",answer === i && i === quiz[index].correct);
                button.classList.toggle("selected-incorrect",answer === i && i !== quiz[index].correct);
                button.setAttribute("aria-pressed",String(answer === i));
            });
            const feedback = article.querySelector("[role=status]");
            feedback.hidden = answer === null;
            if (answer !== null) {
                const right = answer === quiz[index].correct;
                feedback.className = `feedback${right ? "" : " error"}`;
                feedback.textContent = `${right ? "Correct." : "Not quite."} ${quiz[index].explanation}`;
            }
        });
        const done = quizAnswers.every(answer => answer !== null);
        const summary = document.getElementById("quiz-summary");
        summary.hidden = !done;
        if (done) {
            if(quizEarned.size===quiz.length)lesson.complete(6);
            const score = quizEarned.size;
            document.getElementById("quiz-score").textContent = `Knowledge check: ${score} of ${quiz.length} correct.`;
            document.getElementById("retry-hint").textContent = score === quiz.length ? "Excellent work. You can still explore other answers without losing completion credit." : `Review the feedback and select the correct option for ${quiz.length - score} remaining ${quiz.length - score === 1 ? "question" : "questions"}.`;
            document.getElementById("retry-missed").hidden = score === quiz.length;
        }
    }
    document.getElementById("retry-missed").addEventListener("click", () => {
        const firstMissed = quizAnswers.findIndex((answer, index) => !quizEarned.has(index));
        if(firstMissed<0)return;
        quizAnswers[firstMissed]=null;
        record("quizAnswers",quizAnswers);
        updateQuiz();
        quizList.children[firstMissed]?.scrollIntoView({block:"center",behavior:"smooth"});
        quizList.children[firstMissed]?.querySelector("button")?.focus({preventScroll:true});
    });
    updateQuiz();
    lesson.go(0);
