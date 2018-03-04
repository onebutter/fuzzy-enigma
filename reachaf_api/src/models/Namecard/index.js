export default (sequelize, DataTypes) => {
  const { User } = sequelize.models;
  const Namecard = sequelize.define(
    'Namecard',
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'namecardPK',
        validate: { notEmpty: true }
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
        unique: 'namecardPK',
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
