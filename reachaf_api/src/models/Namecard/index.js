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
        values: ['public', 'private', 'secret'],
        allowNull: false,
        defaultValue: 'secret'
      },
      isDefaultNamecard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      paranoid: true
    }
  );

  Namecard.associate = function(models) {
    models.Namecard.belongsTo(models.User);
  };

  return Namecard;
};
