import faker from 'faker'

type TrackFactoryOptions = {|
  createdAt?: Date,
  updatedAt?: Date,
|}

export function trackFactory({
  createdAt,
  updatedAt,
  }: TrackFactoryOptions = {}) {
  return {
    created_at: createdAt || faker.date.past(),
    updated_at: updatedAt || faker.date.past(),
    artwork_url: faker.internet.url(),
    gateway_id: faker.random.number(),
    id: faker.random.number(),
    stream_url: faker.internet.url(),
    title: faker.lorem.sentence(),
    username: faker.internet.userName(),
    archived: false,
  }
}

type ApiTrackFactoryOptions = {|
  createdAt?: string,
  updatedAt?: string,
|}

export function apiTrackFactory({
  createdAt,
  updatedAt,
  }: ApiTrackFactoryOptions = {}) {
  return {
    created_at: createdAt || faker.date.past().toISOString(),
    updated_at: updatedAt || faker.date.past().toISOString(),
    artwork_url: faker.internet.url(),
    gateway_id: faker.random.number(),
    id: faker.random.number(),
    stream_url: faker.internet.url(),
    title: faker.lorem.sentence(),
    username: faker.internet.userName(),
    archived: false,
  }
}
