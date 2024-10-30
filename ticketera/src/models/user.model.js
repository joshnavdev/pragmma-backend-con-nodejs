import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static association(models) {
    this.hasMany(models.tickets, { foreignKey: 'user_id' });
    this.hasMany(models.comments, { foreignKey: 'user_id' });
    this.hasMany(models.federated_credentials, { foreignKey: 'user_id' });
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
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default User;
