let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';  // Clear the table body to re-render it

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    appendTd(newTr, curServer.serverName);
    
    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;
    appendTd(newTr, '$' + tipAverage.toFixed(2));

    appendDeleteBtn(newTr, key);  // Append delete button to each row

    serverTbody.append(newTr);
  }
}

// Function to append delete button to the table row
function appendDeleteBtn(tr, serverId) {
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.onclick = function() {
    deleteServer(serverId);  // Function to handle the deletion of the server
  };
  
  let td = document.createElement('td');
  td.appendChild(deleteBtn);

  tr.appendChild(td);
}

// Function to handle the deletion of the server
function deleteServer(serverId) {
  delete allServers[serverId];  // Delete the server from the allServers object
  
  let tr = document.getElementById(serverId);
  if (tr) {
    tr.remove();  // Remove the server row from the table
  }

  updateServerTable();  // Update the server table after deletion
}

