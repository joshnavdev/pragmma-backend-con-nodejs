import { DataTypes, Model } from 'sequelize';

class FederatedCredential extends Model {
  static associate(models) {
    this.belongsTo(models.users, { foreignKey: 'user_id' });
  }

  static init(sequelize) {
    super.init(
      {
        provider: DataTypes.STRING,
        provider_id: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'federated_credentials',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default FederatedCredential;
