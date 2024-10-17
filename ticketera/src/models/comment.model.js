import { DataTypes, Model } from 'sequelize';

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.tickets, { foreignKey: 'ticket_id' });
  }

  static init(sequelize) {
    super.init(
      {
        comment: DataTypes.STRING,
        ticket_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'comments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default Comment;
