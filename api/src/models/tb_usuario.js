import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_usuario extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_usuario: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  return tb_usuario;
  }
}
