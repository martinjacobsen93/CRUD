const esAdminRole = (req, res, next) => {
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se está intentando validar el rol antes que el token',
        });
    }
    
    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no tiene permisos suficientes para realizar esta acción`
        })
    }

    next()

}

module.exports = {
    esAdminRole
}