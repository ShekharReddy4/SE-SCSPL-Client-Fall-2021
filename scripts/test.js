function Test()
{	
var enterID = document.getElementById("itemIDBox").value

var xhr = new XMLHttpRequest();
//We are ignoring cors as this is a demo and I can't figure it out in this test 
//This also request a change to the server side to allow this
//Never do this in a real life application
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    const item = JSON.parse(this.responseText);
document.getElementById("result").innerHTML = "?";
document.getElementById("result").innerHTML = "Item ID: " + item.ID + "<br>Item Name: " + item.Name + "<br>Total Stock: " + item.StockCount + "<br>Discount Total: " + item.Discount + "\n";
  }
});

xhr.open("GET", "https://localhost:44343/api/Item/" + enterID);

xhr.send();
	
}