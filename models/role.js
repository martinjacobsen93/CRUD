const {Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El campo rol es obligatorio']
    }
});

const Role = model('role',RoleSchema);

module.exports = Role;