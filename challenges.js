const challenges = [
  {id:"sales-insights",title:"Sales Performance Snapshot",track:"data",difficulty:"Beginner",description:"Explore a small sales dataset to understand how revenue changes across products, regions and months.",outcome:"A concise sales summary with three useful findings and supporting charts.",objective:"Turn raw sales records into a clear picture of business performance. Look for the products and regions contributing most to revenue, then identify any monthly patterns worth investigating.",skills:["Sorting, filtering and basic spreadsheet formulas","Cleaning inconsistent values and checking for missing data","Choosing clear charts and explaining what they show"],tools:["Microsoft Excel or Google Sheets","A supplied CSV sales dataset"],deliverables:["A cleaned copy of the dataset","A summary table showing revenue by product and month","Two or three charts with short written insights"],time:"2–3 hours"},
  {id:"customer-segments",title:"Customer Segmentation",track:"data",difficulty:"Intermediate",description:"Group customers using simple purchase and demographic fields, then compare the behaviour of each group.",outcome:"A customer-segment summary that describes each group and suggests one action for the business.",objective:"Use available customer information to identify meaningful groups. Compare purchase frequency or total spend and explain how the groups differ without making unsupported assumptions.",skills:["Data cleaning and consistent categories","Pivot Tables, COUNTIF and SUMIF","Interpreting patterns and communicating limitations"],tools:["Microsoft Excel or Google Sheets","A small customer dataset"],deliverables:["A segmentation table with clearly defined groups","A comparison chart","A short recommendation for each segment"],time:"3–4 hours"},
  {id:"expense-dashboard",title:"Monthly Expense Dashboard",track:"data",difficulty:"Beginner",description:"Review a fictional organisation’s expenses and build a dashboard that makes spending patterns easy to understand.",outcome:"A one-page dashboard showing total spend, category breakdown and the largest expense areas.",objective:"Organise transaction records into useful categories and create a visual summary that could help a small team review its monthly spending.",skills:["Date and currency formatting","SUM, SUMIF and Pivot Tables","Basic data visualisation and dashboard layout"],tools:["Microsoft Excel or Google Sheets","A sample expense CSV"],deliverables:["A categorised expense table","A dashboard with at least three visual summaries","A brief note highlighting unusual or high-cost categories"],time:"2–3 hours"},
  {id:"responsive-landing",title:"Responsive Programme Landing Page",track:"web",difficulty:"Beginner",description:"Build a landing page for a fictional learning programme using semantic HTML and responsive CSS.",outcome:"A polished landing page that remains readable and usable on mobile, tablet and desktop.",objective:"Translate a simple content brief into a structured page. Prioritise clear hierarchy, accessible markup and a layout that adapts to different screen widths.",skills:["Semantic HTML5 structure","CSS layout with Flexbox or Grid","Responsive breakpoints and accessible link states"],tools:["HTML","CSS","Browser developer tools"],deliverables:["A complete landing page","Responsive layouts for three screen sizes","A short README explaining how to view the page"],time:"3–4 hours"},
  {id:"interactive-form",title:"Interactive Contact Form",track:"web",difficulty:"Intermediate",description:"Create a contact form that validates user input and gives clear feedback without refreshing the page.",outcome:"A usable form with inline validation, accessible feedback and a clear success state.",objective:"Build a form experience that helps users correct mistakes before submitting. Validate required fields and common email formatting, and prevent accidental empty submissions.",skills:["HTML form controls and labels","JavaScript event listeners and conditional logic","DOM updates and basic input validation"],tools:["HTML","CSS","Vanilla JavaScript"],deliverables:["A responsive contact form","Inline error and success messages","Keyboard-friendly focus and validation behaviour"],time:"3–4 hours"},
  {id:"task-tracker",title:"Personal Task Tracker",track:"web",difficulty:"Intermediate",description:"Build a small task tracker where users can add tasks, mark them complete and remove items.",outcome:"A responsive task tracker with working controls and tasks retained during the browser session.",objective:"Use JavaScript to manage a small collection of tasks and keep the interface in sync with the underlying data. Include sensible empty states and clear completion feedback.",skills:["Arrays, objects and functions","Event delegation and DOM rendering","Browser localStorage for persistence"],tools:["HTML","CSS","Vanilla JavaScript"],deliverables:["A task list with add, complete and delete actions","A filter for all, active and completed tasks","A short explanation of how task state is stored"],time:"4–5 hours"}
];

const state = {track:"all",difficulty:"all"};
const grid = document.querySelector("#challenge-grid");
const count = document.querySelector("#results-count");
const empty = document.querySelector("#no-results");
const dialog = document.querySelector("#challenge-dialog");
const dialogContent = document.querySelector("#dialog-content");

