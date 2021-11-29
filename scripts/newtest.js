objs=[]
netPrices=[]
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
        var cell6=row.insertCell(6)
        var cell7=row.insertCell(7)
        price = parseFloat(item.Price) - parseFloat(item.Discount)
		cell0.innerHTML = item.ID;
		cell1.innerHTML = item.Name;
		cell2.innerHTML = parseFloat(item.Price).toFixed(2); 
		cell3.innerHTML = item.Discount;
		cell4.innerHTML = parseFloat(price).toFixed(2);
        cell5.innerHTML = item.StockCount;
        cell6.innerHTML=item.IsScalable?"<ion-button shape='round' onclick='scale()' color='medium'>Scale</ion-button>":"NA";
        cell7.innerHTML="NA"
        obj=        {
            "ID": item.ID,
            "Name": item.Name,
            "StockCount": item.StockCount,
            "Discount": item.Discount,
            "Price": item.Price,
            "IsScalable": item.IsScalable
          }
          netPrices.push(price)
          console.log(obj)
          this.objs.push(obj)
          console.log(objs)
		totalCost();
}   
function totalCost(){
	document.getElementById("subTotal").innerHTML = 0.00
	//var table = document.getElementById("resultList");
	//Sum values of item price
	//let total = Array.from(table.rows).slice(1).reduce((total,row) => {
    //return total + (row.cells[5].innerHTML);
    var total =0;
    netPrices.forEach(element => {
      
        total = total + element;
    });


    document.getElementById("subTotal").innerHTML = "$" + total;

}




function total(){
    var t =0;
    netPrices.forEach(element => {
      
        t = t + element;
    });

	tax=t*8/100;
	t=t+tax;
	var tot=document.getElementById('tot')
	const taxx=document.createElement('ion-item')
	const totall=document.createElement('ion-item')
	taxx.innerText="Tax: "+tax;
	totall.innerText="Total: "+t

	tot.appendChild(taxx)
	tot.appendChild(totall)
    document.getElementById("addItem").disabled = true;
    document.getElementById("total").disabled = true;
    document.getElementById("clear").disabled = true;
    
    presentAlert5()

}
function scale()
{
    console.log('jii')

presentAlert()


}
function presentAlert() {
    var weight=window.prompt(" Weight in lbs: ")
    console.log(weight);
    l=netPrices.length
    var table = document.getElementById("resultList");
    var rowTotal = table.rows.length;
    var discount=objs[l-1].Discount
    var p=parseFloat(table.rows[rowTotal-2].cells.item(4).innerHTML) + discount

    
    var discount=objs[l-1].Discount
    var price= (p*weight)-(weight*discount)
    
    netPrices[l-1]=price
    
    table.rows[rowTotal-2].cells.item(4).innerHTML=price
    table.rows[rowTotal-2].cells.item(7).innerHTML=weight
    
 


    totalCost()

}
function c()
{
    console.log('clear');
    var table = document.getElementById("resultList");
	var rowTotal = table.rows.length;
	if(rowTotal > 2)
	{
        console.log("ko")
	
        table.deleteRow(rowTotal - 2);
        objs.pop()
        netPrices.pop()
		totalCost();
	}
    console.log('uhuhu');
}
function presentAlert5() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.subHeader = 'Hey there!!';
    alert.message = 'Cash Till is open';
    alert.buttons = ['OK'];
    
    document.body.appendChild(alert);
    return alert.present();
    }
  
  
  
    



