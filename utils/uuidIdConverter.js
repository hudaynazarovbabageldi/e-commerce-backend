exports.convertUuidToId = async (model, uuid) => {
  try {
    return (await model.findOne({ where: { uuid }, attributes: ['id'] }))?.id;
  } catch (err) {
    return null;
  }
};

exports.convertUuidsToIds = async (model, uuids) => {
  try {
    return (await model.findAll({ where: { uuid: uuids }, attributes: ['id'] }))?.map((data) => data.id);
  } catch (err) {
    return [];
  }
};

exports.convertIdToUuid = async (model, id) => {
  try {
    return (await model.findOne({ where: { id }, attributes: ['uuid'] }))?.uuid;
  } catch (err) {
    return null;
  }
};

exports.convertIdsToUuids = async (model, ids) => {
  try {
    return (await model.findAll({ where: { id: ids }, attributes: ['uuid'] }))?.map((data) => data.uuid);
  } catch (err) {
    return [];
  }
};
