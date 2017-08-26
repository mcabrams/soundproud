import faker from 'faker'

type TrackFactoryOptions = {|
  archived?: boolean,
  createdAt?: Date,
  listenCount?: number,
  updatedAt?: Date,
|}

export function trackFactory({
  archived,
  createdAt,
  listenCount,
  updatedAt,
}: TrackFactoryOptions = {}) {
  return {
    archived: archived || false,
    artwork_url: faker.internet.url(),
    created_at: createdAt || faker.date.past(),
    gateway_id: faker.random.number(),
    id: faker.random.number(),
    listen_count: listenCount != null ? listenCount : faker.random.number(),
    stream_url: faker.internet.url(),
    title: faker.lorem.sentence(),
    updated_at: updatedAt || faker.date.past(),
    username: faker.internet.userName(),
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
    archived: false,
    artwork_url: faker.internet.url(),
    created_at: createdAt || faker.date.past().toISOString(),
    gateway_id: faker.random.number(),
    id: faker.random.number(),
    listen_count: faker.random.number(),
    stream_url: faker.internet.url(),
    title: faker.lorem.sentence(),
    updated_at: updatedAt || faker.date.past().toISOString(),
    username: faker.internet.userName(),
  }
}
