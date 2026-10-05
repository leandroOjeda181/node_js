console.log("Inicio de programa");

const args = process.argv.slice(2);

async function obtenerProductos(){
    try{
        const response = await fetch('https://fakestoreapi.com/products')
        //console.log(response)
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }   
}

async function obtenerProductoPorId(id){
    console.log(id)
    try{
        const response = await fetch('https://fakestoreapi.com/products/${id}')
        //console.log(response)
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    } 
}

async function nuevoProducto(producto){
    //console.log(producto)
    try{
        const response = await fetch('https://fakestoreapi.com/products',{
            method: "POST",
            body: JSON.stringify(producto)
        })
        if(response.ok){
            const data = await response.json();
            console.log("Producto creado correctamente. Con el ID= ",data.id)
        }
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    } 
}

async function eliminarProducto(id){
    console.log(id)
    try{
        const response = await fetch('https://fakestoreapi.com/${id}',{
            method: "DELETE"
        })
        const data = await response.json();
        return data
    }catch(error){
        console.log(error)
    } 
}

switch(args[0]){
    case "GET":
        console.log("GET");
        if(args[1].includes("/")){
            const datos = args[1].split("/");
            const producto = await obtenerProductoPorId(datos[1])
            console.log(producto)
        }else if(args[1] == "products"){
            const productos = await obtenerProductos()
            console.log(productos)
        }else{
            console.log("Comando invalido.");
        }
        break;
    
    case "POST":
        console.log("POST");
        if(args[1] == "products"){
            if(args[2] && args[3] && args[4]){
                const title = args[2];
                const price = args[3];
                const category = args[4];
                await nuevoProducto({title: title, price: price, category: category})
            }else{
                console.log("Verifique los datos ingresados.");
            }
        }else{
            console.log("Comando invalido.");
        }        

        break;

    case "DELETE":
        console.log("DELETE");
        if(args[1].includes("/")){
            const datos = args[1].split("/");
            if(datos[1]){
                const response = await eliminarProducto(datos[1])
                console.log("Producto eliminado correctamente ",response)
            }else{
                console.log("Ingrese un id valido.");    
            }
                
        }else{
            console.log("Comando invalido.");
        }  
        break;

    default:
        console.log("Comando incorrecto")
}
