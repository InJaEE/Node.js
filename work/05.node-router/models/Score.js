/* const path = require('path');
const {Sequelize, sequelize} = require(path.join(__dirname, '../modules/seqelize-conn'));

const Model = Sequelize.Model;

class Score extends Model{}

Score.init({
    stdname: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
    kor: {
        type: Sequelize.TINYINT,
        allowNull: false,
    },
    eng: {
        type: Sequelize.TINYINT,
        allowNull: false,
    },
    math:{
        type: Sequelize.TINYINT,
        allowNull: false,
    }
    
},
    {
        sequelize,
        modelName: "score2",
        timestamps: false,
    }
);

Score.sync({force: false});

module.exports = {Score}; */