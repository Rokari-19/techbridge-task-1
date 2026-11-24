const internshipTasks = [
  {number:1,title:"Build the TechBridge Homepage",description:"Create the first version of the TechBridge website using semantic HTML and CSS.",day:1,status:"completed",details:"Build the public-facing homepage that introduces TechBridge, explains its purpose and gives visitors a clear route to explore the programmes.",deliverables:["Semantic HTML page structure","Responsive CSS layout","Clear navigation and calls to action"],skills:["HTML5 structure","CSS fundamentals","Responsive layout"],time:"Days 1–3"},
  {number:2,title:"Build the TechBridge Programs Experience",description:"Create a Programs experience presenting TechBridge's available learning programmes.",day:4,status:"completed",details:"Present the available learning tracks in a clear, consistent interface so prospective interns can understand the programme options.",deliverables:["Program overview section","Track descriptions and calls to action","Consistent visual components"],skills:["HTML and CSS","Content hierarchy","Reusable page sections"],time:"Days 4–7"},
  {number:3,title:"Build the Internship Tasks Experience",description:"Create an interface that presents all eight internship tasks and explains the learning journey.",day:8,status:"completed",details:"Build a structured experience for the internship tasks, including task descriptions, timing and the information interns need to understand the programme.",deliverables:["Eight task entries","Task descriptions and timing","Responsive task presentation"],skills:["HTML5","CSS Grid and Flexbox","Information architecture"],time:"Days 8–10"},
  {number:4,title:"Build an Interactive Internship Roadmap",description:"Use JavaScript to let visitors explore the Data Analytics and Web Development tracks.",day:11,status:"completed",details:"Turn the static roadmap into an interactive experience. Visitors can switch between tracks and see each track's eight milestones without reloading the page.",deliverables:["Two selectable internship tracks","Dynamic task and milestone rendering","Keyboard-accessible track selection"],skills:["JavaScript arrays and objects","DOM manipulation","Event listeners"],time:"Days 11–14"},
  {number:5,title:"Build the TechBridge Challenge Hub",description:"Create a searchable challenge library with track and difficulty filters and detailed challenge briefs.",day:15,status:"completed",details:"Build a Challenge Hub containing practical Data Analytics and Web Development briefs. Users can filter challenges and open detailed briefs in a dialog.",deliverables:["At least six challenge cards","Working track and difficulty filters","Challenge details dialog"],skills:["JavaScript filtering","Dynamic DOM rendering","Dialog interactions"],time:"Days 15–18"},
  {number:6,title:"Build the TechBridge Intern Dashboard",description:"Create an interactive workspace for interns to track all eight tasks, monitor progress and explore modern web technologies.",day:19,status:"in-progress",details:"Bring the internship experience together in one dashboard. Display task statuses and completion metrics, let interns update their progress, and introduce modern frontend and backend technologies.",deliverables:["Progress summary and visual progress bar","Eight interactive task cards and status filters","Task details view and Challenge Hub link","Interactive technology explorer"],skills:["JavaScript data structures","DOM updates and event handling","Filtering and progress calculations","Responsive UI design"],time:"Days 19–23"},
  {number:7,title:"Build the Task Submission Experience",description:"Create an interface through which interns can prepare and submit their task work.",day:24,status:"not-started",details:"Design a clear submission flow where interns can review task requirements, provide links or files and see the status of their submissions.",deliverables:["Task submission form","Submission status states","Clear validation and feedback"],skills:["HTML forms","JavaScript validation","UX writing"],time:"Days 24–26"},
  {number:8,title:"Build the Complete TechBridge Internship Platform",description:"Combine the different components into a cohesive, responsive internship platform.",day:27,status:"not-started",details:"Bring the homepage, programme information, roadmap, Challenge Hub, dashboard and submission experience together into a consistent platform.",deliverables:["Connected website pages","Consistent navigation and visual language","Responsive and tested user journeys"],skills:["Frontend integration","Accessibility checks","Responsive testing"],time:"Days 27–30"}
];

const storageKey = "techbridge-dashboard-task-status-v1";
const validStatuses = ["completed","in-progress","not-started"];
const state = {filter:"all",search:""};
const taskList = document.querySelector("#dashboard-task-list");
const emptyTasks = document.querySelector("#empty-tasks");
const dialog = document.querySelector("#task-dialog");
const dialogContent = document.querySelector("#task-dialog-content");

function loadStatuses(){
  try{
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    internshipTasks.forEach(task=>{
      if(validStatuses.includes(saved[task.number])) task.status = saved[task.number];
    });
  }catch(error){
    console.warn("Saved dashboard progress could not be read.",error);
  }
}

function saveStatuses(){
  const saved = {};
  internshipTasks.forEach(task=>{saved[task.number]=task.status;});
  try{localStorage.setItem(storageKey,JSON.stringify(saved));}
  catch(error){console.warn("Dashboard progress could not be saved in this browser.",error);}
}

