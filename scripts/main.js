const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
const commands = [
  ["all", "Show all commands."],
  ["whoami", "Who I am and what do I do."],
  ["project -a", "View all my public projects."],
  ["social -a", "View all my social networks."],
  ["clear", "Clear the screen."]
];

const last_command = [""];
let index = 0;

app.addEventListener("keypress", async (event) => {
  if(event.key === "Enter"){
    await delay(150);
    getInputValue();
  
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    const input = document.querySelector("input");

    input.value = last_command[index];

    if (index > 0) 
      index -= 1;

    input.focus();
  }
});

app.addEventListener("click", () => {
  const input = document.querySelector("input");
  input.focus();
});

const getCommands = async (d) => {
  createText("List of commands:")
  if (d)
    await delay(500);
  
  for (const cmd of commands) {
    createCode(cmd[0], cmd[1]);
    if (d)
      await delay(400);
  }
}

const open_terminal = async () => {
  createText("Loading all necessary libraries..")
  await delay(900);
  createText("Starting local server at http://127.0.0.1:8080/");
  await delay(1200);
  createText("Validating credentials...")
  await delay(500);
  createText("Welcome back, root!")
  await delay(500);

  createText("---------------------------");
  await getCommands(true);

  await delay(150);
  new_line();
}

const new_line = () => {
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = "root";
  span1.textContent = "@root"
  span2.textContent = ":~# ";
  p.appendChild(span1)
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

const getInputValue = async () => {
  const value = document.querySelector("input").value.trim();
  last_command.push(value);
  index = last_command.length-1;
  if(value === "all"){
    commandResponse(true, value);
    getCommands(false);
  }
  else if(value === "whoami"){
    commandResponse(true, value);
    createText("Ciao! sono <span class='green'>Simone</span>, ma online mi trovi come <span class='green'>Simontech</span>.");
    createText("Ho <span class='green'>14 anni</span> e la mia passione per l’informatica e l’elettronica è iniziata da piccolo.");
    createText("Sviluppo progetti con <span class='green'>Arduino</span> e <span class='green'>stampanti 3D</span>, in particolare con una <span class='green'>Elegoo Neptune 4</span> e con un <span class='green'>Arduino UNO</span>.");
    createText("Studio anche <span class='green'>programmazione</span>, e mi diverto a realizzare script in <span class='green'>Python</span>.");
    createText("Parlo fluentemente <span class='green'>italiano</span> e <span class='green'>inglese</span>.");
  }
else if(value === "project -a"){
  commandResponse(true, value);
  createProject("https://github.com/SimontechYT/arduino-led", "Arduino LED", "Accensione LED tramite <span class='green'>Arduino</span> e <span class='green'>Python</span>.");
  createProject("https://github.com/SimontechYT/minecraft-arduino-bridge", "Minecraft Arduino Bridge", "Collegamento tra <span class='green'>Minecraft</span> 1.8.9 e <span class='green'>Arduino Uno</span> con un bottone.");
  createProject("https://github.com/SimontechYT/random-password-generator", "Password Generator", "Semplice <span class='green'>generatore di password</span> casuali in Python.");
  createText("Guarda tutti i miei progetti pubblici su: \
    <span class='green'> \
      <a href='https://github.com/SimontechYT' target='_blank' class='green'> \
      <i class='fab fa-github blue'></i> GitHub</a> \
    </span>");
}

  else if(value === "project"){
    commandResponse(false, value);
    createText("Do you mean project -a?");
  }
  else if(value === "social -a"){
    commandResponse(true, value);
    createText("<a href='https://discord.gg/6cvKDdmwPj' target='_blank'><i class='fab fa-discord'></i> Discord: <span class='green'>Simontech</span></a>");
    createText("<a href='https://github.com/SimontechYT' target='_blank'><i class='fab fa-github'></i> GitHub: <span class='green'>SimontechYT</span></a>");
    createText("<a href='https://www.linktr.ee/simontech_yt' target='_blank'><i class='fab fa-instagram'></i> Instagram: <span class='green'>@tuo_username</span></a>");
  }
  else if(value === "social"){
    commandResponse(false, value);
    createText("Do you mean social -a?");
  }
  else if(value === "clear" || value === "cls"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else{
    commandResponse(false, value);
    createErrorText(`command not found: ${value}`)
  }
}

const commandResponse = (correct, command) => {
  const div = document.createElement("section");
  const mensagem = document.createElement("h2");
  const i = document.createElement("i");

  div.setAttribute("class", "type2")

  if (correct) {
    i.setAttribute("class", "fas fa-angle-right icone")
    mensagem.setAttribute("class", "sucess")
  } else {
    i.setAttribute("class", "fas fa-angle-right icone error")
    mensagem.setAttribute("class", "error")
  }

  mensagem.textContent = `${command}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

const createProject = (link, title, text) => {
  const a = document.createElement("a");

  a.href = link;
  a.target = "_blank";
  a.innerHTML =
    `<p class="code typing-animation">${title}</p> <p><span class='text typing-animation'> ${text} </span></p>`;

  app.appendChild(a);
}

const createCode = (code, text) => {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `<span class="typing-animation">${code} <br/><span class='text'> ${text} </span></span>`;
  app.appendChild(p);
}

const createText = (text) => {
  const p = document.createElement("p");
  p.innerHTML = `<span class="typing-animation">${text}</span>`;
  app.appendChild(p);
}

const createErrorText = (text) => {
  const p = document.createElement("p");
  p.innerHTML = `<span class="typing-animation">${text}</span>`;
  app.appendChild(p);
}

const removeInput = () => {
  const div = document.querySelector(".type");
  app.removeChild(div);
}
