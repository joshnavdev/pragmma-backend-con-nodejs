class BaseRepository {
  /** @param {import("@types/sequelize").Model} model */
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return this.model.findAll();
  }

  async getById(id) {
    return this.model.findByPk(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    await this.model.update(data, { where: { id } });
    return this.getById(id);
  }

  async delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

export default BaseRepository;
