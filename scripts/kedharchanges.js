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

