const mongoose = require('mongoose');
const UserSquema = new mongoose.Schema({
    name: {
        type: String,
        maxlength : [ 50, 'El nombre no puede exceder los 50 caracteres'],
        minlength : [ 3, 'El nombre debe contener 3 o más caracteres'],
        required: true},
    email: {
        type: String,
        maxlength : [ 100, 'El correo no puede exceder los 100 caracteres'] ,
        match     : [/.+\@.+\..+/, 'Por favor ingrese un correo válido'], // <- Validación regexp para correo
        required: true},
    phone: {
        type: Number,
        match:[/^\+[1-9]{1}[0-9]{3,14}$/,'formato de numero telefonico no valido'],
        required: true},
    password: {
        type: String,
        required: true},
    age: {
        type: Number,
        required: true},
    gender: {
        type: String,
        maxlength: 1,
        required: true,
        enum:['M','F']},
    hobby: {
        type: String,
        required: true,
        enum:['Jugar','Cantar','Estudiar','Comer','Programar','Leer']},
    registerdate:{
        type: Date,
        default: Date.now()}, 
});
const User = mongoose.model('User',UserSquema);
module.exports= User;
