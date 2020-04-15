var data = [];

function tablevisible()
{
    document.getElementById("showData").style.visibility = "hidden"; 
}


function fetchdata() {
    document.getElementById("showData").style.visibility = "visible";
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      data = JSON.parse(http.responseText);
      CreateTableFromJSON(data)
      console.log("aarthi")
      console.log(data)
    }
  };
  http.open("GET", "https://restcountries.eu/rest/v2/all", false);
  http.send();
}

function CreateTableFromJSON(data) 
{
    var dataTable = document.querySelector('#showData');
    dataTable.appendChild(document.createElement('tbody'));
    tbody = document.querySelector('#showData > tbody');
    if (data.length > 0) {
        data.forEach(element => {
            let tr = document.createElement('tr');
        //    tr.className="item";
            tr.innerHTML = 
           
            "<td>" +'<a href="'+ element.flag+'">'+element.name +'</a>'+"</td>"+
                            "<td>" + element.capital + "</td>" ;
                            
                        
                            
                            // "<td><img width=100, height= 50 src = '" + element.flag + "' /></td>";
            tbody.appendChild(tr);
        });
    } else {
        tbody.innerHTML = "<tr><td colspan='3'>No items to display</td></tr>"
    }
}
function sortAndRender(event){
    let colName = event.target.parentNode.textContent.trim().toLocaleLowerCase();
    let order;
    if (event.target.className.includes('desc')){
        order = 'asc';
        event.target.className = 'fa fa-sort-asc';
    } else{
        order = 'desc';
        event.target.className = 'fa fa-sort-desc';
    }
    deleteData();
    data.sort(function(a, b){
        switch (colName) {
            case "name":{
                return order === 'desc' ? a.name > b.name ? -1 : 1 : a.name > b.name ? 1 : -1;
            }
            case "capital": {
                return order === 'desc' ? a.capital > b.capital ? -1 : 1 : a.capital > b.capital ? 1 : -1;
            }
        }   
    });
    console.log(data);
    CreateTableFromJSON(data);
}
function deleteData() {
    let dataTable = document.getElementById('showData');
    dataTable.removeChild(dataTable.childNodes[2]);
}




      

