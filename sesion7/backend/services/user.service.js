class UserService {
  /**
   *
   * @param {import("../redis.js").default} client
   */
  constructor(client) {
    this.client = client;
  }

  async addToChannel(channel, user) {
    await this.client.sAdd(channel, JSON.stringify(user));
  }

  async removeFromChannel(channel, userId) {
    const user = await this.findByIdFromChannel(userId, channel);

    if (user) {
      await this.client.sRem(channel, JSON.stringify(user));
    }
  }

  async findAllFromChannel(channel) {
    const users = await this.client.sMembers(channel);
    return users.map((user) => JSON.parse(user));
  }

  async findByIdFromChannel(userId, channel) {
    const users = await this.findAllFromChannel(channel);

    return users.find((user) => user.id === userId);
  }

  async removeFromAllChannels(userId, updateUserEvent) {
    const channels = await this.client.keys('*');

    await Promise.all(
      channels.map(async (channel) => {
        await this.removeFromChannel(channel, userId);

        updateUserEvent(channel, await this.findAllFromChannel(channel));
      })
    );
  }
}

export default UserService;
