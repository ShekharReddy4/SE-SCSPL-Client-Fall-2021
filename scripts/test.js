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
document.getElementById("result").innerHTML = "Unknown Item";
if(item != null){
document.getElementById("result").innerHTML = "Item ID: " + item.ID + "<br>Item Name: " + item.Name + "<br>Total Stock: " + item.StockCount + "<br>Discount Total: " + item.Discount + "<br>Price: " + item.Price;
}
  }
});

xhr.open("GET", "https://localhost:5001/api/Item/" + enterID);
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
		if(item === null){
			return;
		}
		console.log("ABC"); //sync test, debug only
		var table = document.getElementById("resultList");
		var rowTotal = table.rows.length;
		var row = table.insertRow(rowTotal-3);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		cell0.innerHTML = item.ID;
		cell1.innerHTML = item.Name;
		cell2.innerHTML = item.StockCount;
		cell3.innerHTML = item.Discount;
		cell4.innerHTML = parseFloat(item.Price).toFixed(2);
		totalCost();
}
function totalCost(){
	document.getElementById("totalPrice").innerHTML = 0.00
	document.getElementById("SubTotal").innerHTML = 0.00
	document.getElementById("Taxes").innerHTML = 0.00
	var table = document.getElementById("resultList");
	//Sum values of item price
	let total = Array.from(table.rows).slice(1).reduce((total,row) => {
    return total + parseFloat(row.cells[4].innerHTML);
  }, 0);
	document.getElementById("SubTotal").innerHTML = total.toFixed(2);
	document.getElementById("Taxes").innerHTML = total.toFixed(2) * 0.08;
	var finalTotal = parseFloat(total.toFixed(2)) + parseFloat((total.toFixed(2) * parseFloat('0.08')))
	document.getElementById("totalPrice").innerHTML = "$" + finalTotal.toFixed(2);
}
function clearlastItem()
{
	var table = document.getElementById("resultList");
	var rowTotal = table.rows.length;
	if(rowTotal > 4)
	{
		table.deleteRow(rowTotal - 4);
		totalCost();
	}
}
function buy(){
	var cardNum = document.getElementById("cardnum");
	var cardName = document.getElementById("cardName");
	var cardCvv = document.getElementById("cardCvv");
	var cardExp = document.getElementById("cardExp");
	var table = document.getElementById("resultList");
	//confirm if credit card is correct API query here
	if(true && table.rows.length > 4){
		//card info is correct
		document.getElementById("TotalButton").disabled = false;
	}else{
		//card info is wrong or no items
		if(table.rows.length <= 4){
			document.getElementById("comment").innerHTML = "You have no items in your basket.";
		}else{
		document.getElementById("comment").innerHTML = "Please enter valid credit card information.";
		}
	}
	
}
function totalButton(){
		document.getElementById("TotalButton").disabled = true;
		document.getElementById("PaymentButton").disabled = true;
		document.getElementById("AddItemButton").disabled = true;
		document.getElementById("ClearItemButton").disabled = true;
		document.getElementById("comment").innerHTML = "Thank you for your purchase!";
}
function newOrder(){
	var table = document.getElementById("resultList");
	while (table.rows.length > 4) {
		table.deleteRow(1);
		}
	totalCost();
	document.getElementById("comment").innerHTML = "Welcome, please enter your items.";
	document.getElementById("result").innerHTML = "";
	document.getElementById("TotalButton").disabled = true;
	document.getElementById("PaymentButton").disabled = false;
	document.getElementById("AddItemButton").disabled = false;
	document.getElementById("ClearItemButton").disabled = false;
}

