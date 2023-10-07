import { Canister, query, text, update, Void, blob, Record, Principal  } from 'azle';

// This is a global variable that is stored on the heap
let message = '';
let precio = '';
let nombrepropiedad = '' ;
const pagos = Uint8Array.from([1500,1600, 1700, 1800, 1900]);

const User = Record({
    id: Principal,
    username: text
});

export default Canister({
    getUser: query([], User, () => {
        return {
            id: Principal.fromUint8Array(Uint8Array.from([0])),
            username: 'lastmjs'
        };
    }),
    printUser: query([User], User, (user) => {
        console.log(typeof user);
        return user;
    }),
    // Query calls complete quickly because they do not go through consensus
    //getMessage: query([], text, () => {
       // return message;
   // }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    //setMessage: update([text], Void, (newMessage) => {
        //message = newMessage; // This change will be persisted
    //metodo para asignar precio a habitaciones o departamentos 
      getprecio: query([], text,() =>{
        return precio; 
      }),
        setprecio: update([text], Void, (newprecio) => {
            precio = newprecio;

            //metodo para asignar el nombre de la propiedad
        }),
        getnombrepropiedad: query([], text,() =>{
            return nombrepropiedad; 
          }),
            setnombrepropiedad: update([text], Void, (newnombrepropiedad) => {
                nombrepropiedad = newnombrepropiedad;
    
                
            }),
            //Función para obtener el historial de saldo de los pagos 
            obtenerpagos: query([], blob, () => {
                return pagos; // aproximacion de pagos 
            }),

            calcularpagomensual: query([blob], blob, (pagos) => {
                // Calcular el interés acumulado (ejemplo simple)
                const tasaInteres = 0.05; // Tasa de interés anual
                const historialInteres = new Uint8Array(pagos.length);
            for (let i = 0; i < pagos.length; i++) {
                if (i === 0) {
                    pagos[i] = 0; // No hay interés en el primer período
                } else {
                    const saldoAnterior = pagos[i - 1];
                    const saldoActual = pagos[i];
                    const pagomensual = (saldoActual + saldoAnterior) ;
                    pagos[i] = pagomensual;
                }
            }
    
            return pagos;
        

        }),
});