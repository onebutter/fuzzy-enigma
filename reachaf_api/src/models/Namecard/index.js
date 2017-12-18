export default (sequelize, DataTypes) => {
  const Namecard = sequelize.define(
    'Namecard',
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      privacy: {
        type: DataTypes.ENUM,
        values: ['default', 'public', 'private', 'secret'],
        allowNull: false,
        defaultValue: 'secret'
      },
      services: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      aliases: {
        type: DataTypes.JSONB,
        allowNull: true
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
