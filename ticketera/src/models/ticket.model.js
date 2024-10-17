import { DataTypes, Model } from 'sequelize';

class Ticket extends Model {
  static associate(models) {
    this.hasMany(models.comments, { foreignKey: 'ticket_id' });
  }

  static init(sequelize) {
    super.init(
      {
        content: DataTypes.STRING,
        completed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'tickets',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

export default Ticket;
