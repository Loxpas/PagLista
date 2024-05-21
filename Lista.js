
    window.onload = iniciar;
    //Boton Agregar esucucha al click
    function iniciar(){
        let BotonAgregar = document.getElementById("boton")
        BotonAgregar.addEventListener("click", clickBtnAgregar)

    //Boton Borrar esucucha al click

        let BotonBorrar = document.getElementById("botonBorrar")
        BotonBorrar.addEventListener("click", clickBtnBorrar)

        // Renderiza la nota
        MostrarLista();

    }

    function clickBtnBorrar(){
        localStorage.clear();
        MostrarLista();
    }

    function clickBtnAgregar(){
        // Traemos txtLista
        let txtLista = document.getElementById("texto")
        
        let Listas = [];
        if (localStorage.Listas){
            Listas = JSON.parse(localStorage.Listas)
        }

        //Listas = JSON.pase(localStorage.Listas);

        Listas.push(txtLista.value);
        localStorage.Listas = JSON.stringify(Listas);
        MostrarLista();

        /*//Queda asignado al localstorage
        localStorage.lista = txtLista.value*/
    }

    function MostrarLista(){
        // Trae el Div Lista
        let DivListas = document.getElementById("ListaDiv");
        DivListas.innerHTML="";
        // Le asigna las notas desde el local storage
        let Listas = [];
        if (localStorage.Listas){
            Listas = JSON.parse(localStorage.Listas)
        }
        let html = "";
        let nDiv,nE,i=0;
        for(let Lista of Listas){
            nDiv=document.createElement("div");
        
            nE=document.createElement("a");
            nE.innerText=Lista;
            nE.href="#";
            nDiv.appendChild(nE);
            nE=document.createElement("button");
            nE.innerText="X";
            nE.id=i;
            nE.addEventListener("click",eliminarElemento);
            nDiv.appendChild(nE);
            DivListas.appendChild(nDiv);
            i++;
        }
        //DivListas.innerHTML = html;

        //DivLista.innerHTML = localStorage.lista;



// eliminar fila
        let transactionId = getNewTransactionId();
        return{
            "transactionId": transactionId
        }
    }

    function eliminarElemento(e){
        let dE=parseInt(e.target.id);
        let Listas = [];
        if (localStorage.Listas){
            Listas = JSON.parse(localStorage.Listas)
        }     
        for(i=dE;i<Listas.length-1;i++){
            Listas[i]=Listas[i+1];
        }
        Listas.pop();
        localStorage.Listas = JSON.stringify(Listas);
        MostrarLista();
    }

// eliminar fila
    function getNewTransactionId(){
        let LastTransactionId = localStorage.getItem("LastTransactionId") || "-1"
        let NewTransacttionId = JSON.parse(LastTransactionId) + 1;
        localStorage.setItem("LastTransactionId", JSON.stringify(NewTransacttionId))
        return NewTransacttionId;
    }

// service worked config

let swLocation = "sw.js";

if (navigator.serviceWorker){
    if (window.location.href.includes("localhost")) swLocation = "/sw.js" //varia segun el host
    navigator.serviceWorker.register(swLocation);
}
