async function queryAPI(enterID, callBackItem)
{	
var xhr = new XMLHttpRequest();
//We are ignoring cors as this is a demo and I can't figure it out in this test 
//This also request a change to the server side to allow this
//Never do this in a real life application
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4 && this.status == 200) {
    console.log(this.responseText);
    const item = JSON.parse(this.responseText);
	callBackItem(item);
document.getElementById("result").innerHTML = "?";
document.getElementById("result").innerHTML = "Item ID: " + item.ID + "<br>Item Name: " + item.Name + "<br>Total Stock: " + item.StockCount + "<br>Discount Total: " + item.Discount + "\n";
  }
});

xhr.open("GET", "https://localhost:44343/api/Item/" + enterID);
xhr.send();
}

function checkBlank()
{
	var enterID = document.getElementById("itemIDBox").value
	if (enterID === ""){}
	else
	{
		//QueryAPI with ID then add the item, async
		queryAPI(enterID, additem);
	}
}
function additem(item)
{
		console.log("ABC");
		var table = document.getElementById("resultList");
		var row = table.insertRow(-1);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		cell0.innerHTML = item.ID;
		cell1.innerHTML = item.Name;
		cell2.innerHTML = item.StockCount;
		cell3.innerHTML = item.Discount;
}
function clearlastItem()
{
	var table = document.getElementById("resultList");
	var rowTotal = table.rows.length;
	if(rowTotal > 1)
	{
		table.deleteRow(rowTotal - 1);
	}
}
