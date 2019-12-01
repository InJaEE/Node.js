module.exports = (sequelize, DataTypes) => {
    return sequelize.define('members', {
        userid: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        userpw: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
        },
    }, {
        timestamps: true
    });
}