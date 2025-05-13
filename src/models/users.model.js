const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    permission:{type:String},
    email: {
        type: String,
        required: true,
        trim: true,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Papéis permitidos
        default: 'user', // Papel padrão
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'Users' });

// Atualiza o campo `updatedAt` antes de salvar
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;