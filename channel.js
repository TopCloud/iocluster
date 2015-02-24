var EventEmitter = require('events').EventEmitter;

if (!Object.create) {
  Object.create = require('./objectcreate');
}

var Channel = function (name, client) {
  var self = this;
  
  EventEmitter.call(this);
  
  this.SUBSCRIBED = 'subscribed';
  this.PENDING = 'pending';
  this.UNSUBSCRIBED = 'unsubscribed';
  
  this.name = name;
  this.state = this.UNSUBSCRIBED;
  this.client = client;
};

Channel.prototype = Object.create(EventEmitter.prototype);

Channel.prototype.getState = function () {
  return this.state;
};

Channel.prototype.subscribe = function () {
  this.client.subscribe(this.name);
  return this;
};

Channel.prototype.unsubscribe = function () {
  this.client.unsubscribe(this.name);
  return this;
};

Channel.prototype.isSubscribed = function (includePending) {
  return this.client.isSubscribed(this.name, includePending);
};

Channel.prototype.publish = function (data, callback) {
  this.client.publish(this.name, data, callback);
  return this;
};

Channel.prototype.watch = function (handler) {
  this.client.watch(this.name, handler);
  return this;
};

Channel.prototype.unwatch = function (handler) {
  this.client.unwatch(this.name, handler);
  return this;
};

Channel.prototype.destroy = function () {
  this.client.destroyChannel(this.name);
};

module.exports = Channel;