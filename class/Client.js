const path = require('path')
const p = require('phin').promisified

const getUUIDFromTarget = require(path.join(__dirname, '..', 'utility', 'uuidTarget.js'))

const baseURL = 'https://api.hypixel.net/'

/**
* Main Client class. API keys are used to create client instances.
*/
class Client {
	/**
	* Create a new API client.
	* @param {string} key - A valid Hypixel API key
	*/
	constructor (key) {
		this.key = key
	}

	/**
	* Get a player's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getPlayer(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		let response = JSON.parse((await p({
			'url': baseURL + 'player?uuid=' + targetUUID + '&key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get a session's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getSession(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		let response = JSON.parse((await p({
			'url': baseURL + 'session?uuid=' + targetUUID + '&key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get a player's friends.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getFriends(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		let response = JSON.parse((await p({
			'url': baseURL + 'friends?uuid=' + targetUUID + '&key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get a guild's data.
	* @param {string} guildID - ID of the guild. (Guilds can be searched with the Client.findGuild method.)
	*/
	async getGuild(guildID) {
		let response = JSON.parse((await p({
			'url': baseURL + 'guild?id=' + guildID + '&key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get a guild's ID.
	* @param {string} [targetType=name] - Target type. 'name' for guild name, 'member' for a member's UUID, or 'memberName' for a member's name
	* @param {string} identifier - Identifier for the target. (Either a name or player UUID, based on targetType.)
	*/
	async findGuild(targetType, identifier) {
		let targetIdentifier

		if (targetType === 'memberName') {
			targetIdentifier = await getUUIDFromTarget('name', identifier)
		}
		else {
			targetIdentifier = identifier
		}

		let response = JSON.parse((await p({
			'url': baseURL + 'findGuild?' + (targetType === 'name' ? 'byName' : 'byUuid') + '=' + targetIdentifier + '&key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get Watchdog statistics.
	*/
	async getWatchdogStats() {
		let response = JSON.parse((await p({
			'url': baseURL + 'watchdogstats?key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get leaderboards.
	*/
	async getLeaderboards() {
		let response = JSON.parse((await p({
			'url': baseURL + 'leaderboards?key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get API key information.
	*/
	async getKey() {
		let response = JSON.parse((await p({
			'url': baseURL + 'key?key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}

	/**
	* Get network game boosters.
	*/
	async getBoosters() {
		let response = JSON.parse((await p({
			'url': baseURL + 'boosters?key=' + this.key,
			'method': 'GET'
		})).body)

		if (response.success) {
			return response
		}
		else throw (response.cause || response)
	}
}

module.exports = Client
