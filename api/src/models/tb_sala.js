import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_sala extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_sala: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_sala: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bt_ativa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_sala',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sala" },
        ]
      },
    ]
  });
  return tb_sala;
  }
}
