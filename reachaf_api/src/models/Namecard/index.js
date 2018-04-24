export default (sequelize, DataTypes) => {
  const { User } = sequelize.models;
  const Namecard = sequelize.define(
    'Namecard',
    {
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
      },
      privacy: {
        type: DataTypes.ENUM,
        values: ['default', 'public', 'private', 'secret'],
        allowNull: false,
        defaultValue: 'public'
      },
      services: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      aliases: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
      }
    },
    {
      timestamps: true,
      paranoid: true,
      scopes: {
        defaultNamecard: {
          where: {
            privacy: 'default'
          }
        }
      }
    }
  );

  Namecard.associate = function(models) {
    models.Namecard.belongsTo(models.User);
  };

  return Namecard;
};
