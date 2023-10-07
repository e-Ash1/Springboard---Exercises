describe("Servers test (with setup and tear-down)", function() {
  
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);  // Check if the server is added
    expect(allServers['server' + serverId].serverName).toEqual('Alice');  // Check the server's name
  });

  it('should not add a new server on submitServerInfo() with empty input', function () {
    serverNameInput.value = '';  // Setting the input value to empty
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);  
  });

  it('should update #serverTable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();

    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    if (curTdList) {
      expect(curTdList.length).toBeGreaterThanOrEqual(2);  
      expect(curTdList[0].innerText).toEqual('Alice');
      expect(curTdList[1].innerText).toEqual('$0.00');

      if (curTdList.length >= 3) {
        expect(curTdList[2].innerText).toEqual('X');
      }
    } else {
      fail('No td elements found');
    }
  });

  it('should delete a server entry when the delete button is clicked', function(done) { 
    submitServerInfo();
    updateServerTable();
  
    //setTimeout to wait for DOM to be updated
    setTimeout(() => {
      let deleteButton = document.querySelector('.deleteBtn');
      
      if (deleteButton) {
        deleteButton.click(); 
  
        let serverEntries = Object.keys(allServers).length;
        let tableRows = document.querySelectorAll('#serverTable tbody tr').length;
  
        expect(serverEntries).toEqual(0);  
        expect(tableRows).toEqual(0);
        done(); // Call done to indicate end of test
      } else {
        fail('Delete button not found');
        done(); // Call done to indicate end of test, in case of test failure
      }
    }, 0); // 0 ms delay, just to push the execution to the next tick
  });
})