function statusLabel(status){
  return status==="in-progress"?"In Progress":status==="not-started"?"Not Started":"Completed";
}

function makeElement(tag,className,text){
  const element=document.createElement(tag);
  if(className) element.className=className;
  if(text!==undefined) element.textContent=text;
  return element;
}

function renderProgress(){
  const completed=internshipTasks.filter(task=>task.status==="completed").length;
  const remaining=internshipTasks.length-completed;
  const percentage=(completed/internshipTasks.length)*100;
  document.querySelector("#progress-percent").textContent=(Number.isInteger(percentage)?percentage:percentage.toFixed(1))+"%";
  document.querySelector("#progress-fraction").textContent=completed+" of "+internshipTasks.length+" tasks completed";
  document.querySelector("#progress-next").textContent=remaining+" "+(remaining===1?"task":"tasks")+" remaining";
  document.querySelector("#completed-count").textContent=completed;
  document.querySelector("#remaining-count").textContent=remaining;
  document.querySelector("#total-count").textContent=internshipTasks.length;
  const progressTrack=document.querySelector("#progress-track");
  progressTrack.setAttribute("aria-valuenow",String(completed));
  progressTrack.setAttribute("aria-valuetext",completed+" of "+internshipTasks.length+" tasks completed");
  document.querySelector("#progress-fill").style.width=percentage+"%";
  document.querySelector("#filter-all-count").textContent=internshipTasks.length;
  document.querySelector("#filter-completed-count").textContent=completed;
  document.querySelector("#filter-progress-count").textContent=internshipTasks.filter(task=>task.status==="in-progress").length;
  document.querySelector("#filter-not-started-count").textContent=internshipTasks.filter(task=>task.status==="not-started").length;
}

function createTaskCard(task){
  const card=makeElement("article","dashboard-task-card status-"+task.status);
  const head=makeElement("div","task-card-head");
  head.append(makeElement("span","task-card-number","TASK "+String(task.number).padStart(2,"0")));
  head.append(makeElement("span","task-status "+task.status,statusLabel(task.status)));
  const title=makeElement("h3","",task.title);
  const description=makeElement("p","",task.description);
  const footer=makeElement("div","task-card-footer");
  footer.append(makeElement("span","task-day","DAY "+String(task.day).padStart(2,"0")));
  const actions=makeElement("div","task-card-actions");
  const view=makeElement("button","task-view-button","View task ↗");
  view.type="button";
  view.addEventListener("click",()=>openTaskDetails(task.number));
  const complete=makeElement("button","task-complete-button"+(task.status==="completed"?" undo":""),task.status==="completed"?"Mark incomplete":task.status==="in-progress"?"Mark as completed":"Start task");
  complete.type="button";
  complete.addEventListener("click",()=>toggleTaskCompletion(task.number));
  actions.append(view,complete);
  footer.append(actions);
  card.append(head,title,description,footer);
  return card;
}

function renderTasks(){
  const visible=internshipTasks.filter(task=>{
    const matchesFilter=state.filter==="all"||task.status===state.filter;
    const query=state.search.trim().toLowerCase();
    const matchesSearch=!query||(task.title+" "+task.description+" "+task.number).toLowerCase().includes(query);
    return matchesFilter&&matchesSearch;
  });
  taskList.replaceChildren();
  visible.forEach(task=>taskList.append(createTaskCard(task)));
  emptyTasks.hidden=visible.length!==0;
}

function render(){
  renderProgress();
  renderTasks();
}

function toggleTaskCompletion(number){
  const task=internshipTasks.find(item=>item.number===number);
  if(!task) return;
  task.status=task.status==="completed"?"in-progress":"completed";
  saveStatuses();
  render();
  if(dialog.open&&Number(dialog.dataset.taskNumber)===number) openTaskDetails(number);
}

function appendList(parent,title,items){
  parent.append(makeElement("h3","",title));
  const list=makeElement("ul");
  items.forEach(item=>list.append(makeElement("li","",item)));
  parent.append(list);
}

function openTaskDetails(number){
  const task=internshipTasks.find(item=>item.number===number);
  if(!task) return;
  dialog.dataset.taskNumber=String(number);
  dialogContent.replaceChildren();
  dialogContent.append(makeElement("span","task-card-number","TASK "+String(task.number).padStart(2,"0")));
  dialogContent.append(makeElement("h2","",task.title));
  const meta=makeElement("div","dialog-task-meta");
  meta.append(makeElement("span","","Day "+task.day));
  meta.append(makeElement("span","","Estimated timeline: "+task.time));
  meta.append(makeElement("span","","Web Development"));
  dialogContent.append(meta);
  const status=makeElement("span","dialog-status "+task.status,statusLabel(task.status));
  dialogContent.append(status);
  dialogContent.append(makeElement("h3","","Overview"));
  dialogContent.append(makeElement("p","",task.details));
  appendList(dialogContent,"Expected deliverables",task.deliverables);
  appendList(dialogContent,"Skills you'll practise",task.skills);
  const action=makeElement("button","task-complete-button"+(task.status==="completed"?" undo":""),task.status==="completed"?"Mark as incomplete":task.status==="in-progress"?"Mark as completed":"Start task");
  action.type="button";
  action.addEventListener("click",()=>toggleTaskCompletion(task.number));
  dialogContent.append(action);
  dialog.showModal();
}