function createElement(tag,className,text){
  const element=document.createElement(tag);
  if(className) element.className=className;
  if(text!==undefined) element.textContent=text;
  return element;
}

function renderChallenges(){
  const visible=challenges.filter(challenge=>(state.track==="all"||challenge.track===state.track)&&(state.difficulty==="all"||challenge.difficulty===state.difficulty));
  grid.replaceChildren();
  visible.forEach(challenge=>{
    const card=createElement("article","challenge-card");
    const top=createElement("div","challenge-card-top");
    const track=createElement("span","track-tag"+(challenge.track==="web"?" web-tag":""),challenge.track==="data"?"Data Analytics":"Web Development");
    const difficulty=createElement("span","difficulty-tag "+challenge.difficulty.toLowerCase(),challenge.difficulty);
    top.append(track,difficulty);
    const title=createElement("h3","",challenge.title);
    const description=createElement("p","",challenge.description);
    const outcome=createElement("div","challenge-outcome");
    outcome.append(createElement("span","","EXPECTED OUTCOME"),createElement("p","",challenge.outcome));
    const footer=createElement("div","challenge-card-footer");
    footer.append(createElement("span","challenge-time","Estimated time · "+challenge.time));
    const button=createElement("button","view-challenge","View challenge ↗");
    button.type="button";
    button.addEventListener("click",()=>openChallenge(challenge.id));
    footer.append(button);
    card.append(top,title,description,outcome,footer);
    grid.append(card);
  });
  count.textContent="Showing "+visible.length+" "+(visible.length===1?"challenge":"challenges");
  empty.hidden=visible.length!==0;
}

function addDetailSection(parent,heading,items){
  parent.append(createElement("h3","",heading));
  const list=createElement("ul");
  items.forEach(item=>list.append(createElement("li","",item)));
  parent.append(list);
}

function openChallenge(id){
  const challenge=challenges.find(item=>item.id===id);
  if(!challenge) return;
  dialogContent.replaceChildren();
  dialogContent.append(createElement("span","selected-label",challenge.track==="data"?"DATA ANALYTICS TRACK":"WEB DEVELOPMENT TRACK"));
  dialogContent.append(createElement("h2","",challenge.title));
  const meta=createElement("div","dialog-meta");
  meta.append(createElement("span","track-tag"+(challenge.track==="web"?" web-tag":""),challenge.track==="data"?"Data Analytics":"Web Development"));
  meta.append(createElement("span","difficulty-tag "+challenge.difficulty.toLowerCase(),challenge.difficulty));
  meta.append(createElement("span","difficulty-tag","Estimated "+challenge.time));
  dialogContent.append(meta);
  dialogContent.append(createElement("h3","","Objective"));
  dialogContent.append(createElement("p","",challenge.objective));
  addDetailSection(dialogContent,"Skills to practise",challenge.skills);
  addDetailSection(dialogContent,"Suggested tools",challenge.tools);
  addDetailSection(dialogContent,"What to produce",challenge.deliverables);
  const result=createElement("div","dialog-deliverable");
  result.append(createElement("strong","","EXPECTED RESULT"),createElement("p","",challenge.outcome));
  dialogContent.append(result);
  dialog.showModal();
}

document.querySelectorAll(".filter-button").forEach(button=>{
  button.addEventListener("click",()=>{
    const filter=button.dataset.filter;
    state[filter]=button.dataset.value;
    document.querySelectorAll('.filter-button[data-filter="'+filter+'"]').forEach(option=>{
      const active=option===button;
      option.classList.toggle("is-active",active);
      option.setAttribute("aria-pressed",String(active));
    });
    renderChallenges();
  });
});

document.querySelector("#reset-filters").addEventListener("click",()=>{
  state.track="all";
  state.difficulty="all";
  document.querySelectorAll(".filter-button").forEach(button=>{
    const active=button.dataset.value==="all";
    button.classList.toggle("is-active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  renderChallenges();
});

document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{
  if(event.target===dialog) dialog.close();
});

const menuToggle=document.querySelector(".menu-toggle");
const mainNavigation=document.querySelector(".main-nav");
if(menuToggle&&mainNavigation){
  menuToggle.addEventListener("click",()=>{
    const expanded=menuToggle.getAttribute("aria-expanded")==="true";
    menuToggle.setAttribute("aria-expanded",String(!expanded));
    mainNavigation.classList.toggle("is-open",!expanded);
  });
  mainNavigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    mainNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded","false");
  }));
}

renderChallenges();
