objs=[]
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
		var row = table.insertRow(rowTotal-1);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
        var cell5=row.insertCell(5)
		cell0.innerHTML = item.ID;
		cell1.innerHTML = item.Name;
		cell2.innerHTML = item.StockCount;
		cell3.innerHTML = item.Discount;
		cell4.innerHTML = parseFloat(item.Price).toFixed(2);
        cell5.innerHTML=item.IsScalable?"<button id=\"r1id\">Scale</button>":"NA";
        obj=        {
            "ID": item.ID,
            "Name": item.Name,
            "StockCount": item.StockCount,
            "Discount": item.Discount,
            "Price": item.Price,
            "IsScalable": item.IsScalable
          }
          console.log(obj)
          this.objs.push(obj)
          console.log(objs)
		totalCost();
}   
function totalCost(){
	document.getElementById("subTotal").innerHTML = 0.00
	var table = document.getElementById("resultList");
	//Sum values of item price
	let total = Array.from(table.rows).slice(1).reduce((total,row) => {
    return total + parseFloat(row.cells[4].innerHTML);
  }, 0);
	document.getElementById("subTotal").innerHTML = "$" + total.toFixed(2);
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
    total();
		document.getElementById("totalButton").disabled = true;
		document.getElementById("addItem").disabled = true;
	
		
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
function total(){
	document.getElementById("subTotal").innerHTML = 0.00
	var table = document.getElementById("resultList");
	//Sum values of item price
	let t = Array.from(table.rows).slice(1).reduce((t,row) => {
    return t + parseFloat(row.cells[4].innerHTML);
  }, 0);
	tax=t*8/100;
	t=t+tax;
	var tot=document.getElementById('tot')
	const taxx=document.createElement('ion-item')
	const totall=document.createElement('ion-item')
	taxx.innerText="Tax: "+tax;
	totall.innerText="Total: "+t

	tot.appendChild(taxx)
	tot.appendChild(totall)

}