document.querySelectorAll(".task-filter").forEach(button=>{
  button.addEventListener("click",()=>{
    state.filter=button.dataset.status;
    document.querySelectorAll(".task-filter").forEach(option=>{
      const active=option===button;
      option.classList.toggle("is-active",active);
      option.setAttribute("aria-pressed",String(active));
    });
    renderTasks();
  });
});

document.querySelector("#task-search").addEventListener("input",event=>{
  state.search=event.currentTarget.value;
  renderTasks();
});

document.querySelector("#task-dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog) dialog.close();});

const technologyData={
  next:{name:"Next.js",category:"REACT FRAMEWORK",description:"Next.js is a React framework for building full-stack web applications. It adds file-based routing, server rendering, static generation and server-side capabilities. Developers commonly use it for content-rich websites, dashboards, e-commerce platforms and applications where performance and search visibility matter.",tags:["React","File-based routing","Server rendering","Full-stack web"],url:"https://nextjs.org/learn",link:"Explore the official Next.js learning resources"},
  vue:{name:"Vue.js",category:"JAVASCRIPT FRAMEWORK",description:"Vue.js is a progressive JavaScript framework for building user interfaces. Its component-based approach and reactive data system make it useful for interactive single-page applications, dashboards and gradually adding richer behaviour to existing websites.",tags:["JavaScript","Components","Reactivity","Single-page apps"],url:"https://vuejs.org/guide/",link:"Explore the official Vue.js guide"},
  angular:{name:"Angular",category:"WEB APPLICATION FRAMEWORK",description:"Angular is a comprehensive, TypeScript-based framework maintained by Google. It provides tools for routing, forms, dependency injection and application structure, so it is commonly used for large, complex applications in enterprise environments and teams that need consistent conventions.",tags:["TypeScript","Components","Dependency injection","Enterprise apps"],url:"https://angular.dev/tutorials",link:"Explore the official Angular tutorials"},
  backend:{name:"Backend Development",category:"SERVER-SIDE APPLICATION DEVELOPMENT",description:"Backend development is the server-side part of an application. It handles business rules, authentication, permissions, database operations and APIs. The frontend sends requests to backend endpoints, and the backend validates the request, works with data and returns a response the interface can display.",tags:["Node.js + Express","Python + Django","Python + Flask","PHP + Laravel",".NET"],url:"https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side",link:"Learn the fundamentals of server-side development",extra:"Node.js runs JavaScript outside the browser. Express.js is a lightweight Node.js framework for APIs. Django and Flask are Python web frameworks, Laravel is a PHP framework, and .NET is Microsoft's development platform for web APIs and services."}
};

function renderTechnology(key){
  const technology=technologyData[key];
  if(!technology) return;
  document.querySelectorAll(".technology-tab").forEach(tab=>{
    const active=tab.dataset.tech===key;
    tab.classList.toggle("is-active",active);
    tab.setAttribute("aria-selected",String(active));
    tab.tabIndex=active?0:-1;
  });
  const panel=document.querySelector("#technology-content");
  panel.setAttribute("aria-labelledby","tech-tab-"+key);
  document.querySelector("#technology-category").textContent=technology.category;
  document.querySelector("#technology-number").textContent=(["next","vue","angular","backend"].indexOf(key)+1).toString().padStart(2,"0")+" / 04";
  const detail=document.querySelector("#technology-detail");
  detail.replaceChildren();
  detail.append(makeElement("h3","",technology.name));
  detail.append(makeElement("p","",technology.description));
  if(technology.extra) detail.append(makeElement("p","",technology.extra));
  const tags=makeElement("div","technology-tags");
  technology.tags.forEach(tag=>tags.append(makeElement("span","",tag)));
  detail.append(tags);
  const link=makeElement("a","technology-learn",technology.link+" ↗");
  link.href=technology.url;
  link.target="_blank";
  link.rel="noopener";
  detail.append(link);
}

document.querySelectorAll(".technology-tab").forEach((tab,index,allTabs)=>{
  tab.addEventListener("click",()=>renderTechnology(tab.dataset.tech));
  tab.addEventListener("keydown",event=>{
    let next=index;
    if(event.key==="ArrowDown"||event.key==="ArrowRight") next=(index+1)%allTabs.length;
    else if(event.key==="ArrowUp"||event.key==="ArrowLeft") next=(index-1+allTabs.length)%allTabs.length;
    else if(event.key==="Home") next=0;
    else if(event.key==="End") next=allTabs.length-1;
    else return;
    event.preventDefault();
    allTabs[next].focus();
    renderTechnology(allTabs[next].dataset.tech);
  });
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

loadStatuses();
render();
