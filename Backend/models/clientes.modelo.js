const sequelize = require("../db/connection");


class ClienteModelo  {
    constructor(cliente){
        this.cliente = cliente
    }

    async listar() {
        try {
            let resultado = await sequelize.query('SELECT * FROM dbo.CLIENTES');
            return resultado;
        }catch (error) {
            console.log(error)
            throw new Error ("Ocurrio un error en la consulta");
        }
    }

    async buscar() {
        let encontrado = await sequelize.query(`SELECT * FROM dbo.CLIENTES WHERE USERNAME = '${this.cliente.USERNAME.toString()}'`);
        return encontrado[0][0];
    }

    async agregar() {
        try {
            let agregado = [
                this.cliente.NOMBRE1,
                this.cliente.NOMBRE2,
                this.cliente.PAPEL,
                this.cliente.APELLIDO1,
                this.cliente.APELLIDO2,
                this.cliente.USERNAME,
                this.cliente.DIRECCION,
                this.cliente.ENVIOS,
                this.cliente.PAIS,
                this.cliente.FORMA_PAGO,
                this.cliente.PROPIETARIO_TARJETA,
                this.cliente.CADUCIDAD.toString(),
                this.cliente.NUM_TARJETA,
                this.cliente.PASSWORD_USUARIO,
                this.cliente.CVV,
                this.cliente.MAIL,
                this.cliente.TELEFONO,
                1
            ]
            console.log(agregado);
            let resultado= await sequelize.query('INSERT INTO dbo.CLIENTES (NOMBRE1,NOMBRE2,PAPEL,APELLIDO1,APELLIDO2,USERNAME,DIRECCION,ENVIOS,PAIS,FORMA_PAGO , PROPIETARIO_TARJETA,CADUCIDAD,NUM_TARJETA,PASSWORD_USUARIO,CVV,MAIL,TELEFONO,ACTIVO) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',{replacements:agregado,type: sequelize.QueryTypes.SELECT} );
        } catch (error) {
            console.log(error);
            throw new Error('Error al insertar usuario');
        }
    }

    async eliminar() {
        try {
            await sequelize.query(`UPDATE dbo.CLIENTES SET ACTIVO = 0 WHERE USERNAME ='${this.cliente.USERNAME.toString()}'` );
        } catch (error) {
            throw new Error('Error al eliminar usuario')
        }
    }

    async actualizar() {
        try {
            let cambiado = [
                usuarioAgregar.NOMBRE1,
                usuarioAgregar.NOMBRE2,
                usuarioAgregar.PAPEL,
                usuarioAgregar.APELLIDO1,
                usuarioAgregar.APELLIDO2,
                usuarioAgregar.DIRECCION,
                usuarioAgregar.ENVIOS,
                usuarioAgregar.PAIS,
                usuarioAgregar.FORMA_PAGO,
                usuarioAgregar.PROPIETARIO_TARJETA,
                usuarioAgregar.CADUCIDAD.toString(),
                usuarioAgregar.NUM_TARJETA,
                usuarioAgregar.PASSWORD_USUARIO,
                usuarioAgregar.CVV,
                usuarioAgregar.MAIL,
                usuarioAgregar.TELEFONO,
                1
            ]
            let resultado = await sequelize.query(`UPDATE CLIENTES SET NOMBRE1=?,NOMBRE2=?,PAPEL=?,APELLIDO1=?,APELLIDO2=?,DIRECCION=?,ENVIOS=?,PAIS=?,FORMA_PAGO=? , PROPIETARIO_TARJETA=?,CADUCIDAD=?,NUM_TARJETA=?,PASSWORD_USUARIO=?,CVV=?,MAIL=?,TELEFONO=?,ACTIVO=? WHERE USERNAME ='${usuarioAgregar.USERNAME.toString()}' `,{replacements:cambiado,type: sequelize.QueryTypes.SELECT});
        } catch (error) {
            console.log(error);
            throw new Error('Ha habido un error en la actualizacion')
            
        }
    }
}

module.exports = ClienteModelo