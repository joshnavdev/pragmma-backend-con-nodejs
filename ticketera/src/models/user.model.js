import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static associate(models) {
    this.hasMany(models.tickets, { foreignKey: 'user_id' });
    this.hasMany(models.comments, { foreignKey: 'user_id' });
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'users',
      }
    );
  }
}

export default User;
